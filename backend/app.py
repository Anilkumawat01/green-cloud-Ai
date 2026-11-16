import json
import os
import uuid
import datetime
from decimal import Decimal
import boto3
from boto3.dynamodb.conditions import Key

# Initialize DynamoDB
TABLE_NAME = os.environ.get("TABLE_NAME", "GreenCloudOptimizationLogs")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(TABLE_NAME)

# Regional Carbon Grid Intensity (in gCO2 eq per kWh)
# Sources: Electricity Maps, Cloud Carbon Footprint, EPA eGRID
CARBON_INTENSITY = {
    "us-west-2": {"name": "US West (Oregon)", "provider": "AWS", "intensity": 130, "rating": "VERY LOW", "renewable_pct": 89},
    "ca-central-1": {"name": "Canada Central (Montreal)", "provider": "AWS", "intensity": 120, "rating": "VERY LOW", "renewable_pct": 92},
    "sa-east-1": {"name": "South America (São Paulo)", "provider": "AWS", "intensity": 110, "rating": "VERY LOW", "renewable_pct": 94},
    "eu-west-1": {"name": "Europe (Ireland)", "provider": "AWS", "intensity": 180, "rating": "LOW", "renewable_pct": 74},
    "europe-west1": {"name": "Europe (Belgium)", "provider": "GCP", "intensity": 160, "rating": "LOW", "renewable_pct": 80},
    "westeurope": {"name": "Europe (Netherlands)", "provider": "Azure", "intensity": 170, "rating": "LOW", "renewable_pct": 76},
    "eu-central-1": {"name": "Europe (Frankfurt)", "provider": "AWS", "intensity": 280, "rating": "MEDIUM", "renewable_pct": 52},
    "ap-south-1": {"name": "Asia Pacific (Mumbai)", "provider": "AWS", "intensity": 580, "rating": "HIGH", "renewable_pct": 22},
    "asia-south1": {"name": "Asia Pacific (Mumbai)", "provider": "GCP", "intensity": 580, "rating": "HIGH", "renewable_pct": 22},
    "us-east-1": {"name": "US East (N. Virginia)", "provider": "AWS", "intensity": 450, "rating": "HIGH", "renewable_pct": 31},
    "eastus": {"name": "US East (Virginia)", "provider": "Azure", "intensity": 450, "rating": "HIGH", "renewable_pct": 31},
    "us-central1": {"name": "US Central (Iowa)", "provider": "GCP", "intensity": 410, "rating": "HIGH", "renewable_pct": 38},
    "centralus": {"name": "US Central (Iowa)", "provider": "Azure", "intensity": 410, "rating": "HIGH", "renewable_pct": 38},
}

# Average power draw estimates (kW) per resource type
POWER_ESTIMATES = {
    "gpu": 0.450,        # p3/g4 GPU instances
    "compute_large": 0.080, # 4-8 vCPU
    "compute_medium": 0.040, # 2 vCPU (e.g. t3.large)
    "compute_small": 0.020, # 1 vCPU
    "database": 0.060,   # RDS standard
    "storage": 0.005,    # S3 / Blob storage bucket baseline
    "serverless": 0.010, # Lambda / Cloud Functions duty cycle
    "networking": 0.015, # NAT / Load Balancer
}

