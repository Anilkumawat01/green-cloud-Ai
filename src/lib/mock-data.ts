// Mock data for GreenCloud AI dashboard

export interface CloudResource {
  id: string;
  name: string;
  type: string;
  instanceType: string;
  provider: 'AWS' | 'GCP' | 'Azure';
  region: string;
  monthlyCost: number;
  status: 'active' | 'idle' | 'orphan';
  lastUsed: string;
  cpuUsage: number;
  memoryUsage: number;
}

export const resources: CloudResource[] = [
  { id: '1', name: 'web-server-prod-01', type: 'Compute', instanceType: 'EC2 t3.large', provider: 'AWS', region: 'us-east-1', monthlyCost: 156, status: 'idle', lastUsed: '23 days ago', cpuUsage: 3, memoryUsage: 12 },
  { id: '2', name: 'ml-training-gpu', type: 'Compute', instanceType: 'EC2 p3.2xlarge', provider: 'AWS', region: 'us-west-2', monthlyCost: 890, status: 'idle', lastUsed: '47 days ago', cpuUsage: 0, memoryUsage: 2 },
  { id: '3', name: 'old-database-backup', type: 'Database', instanceType: 'RDS db.r5.large', provider: 'AWS', region: 'eu-west-1', monthlyCost: 234, status: 'orphan', lastUsed: 'Never accessed', cpuUsage: 0, memoryUsage: 0 },
  { id: '4', name: 'storage-bucket-dev', type: 'Storage', instanceType: 'S3 Standard', provider: 'AWS', region: 'us-east-1', monthlyCost: 45, status: 'idle', lastUsed: '34 days ago', cpuUsage: 0, memoryUsage: 0 },
  { id: '5', name: 'compute-engine-01', type: 'Compute', instanceType: 'n1-standard-4', provider: 'GCP', region: 'us-central1', monthlyCost: 120, status: 'active', lastUsed: '2 minutes ago', cpuUsage: 67, memoryUsage: 54 },
  { id: '6', name: 'staging-vm', type: 'Compute', instanceType: 'Standard_D4s_v3', provider: 'Azure', region: 'eastus', monthlyCost: 340, status: 'idle', lastUsed: '12 days ago', cpuUsage: 1, memoryUsage: 8 },
  { id: '7', name: 'api-gateway-prod', type: 'Networking', instanceType: 'API Gateway', provider: 'AWS', region: 'us-east-1', monthlyCost: 89, status: 'active', lastUsed: '1 minute ago', cpuUsage: 45, memoryUsage: 30 },
  { id: '8', name: 'redis-cache-prod', type: 'Database', instanceType: 'ElastiCache r6g.large', provider: 'AWS', region: 'us-east-1', monthlyCost: 210, status: 'active', lastUsed: '30 seconds ago', cpuUsage: 72, memoryUsage: 85 },
  { id: '9', name: 'bigquery-analytics', type: 'Database', instanceType: 'BigQuery', provider: 'GCP', region: 'us-east4', monthlyCost: 560, status: 'active', lastUsed: '5 minutes ago', cpuUsage: 38, memoryUsage: 42 },
  { id: '10', name: 'dev-kubernetes-cluster', type: 'Compute', instanceType: 'GKE Standard', provider: 'GCP', region: 'europe-west1', monthlyCost: 780, status: 'idle', lastUsed: '8 days ago', cpuUsage: 5, memoryUsage: 15 },
  { id: '11', name: 'blob-storage-archive', type: 'Storage', instanceType: 'Blob Storage Cool', provider: 'Azure', region: 'westeurope', monthlyCost: 32, status: 'orphan', lastUsed: 'Never accessed', cpuUsage: 0, memoryUsage: 0 },
  { id: '12', name: 'lambda-image-resize', type: 'Serverless', instanceType: 'Lambda 512MB', provider: 'AWS', region: 'us-east-1', monthlyCost: 18, status: 'active', lastUsed: '10 minutes ago', cpuUsage: 25, memoryUsage: 45 },
  { id: '13', name: 'cosmos-db-legacy', type: 'Database', instanceType: 'Cosmos DB', provider: 'Azure', region: 'centralus', monthlyCost: 420, status: 'idle', lastUsed: '19 days ago', cpuUsage: 2, memoryUsage: 10 },
  { id: '14', name: 'cloud-functions-api', type: 'Serverless', instanceType: 'Cloud Functions', provider: 'GCP', region: 'us-central1', monthlyCost: 35, status: 'active', lastUsed: '3 minutes ago', cpuUsage: 30, memoryUsage: 20 },
  { id: '15', name: 'test-sql-server', type: 'Database', instanceType: 'SQL Database S3', provider: 'Azure', region: 'eastus2', monthlyCost: 290, status: 'orphan', lastUsed: '62 days ago', cpuUsage: 0, memoryUsage: 0 },
  { id: '16', name: 'cdn-distribution', type: 'Networking', instanceType: 'CloudFront', provider: 'AWS', region: 'Global', monthlyCost: 145, status: 'active', lastUsed: '1 second ago', cpuUsage: 55, memoryUsage: 0 },
  { id: '17', name: 'nat-gateway-dev', type: 'Networking', instanceType: 'NAT Gateway', provider: 'AWS', region: 'us-west-2', monthlyCost: 98, status: 'idle', lastUsed: '15 days ago', cpuUsage: 0, memoryUsage: 0 },
  { id: '18', name: 'gke-autopilot-staging', type: 'Compute', instanceType: 'GKE Autopilot', provider: 'GCP', region: 'asia-south1', monthlyCost: 450, status: 'idle', lastUsed: '6 days ago', cpuUsage: 8, memoryUsage: 22 },
];

