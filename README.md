# GreenCloud AI 🌿⚡
> **Smart Cloud Waste & Carbon Optimizer**  
> *AWS Serverless Hackathon Submission: "Weekend Challenge: No Pipeline, No Problem"*

GreenCloud AI detects idle and orphaned cloud infrastructure across providers, calculates real-time carbon grid intensity (gCO₂/kWh), computes potential cost & emissions savings, and provides automated region migration recommendations to the greenest AWS data centers.

---

## 🏗️ Fully Serverless Architecture

Built on **100% AWS Serverless** components with zero pipelines and zero idle server cost:

```
[ Next.js Frontend / Client ]
            │
            ▼  (CORS Enabled HTTP API)
┌───────────────────────────────────────────────┐
│           Amazon API Gateway                  │
│       (AWS::Serverless::HttpApi)             │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│            AWS Lambda (Python 3.11)           │
│   - Regional Carbon Intensity Engine          │
│   - Waste & Rightsizing Detection             │
│   - Green Region Recommender                  │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│           Amazon DynamoDB                     │
│   - On-Demand (PAY_PER_REQUEST)               │
│   - Optimization Run Audit Logs               │
└───────────────────────────────────────────────┘
```

- **Amazon API Gateway (HTTP API v2)**: Low-latency, native CORS support, routes traffic to Lambda.
- **AWS Lambda (Python 3.11)**: Estimates energy usage (kWh), computes carbon metrics based on real-time regional grid emission factors (EPA eGRID / Electricity Maps), detects idle/orphaned assets, and generates ranked recommendations.
- **Amazon DynamoDB**: Serverless NoSQL table storing optimization logs and audit trails on demand.
- **AWS SAM (Serverless Application Model)**: Single `template.yaml` for 1-click zero-pipeline deployment.

---

## 🚀 Quick Deploy (Zero Pipeline - 2 Commands)

To deploy the entire serverless backend to your AWS account immediately:

```bash
# 1. Build the SAM application
sam build

# 2. Deploy to AWS (guided on first run, saves configuration)
sam deploy --guided
```

*(Accept the default prompts or choose your preferred AWS Region, e.g. `us-east-1` or `us-west-2`)*

Or run non-interactively in one single command:
```bash
sam deploy --resolve-s3 --stack-name greencloud-ai --capabilities CAPABILITY_IAM
```

Once deployment completes, SAM will print the **ApiEndpoint** output:
```text
Outputs
-------------------------------------------------------------------------------------------------------------------
Key                 ApiEndpoint
Description         HTTP API Gateway URL
Value               https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
-------------------------------------------------------------------------------------------------------------------
```

---

## 🔌 Connect Frontend to Backend

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set your API URL:
   ```env
   NEXT_PUBLIC_API_URL=https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
   ```
3. Run the frontend:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/optimize` | Analyzes resources, calculates carbon emissions & savings, logs run to DynamoDB |
| `GET`  | `/logs` | Fetches historical optimization runs directly from DynamoDB |
| `GET`  | `/regions` | Retrieves global cloud carbon intensity metrics & renewable percentages |
| `GET`  | `/health` | Service health status check |

### Sample Payload (`POST /optimize`):
```json
{
  "resources": [
    {
      "name": "web-server-prod-01",
      "type": "Compute",
      "instanceType": "EC2 t3.large",
      "region": "us-east-1",
      "monthlyCost": 156,
      "status": "idle",
      "cpuUsage": 3
    }
  ]
}
```
*(If no payload is passed, the engine runs analysis on default simulated infrastructure).*

---

## 🛠️ Repository Structure

```
├── backend/
│   ├── app.py             # Python AWS Lambda function (Calculations + DynamoDB)
│   └── requirements.txt   # Lambda dependencies (boto3)
├── src/                   # Next.js 16 frontend application
│   ├── app/               # App Router pages (Dashboard, Carbon Tracker, AI Advisor)
│   └── lib/
│       ├── api.ts         # Frontend client for AWS Serverless API Gateway
│       └── mock-data.ts   # Baseline resource data
├── template.yaml          # AWS SAM Serverless Application Model specification
└── README.md
```