DEFAULT_RESOURCES = [
    {"id": "1", "name": "web-server-prod-01", "type": "Compute", "instanceType": "EC2 t3.large", "provider": "AWS", "region": "us-east-1", "monthlyCost": 156, "status": "idle", "cpuUsage": 3},
    {"id": "2", "name": "ml-training-gpu", "type": "Compute", "instanceType": "EC2 p3.2xlarge", "provider": "AWS", "region": "us-west-2", "monthlyCost": 890, "status": "idle", "cpuUsage": 0},
    {"id": "3", "name": "old-database-backup", "type": "Database", "instanceType": "RDS db.r5.large", "provider": "AWS", "region": "eu-west-1", "monthlyCost": 234, "status": "orphan", "cpuUsage": 0},
    {"id": "4", "name": "storage-bucket-dev", "type": "Storage", "instanceType": "S3 Standard", "provider": "AWS", "region": "us-east-1", "monthlyCost": 45, "status": "idle", "cpuUsage": 0},
    {"id": "5", "name": "compute-engine-01", "type": "Compute", "instanceType": "n1-standard-4", "provider": "GCP", "region": "us-central1", "monthlyCost": 120, "status": "active", "cpuUsage": 67},
    {"id": "6", "name": "staging-vm", "type": "Compute", "instanceType": "Standard_D4s_v3", "provider": "Azure", "region": "eastus", "monthlyCost": 340, "status": "idle", "cpuUsage": 1},
    {"id": "7", "name": "api-gateway-prod", "type": "Networking", "instanceType": "API Gateway", "provider": "AWS", "region": "us-east-1", "monthlyCost": 89, "status": "active", "cpuUsage": 45},
    {"id": "8", "name": "redis-cache-prod", "type": "Database", "instanceType": "ElastiCache r6g.large", "provider": "AWS", "region": "us-east-1", "monthlyCost": 210, "status": "active", "cpuUsage": 72},
    {"id": "9", "name": "bigquery-analytics", "type": "Database", "instanceType": "BigQuery", "provider": "GCP", "region": "us-east4", "monthlyCost": 560, "status": "active", "cpuUsage": 38},
    {"id": "10", "name": "dev-kubernetes-cluster", "type": "Compute", "instanceType": "GKE Standard", "provider": "GCP", "region": "europe-west1", "monthlyCost": 780, "status": "idle", "cpuUsage": 5},
]

def decimal_serializer(obj):
    """Convert Decimal back to float/int for JSON response."""
    if isinstance(obj, Decimal):
        return float(obj) if obj % 1 > 0 else int(obj)
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

def to_dynamo_decimal(value):
    """Recursively convert float values to Decimal for DynamoDB storage."""
    if isinstance(value, float):
        return Decimal(str(round(value, 4)))
    elif isinstance(value, dict):
        return {k: to_dynamo_decimal(v) for k, v in value.items()}
    elif isinstance(value, list):
        return [to_dynamo_decimal(v) for v in value]
    return value

def estimate_power_kw(resource):
    """Estimate average power in kW based on instance type and usage."""
    name = resource.get("name", "").lower()
    inst = resource.get("instanceType", "").lower()
    rtype = resource.get("type", "").lower()

    if "gpu" in name or "gpu" in inst or "p3" in inst or "g4" in inst:
        base_kw = POWER_ESTIMATES["gpu"]
    elif "db" in inst or "database" in rtype or "rds" in inst:
        base_kw = POWER_ESTIMATES["database"]
    elif "storage" in rtype or "s3" in inst or "blob" in inst:
        base_kw = POWER_ESTIMATES["storage"]
    elif "lambda" in inst or "serverless" in rtype:
        base_kw = POWER_ESTIMATES["serverless"]
    elif "large" in inst or "standard-4" in inst or "d4s" in inst:
        base_kw = POWER_ESTIMATES["compute_large"]
    else:
        base_kw = POWER_ESTIMATES["compute_medium"]

    cpu = float(resource.get("cpuUsage", 20))
    # Utilization scaling: Dynamic power is ~60% of max, idle is ~40%
    scaled_kw = base_kw * (0.4 + 0.6 * (cpu / 100.0))
    return scaled_kw