export const costTrendData = [
  { month: 'May', cost: 10200, waste: 2800, savings: 0 },
  { month: 'Jun', cost: 11400, waste: 3200, savings: 400 },
  { month: 'Jul', cost: 11800, waste: 3400, savings: 800 },
  { month: 'Aug', cost: 12100, waste: 3600, savings: 1200 },
  { month: 'Sep', cost: 12800, waste: 3900, savings: 1600 },
  { month: 'Oct', cost: 12450, waste: 3840, savings: 2100 },
];

export const serviceBreakdown = [
  { name: 'EC2/Compute', value: 4200, color: '#00d4aa' },
  { name: 'RDS/Database', value: 2800, color: '#6366f1' },
  { name: 'S3/Storage', value: 1400, color: '#8b5cf6' },
  { name: 'Lambda/Serverless', value: 800, color: '#f59e0b' },
  { name: 'Networking', value: 1200, color: '#ec4899' },
  { name: 'Other Services', value: 2050, color: '#64748b' },
];

export const alerts = [
  { id: 1, type: 'warning' as const, title: 'Idle EC2 instance detected', description: 'web-server-prod-01 has been idle for 23 days with <5% CPU utilization', time: '2 hours ago', savings: 156 },
  { id: 2, type: 'danger' as const, title: 'Orphaned RDS database found', description: 'old-database-backup has no connections and no recent queries', time: '5 hours ago', savings: 234 },
  { id: 3, type: 'warning' as const, title: 'GPU instance running idle', description: 'ml-training-gpu has been idle for 47 days — consider termination', time: '1 day ago', savings: 890 },
  { id: 4, type: 'info' as const, title: 'Cost anomaly detected', description: 'BigQuery costs increased by 23% compared to last month', time: '2 days ago', savings: 0 },
];

export const carbonRegions = [
  { region: 'us-east-1', location: 'Virginia, USA', intensity: 450, level: 'HIGH' as const, color: '#ef4444', provider: 'AWS' },
  { region: 'ap-south-1', location: 'Mumbai, India', intensity: 290, level: 'MEDIUM' as const, color: '#f59e0b', provider: 'AWS' },
  { region: 'eu-west-1', location: 'Ireland', intensity: 180, level: 'LOW' as const, color: '#22c55e', provider: 'AWS' },
  { region: 'us-west-2', location: 'Oregon, USA', intensity: 130, level: 'VERY LOW' as const, color: '#00d4aa', provider: 'AWS' },
  { region: 'us-central1', location: 'Iowa, USA', intensity: 410, level: 'HIGH' as const, color: '#ef4444', provider: 'GCP' },
  { region: 'europe-west1', location: 'Belgium', intensity: 160, level: 'LOW' as const, color: '#22c55e', provider: 'GCP' },
  { region: 'asia-south1', location: 'Mumbai, India', intensity: 290, level: 'MEDIUM' as const, color: '#f59e0b', provider: 'GCP' },
  { region: 'eastus', location: 'Virginia, USA', intensity: 450, level: 'HIGH' as const, color: '#ef4444', provider: 'Azure' },
  { region: 'westeurope', location: 'Netherlands', intensity: 170, level: 'LOW' as const, color: '#22c55e', provider: 'Azure' },
  { region: 'centralus', location: 'Iowa, USA', intensity: 410, level: 'HIGH' as const, color: '#ef4444', provider: 'Azure' },
];

export const carbonMonthlyData = [
  { month: 'May', emissions: 2.1, offset: 0.3 },
  { month: 'Jun', emissions: 2.3, offset: 0.4 },
  { month: 'Jul', emissions: 2.5, offset: 0.5 },
  { month: 'Aug', emissions: 2.6, offset: 0.6 },
  { month: 'Sep', emissions: 2.8, offset: 0.7 },
  { month: 'Oct', emissions: 2.4, offset: 0.8 },
];

export interface AIRecommendation {
  id: string;
  issue: string;
  description: string;
  action: string;
  savings: number;
  carbonImpact: number;
  confidence: number;
  category: 'cost' | 'performance' | 'carbon' | 'security';
  priority: 'high' | 'medium' | 'low';
  affectedResources: string[];
}

export const aiRecommendations: AIRecommendation[] = [
  {
    id: '1',
    issue: '3 EC2 instances running 24/7 with <5% CPU',
    description: 'Three EC2 instances in us-east-1 have been consistently underutilized for the past 30 days, averaging less than 5% CPU usage.',
    action: 'Switch to Reserved Instances or shut down overnight using scheduled scaling',
    savings: 450,
    carbonImpact: 0.8,
    confidence: 94,
    category: 'cost',
    priority: 'high',
    affectedResources: ['web-server-prod-01', 'staging-vm', 'nat-gateway-dev'],
  },
  {
    id: '2',
    issue: 'GPU instance idle for 47 days',
    description: 'ml-training-gpu (p3.2xlarge) has been completely idle since the last ML training job completed 47 days ago.',
    action: 'Terminate immediately and use spot instances for future training jobs',
    savings: 890,
    carbonImpact: 1.2,
    confidence: 98,
    category: 'cost',
    priority: 'high',
    affectedResources: ['ml-training-gpu'],
  },
  {
    id: '3',
    issue: 'Orphaned database costing $234/month',
    description: 'old-database-backup RDS instance has no active connections and hasn\'t received queries in over 90 days.',
    action: 'Take a final snapshot, then delete the RDS instance',
    savings: 234,
    carbonImpact: 0.3,
    confidence: 96,
    category: 'cost',
    priority: 'high',
    affectedResources: ['old-database-backup'],
  },
  {
    id: '4',
    issue: 'Move workloads to low-carbon region',
    description: 'Several non-latency-sensitive workloads are running in us-east-1 (450g CO2/kWh) when they could run in us-west-2 (130g CO2/kWh).',
    action: 'Migrate dev-kubernetes-cluster and storage-bucket-dev to Oregon (us-west-2)',
    savings: 85,
    carbonImpact: 2.1,
    confidence: 87,
    category: 'carbon',
    priority: 'medium',
    affectedResources: ['dev-kubernetes-cluster', 'storage-bucket-dev'],
  },
  {
    id: '5',
    issue: 'Right-size GKE cluster for staging',
    description: 'dev-kubernetes-cluster is provisioned with 8 nodes but utilization data shows 2-3 nodes would be sufficient.',
    action: 'Reduce node count to 3 and enable cluster autoscaler',
    savings: 520,
    carbonImpact: 0.6,
    confidence: 91,
    category: 'performance',
    priority: 'medium',
    affectedResources: ['dev-kubernetes-cluster'],
  },
  {
    id: '6',
    issue: 'Switch S3 storage class',
    description: 'storage-bucket-dev contains 2.3TB of data that hasn\'t been accessed in 34 days. Most objects are infrequently accessed.',
    action: 'Move to S3 Infrequent Access or Glacier for rarely accessed archives',
    savings: 28,
    carbonImpact: 0.1,
    confidence: 89,
    category: 'cost',
    priority: 'low',
    affectedResources: ['storage-bucket-dev'],
  },
  {
    id: '7',
    issue: 'Cosmos DB throughput over-provisioned',
    description: 'cosmos-db-legacy has 10,000 RU/s provisioned but peak usage in the last 30 days was only 1,200 RU/s.',
    action: 'Reduce provisioned throughput to 2,000 RU/s or switch to serverless mode',
    savings: 310,
    carbonImpact: 0.4,
    confidence: 93,
    category: 'cost',
    priority: 'high',
    affectedResources: ['cosmos-db-legacy'],
  },
];