def calculate_carbon_metrics(resources):
    """Calculate total cost, waste, carbon emissions, and generate smart region & rightsizing recommendations."""
    total_cost = 0.0
    waste_cost = 0.0
    total_carbon_kg = 0.0
    waste_carbon_kg = 0.0
    active_workloads_carbon_kg = 0.0
    workloads_by_region = {}
    recommendations = []

    HOURS_PER_MONTH = 730

    for r in resources:
        cost = float(r.get("monthlyCost", 0))
        total_cost += cost
        region = r.get("region", "us-east-1")
        status = r.get("status", "active")
        cpu = float(r.get("cpuUsage", 50))
        name = r.get("name", "resource")
        
        # Regional intensity (gCO2/kWh)
        region_info = CARBON_INTENSITY.get(region, {"intensity": 400, "rating": "MEDIUM", "name": region})
        intensity = region_info["intensity"]

        # Monthly energy consumed (kWh)
        power_kw = estimate_power_kw(r)
        monthly_kwh = power_kw * HOURS_PER_MONTH
        # Carbon in kg (gCO2 / 1000)
        carbon_kg = (monthly_kwh * intensity) / 1000.0
        total_carbon_kg += carbon_kg

        if region not in workloads_by_region:
            workloads_by_region[region] = {"count": 0, "carbon_kg": 0.0, "cost": 0.0}
        workloads_by_region[region]["count"] += 1
        workloads_by_region[region]["carbon_kg"] += carbon_kg
        workloads_by_region[region]["cost"] += cost

        # Idle or orphaned detection
        is_idle = status == "idle" or cpu < 5.0
        is_orphan = status == "orphan"

        if is_orphan:
            waste_cost += cost
            waste_carbon_kg += carbon_kg
            recommendations.append({
                "id": str(uuid.uuid4())[:8],
                "resource": name,
                "type": "ORPHAN_RESOURCE",
                "priority": "HIGH",
                "action": f"Delete orphaned {r.get('type')} ({name})",
                "monthlySavings": round(cost, 2),
                "carbonSavingsKg": round(carbon_kg, 2),
                "impact": f"Saves ${cost:.0f}/month and eliminates {carbon_kg:.1f} kg CO2e"
            })
        elif is_idle:
            waste_cost += cost
            waste_carbon_kg += carbon_kg
            recommendations.append({
                "id": str(uuid.uuid4())[:8],
                "resource": name,
                "type": "IDLE_INSTANCE",
                "priority": "HIGH" if cost > 100 else "MEDIUM",
                "action": f"Terminate or schedule idle instance ({name}) with {cpu:.0f}% CPU",
                "monthlySavings": round(cost * 0.85, 2),
                "carbonSavingsKg": round(carbon_kg * 0.85, 2),
                "impact": f"Saves ${(cost * 0.85):.0f}/month and reduces {carbon_kg * 0.85:.1f} kg CO2e"
            })
        else:
            active_workloads_carbon_kg += carbon_kg

    # Regional migration recommendations:
    # If workloads are running in high-intensity regions, recommend migrating to greenest regions
    greenest_region = "us-west-2"  # Oregon (130 gCO2/kWh)
    greenest_eu_region = "eu-west-1" # Ireland (180 gCO2/kWh)
    regional_savings_carbon_kg = 0.0

    for reg, stats in workloads_by_region.items():
        curr_intensity = CARBON_INTENSITY.get(reg, {}).get("intensity", 400)
        target_reg = greenest_eu_region if "eu" in reg else greenest_region
        target_intensity = CARBON_INTENSITY.get(target_reg, {}).get("intensity", 130)

        if curr_intensity > target_intensity + 100:
            pct_reduction = round(((curr_intensity - target_intensity) / curr_intensity) * 100, 1)
            saved_carbon = stats["carbon_kg"] * (pct_reduction / 100.0)
            regional_savings_carbon_kg += saved_carbon
            recommendations.append({
                "id": str(uuid.uuid4())[:8],
                "resource": f"Workloads in {reg}",
                "type": "REGION_MIGRATION",
                "priority": "MEDIUM",
                "action": f"Migrate {stats['count']} workload(s) from {reg} ({curr_intensity}g) to {target_reg} ({target_intensity}g)",
                "monthlySavings": round(stats["cost"] * 0.05, 2), # 5% lower regional energy cost
                "carbonSavingsKg": round(saved_carbon, 2),
                "impact": f"Cut carbon by {pct_reduction}% ({saved_carbon:.1f} kg CO2e saved)"
            })

    total_potential_savings = waste_cost + (regional_savings_carbon_kg * 0.02)
    total_potential_carbon_savings = waste_carbon_kg + regional_savings_carbon_kg
    carbon_reduction_pct = round((total_potential_carbon_savings / max(total_carbon_kg, 0.01)) * 100, 1)

    # Sort recommendations by highest carbon savings first
    recommendations.sort(key=lambda x: x["carbonSavingsKg"], reverse=True)

    summary = {
        "totalResources": len(resources),
        "totalMonthlyCost": round(total_cost, 2),
        "potentialCostSavings": round(waste_cost, 2),
        "totalCarbonEmissionsKg": round(total_carbon_kg, 2),
        "totalCarbonEmissionsTonnes": round(total_carbon_kg / 1000.0, 3),
        "potentialCarbonSavingsKg": round(total_potential_carbon_savings, 2),
        "potentialCarbonSavingsTonnes": round(total_potential_carbon_savings / 1000.0, 3),
        "carbonReductionPct": min(carbon_reduction_pct, 100.0),
        "greenestRegionRecommended": greenest_region,
        "recommendationsCount": len(recommendations),
    }

    return summary, recommendations