export const chatResponses: Record<string, string> = {
  "Why is my AWS bill high?": "Based on my analysis, your AWS bill is elevated primarily due to three factors:\n\n1. **Idle GPU Instance** ($890/mo) — Your ml-training-gpu p3.2xlarge has been idle for 47 days. This single instance accounts for 23% of your total waste.\n\n2. **Over-provisioned databases** ($654/mo) — Both old-database-backup and cosmos-db-legacy are either orphaned or significantly over-provisioned.\n\n3. **Running in expensive regions** — Several workloads in us-east-1 have higher infrastructure costs. Consider migrating non-latency-sensitive workloads to us-west-2.\n\n**Total potential savings: $2,100/month** by implementing the top 5 recommendations.",
  "Which region is most eco-friendly?": "Here's a ranking of your regions by carbon intensity:\n\n🟢 **us-west-2 (Oregon)** — 130g CO2/kWh — Powered primarily by hydroelectric\n🟢 **europe-west1 (Belgium)** — 160g CO2/kWh — Strong renewable mix\n🟢 **westeurope (Netherlands)** — 170g CO2/kWh — Wind & solar heavy\n🟢 **eu-west-1 (Ireland)** — 180g CO2/kWh — Good wind energy mix\n🟡 **ap-south-1 (Mumbai)** — 290g CO2/kWh — Coal-dependent grid\n🔴 **us-east-1 (Virginia)** — 450g CO2/kWh — Mixed fossil fuels\n\n**My recommendation:** Migrate non-latency-critical workloads to **Oregon (us-west-2)** to reduce your carbon footprint by up to **71%** while potentially lowering costs.",
  "How can I reduce carbon emissions?": "Here are the top 5 strategies to reduce your cloud carbon footprint:\n\n1. **Region Migration** — Move workloads from Virginia (450g CO2/kWh) to Oregon (130g CO2/kWh). Estimated savings: 2.1 tonnes CO2/year.\n\n2. **Right-size Instances** — Terminating idle resources reduces both cost and carbon. Your idle instances produce ~0.8 tonnes CO2/month unnecessarily.\n\n3. **Schedule Non-Production** — Shut down dev/staging environments outside business hours. This can reduce emissions by 65% for those workloads.\n\n4. **Use Spot/Preemptible Instances** — For batch processing, spot instances utilize existing capacity more efficiently.\n\n5. **Optimize Storage** — Moving cold data to efficient storage tiers reduces the energy needed for data retention.\n\n**Total estimated carbon reduction: 3.2 tonnes CO2/year**",
  "Show me cost optimization tips": "Here are your personalized cost optimization tips:\n\n💰 **Immediate Actions (saves $1,124/mo):**\n- Terminate ml-training-gpu → saves $890/mo\n- Delete old-database-backup → saves $234/mo\n\n📊 **Short-term Actions (saves $830/mo):**\n- Right-size GKE cluster → saves $520/mo\n- Reduce Cosmos DB throughput → saves $310/mo\n\n🔄 **Long-term Actions (saves $146/mo):**\n- Switch to reserved instances → saves $118/mo\n- Optimize S3 storage class → saves $28/mo\n\n**Total Potential Monthly Savings: $2,100**\n**Annual Savings: $25,200**",
};

export const reportData = {
  monthly: [
    { month: 'Nov 2025', totalCost: 9800, waste: 2100, savings: 0, carbon: 1.8 },
    { month: 'Dec 2025', totalCost: 10100, waste: 2400, savings: 200, carbon: 1.9 },
    { month: 'Jan 2026', totalCost: 10500, waste: 2600, savings: 500, carbon: 2.0 },
    { month: 'Feb 2026', totalCost: 10200, waste: 2500, savings: 700, carbon: 1.9 },
    { month: 'Mar 2026', totalCost: 10800, waste: 2900, savings: 900, carbon: 2.1 },
    { month: 'Apr 2026', totalCost: 11200, waste: 3100, savings: 1100, carbon: 2.2 },
    { month: 'May 2026', totalCost: 10200, waste: 2800, savings: 1400, carbon: 2.1 },
    { month: 'Jun 2026', totalCost: 11400, waste: 3200, savings: 1600, carbon: 2.3 },
    { month: 'Jul 2026', totalCost: 11800, waste: 3400, savings: 1800, carbon: 2.5 },
    { month: 'Aug 2026', totalCost: 12100, waste: 3600, savings: 2000, carbon: 2.6 },
    { month: 'Sep 2026', totalCost: 12800, waste: 3900, savings: 2100, carbon: 2.8 },
    { month: 'Oct 2026', totalCost: 12450, waste: 3840, savings: 2100, carbon: 2.4 },
  ],
};

export const teamMembers = [
  { name: 'Anil Kumar', email: 'anil@greencloud.ai', role: 'Admin', avatar: 'AK' },
  { name: 'Sarah Chen', email: 'sarah@greencloud.ai', role: 'Editor', avatar: 'SC' },
  { name: 'James Wilson', email: 'james@greencloud.ai', role: 'Viewer', avatar: 'JW' },
  { name: 'Priya Sharma', email: 'priya@greencloud.ai', role: 'Editor', avatar: 'PS' },
];