def save_optimization_log(summary, recommendations):
    """Persist optimization results into DynamoDB."""
    log_id = f"opt-{uuid.uuid4().hex[:12]}"
    now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()
    
    item = {
        "id": log_id,
        "timestamp": now_iso,
        "totalResources": summary["totalResources"],
        "totalMonthlyCost": summary["totalMonthlyCost"],
        "potentialCostSavings": summary["potentialCostSavings"],
        "totalCarbonEmissionsKg": summary["totalCarbonEmissionsKg"],
        "potentialCarbonSavingsKg": summary["potentialCarbonSavingsKg"],
        "carbonReductionPct": summary["carbonReductionPct"],
        "greenestRegion": summary["greenestRegionRecommended"],
        "recommendations": recommendations[:5], # store top 5 in DynamoDB log
        "status": "COMPLETED"
    }
    
    try:
        # Convert floats to DynamoDB Decimal
        dynamo_item = to_dynamo_decimal(item)
        table.put_item(Item=dynamo_item)
        return log_id, True
    except Exception as e:
        print(f"DynamoDB PutItem error: {str(e)}")
        return log_id, False

def get_recent_logs(limit=10):
    """Scan DynamoDB table to retrieve recent optimization logs."""
    try:
        response = table.scan(Limit=limit)
        items = response.get("Items", [])
        # Sort by timestamp descending
        items.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        return items
    except Exception as e:
        print(f"DynamoDB Scan error: {str(e)}")
        return []

def build_response(status_code, body):
    """Standardized CORS HTTP response for API Gateway."""
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Requested-With",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
        },
        "body": json.dumps(body, default=decimal_serializer)
    }

def lambda_handler(event, context):
    """Main AWS Lambda handler supporting both HTTP API v2 and REST API v1."""
    # Preflight CORS support
    http_method = (
        event.get("requestContext", {}).get("http", {}).get("method")
        or event.get("httpMethod")
        or "GET"
    ).upper()

    if http_method == "OPTIONS":
        return build_response(200, {"status": "ok"})

    # Extract path
    raw_path = event.get("rawPath") or event.get("path") or "/"
    # Normalize path (remove trailing slash)
    path = raw_path.rstrip("/")
    if not path:
        path = "/"

    try:
        # Route: Health check
        if path in ["/", "/health", "/api/health"]:
            return build_response(200, {
                "service": "GreenCloud AI Serverless Engine",
                "status": "healthy",
                "version": "1.0.0",
                "architecture": "AWS Lambda + Amazon DynamoDB + Amazon API Gateway"
            })

        # Route: Region Carbon Intensities
        elif path in ["/regions", "/api/regions"]:
            return build_response(200, {
                "regions": CARBON_INTENSITY,
                "count": len(CARBON_INTENSITY),
                "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
            })

        # Route: Run Optimization & Save to DynamoDB
        elif path in ["/optimize", "/api/optimize"] and http_method == "POST":
            body = {}
            if event.get("body"):
                try:
                    body = json.loads(event["body"])
                except Exception:
                    body = {}

            resources = body.get("resources")
            if not resources or not isinstance(resources, list):
                resources = DEFAULT_RESOURCES

            summary, recommendations = calculate_carbon_metrics(resources)
            log_id, saved = save_optimization_log(summary, recommendations)

            return build_response(200, {
                "success": True,
                "logId": log_id,
                "persistedToDynamoDB": saved,
                "summary": summary,
                "recommendations": recommendations,
                "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
            })

        # Route: Fetch Recent Optimization Logs from DynamoDB
        elif path in ["/logs", "/api/logs", "/history"]:
            logs = get_recent_logs(limit=10)
            return build_response(200, {
                "count": len(logs),
                "logs": logs
            })

        else:
            return build_response(404, {
                "error": "Route not found",
                "path": path,
                "availableEndpoints": [
                    "GET /health",
                    "GET /regions",
                    "POST /optimize",
                    "GET /logs"
                ]
            })

    except Exception as e:
        print(f"Internal server error: {str(e)}")
        return build_response(500, {
            "error": "Internal Server Error",
            "message": str(e)
        })

