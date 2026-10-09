# GreenCloud AI — Complete Full-Stack Codebase Bundle

This document contains the entire application code for **GreenCloud AI (Smart Cloud Waste & Carbon Optimizer)**.
It is structured so you can upload or paste this file directly into ChatGPT, Claude, or any AI assistant for explanation, code review, or further development.

## System Overview
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom Glassmorphism Theme tokens (#0a0f1e, #00d4aa, #f59e0b, #ef4444)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Table of Contents
1. [package.json](#file-package-json)
2. [src/app/globals.css](#file-src-app-globals-css)
3. [src/app/layout.tsx](#file-src-app-layout-tsx)
4. [src/lib/mock-data.ts](#file-src-lib-mock-data-ts)
5. [src/lib/hooks.ts](#file-src-lib-hooks-ts)
6. [src/components/toast-provider.tsx](#file-src-components-toast-provider-tsx)
7. [src/app/page.tsx](#file-src-app-page-tsx)
8. [src/app/dashboard/layout.tsx](#file-src-app-dashboard-layout-tsx)
9. [src/app/dashboard/page.tsx](#file-src-app-dashboard-page-tsx)
10. [src/app/dashboard/resources/page.tsx](#file-src-app-dashboard-resources-page-tsx)
11. [src/app/dashboard/ai-advisor/page.tsx](#file-src-app-dashboard-ai-advisor-page-tsx)
12. [src/app/dashboard/carbon/page.tsx](#file-src-app-dashboard-carbon-page-tsx)
13. [src/app/dashboard/reports/page.tsx](#file-src-app-dashboard-reports-page-tsx)
14. [src/app/dashboard/settings/page.tsx](#file-src-app-dashboard-settings-page-tsx)

---

## File: `package.json` {#file-package-json}

```json
{
  "name": "greencloud-ai",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "framer-motion": "^14.0.0",
    "lucide-react": "^1.52.0",
    "next": "16.4.0",
    "react": "19.3.0",
    "react-dom": "19.3.0",
    "recharts": "^3.10.1"
  },
  "devDependencies": {
    "@tailwindcss/turbopack": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.4.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## File: `src/app/globals.css` {#file-src-app-globals-css}

```css
@import "tailwindcss";

@theme inline {
  --color-background: #0a0f1e;
  --color-foreground: #e2e8f0;
  --color-accent: #00d4aa;
  --color-accent-dark: #00b894;
  --color-accent-glow: rgba(0, 212, 170, 0.15);
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-success: #22c55e;
  --color-surface: rgba(15, 23, 42, 0.6);
  --color-surface-hover: rgba(15, 23, 42, 0.8);
  --color-border: rgba(148, 163, 184, 0.1);
  --color-border-hover: rgba(148, 163, 184, 0.2);
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-card: rgba(15, 23, 42, 0.5);
  --color-card-hover: rgba(15, 23, 42, 0.7);
  --color-sidebar: rgba(10, 15, 30, 0.95);
  --color-aws: #ff9900;
  --color-gcp: #4285f4;
  --color-azure: #0078d4;
  --font-sans: 'Inter', system-ui, sans-serif;
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.2) transparent;
}

*::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.2);
  border-radius: 3px;
}

*::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.3);
}

html {
  scroll-behavior: smooth;
}

body {
  background: #0a0f1e;
  color: #e2e8f0;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Glass Card */
.glass-card {
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  background: rgba(15, 23, 42, 0.7);
  border-color: rgba(148, 163, 184, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 212, 170, 0.05);
}

.glass-card-static {
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
}

/* Glow effects */
.glow-accent {
  box-shadow: 0 0 20px rgba(0, 212, 170, 0.15), 0 0 60px rgba(0, 212, 170, 0.05);
}

.glow-accent-strong {
  box-shadow: 0 0 30px rgba(0, 212, 170, 0.25), 0 0 80px rgba(0, 212, 170, 0.1);
}

/* Gradient backgrounds */
.gradient-mesh {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(0, 212, 170, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(99, 102, 241, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 40% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%),
    #0a0f1e;
}

.gradient-hero {
  background:
    radial-gradient(ellipse at 30% 0%, rgba(0, 212, 170, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 100%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
    linear-gradient(180deg, #0a0f1e 0%, #0d1425 100%);
}

/* Button styles */
.btn-primary {
  background: linear-gradient(135deg, #00d4aa, #00b894);
  color: #0a0f1e;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(0, 212, 170, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #e2e8f0;
  font-weight: 500;
  padding: 12px 28px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-secondary:hover {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(0, 212, 170, 0.3);
  transform: translateY(-1px);
}

/* Shimmer / Skeleton loading */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    rgba(15, 23, 42, 0.5) 25%,
    rgba(30, 41, 59, 0.5) 50%,
    rgba(15, 23, 42, 0.5) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

/* Pulse glow for notifications */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 212, 170, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(0, 212, 170, 0); }
}

.pulse-glow {
  animation: pulse-glow 2s infinite;
}

/* Grid background */
.grid-bg {
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Toast animation */
@keyframes toast-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes toast-out {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}

.toast-enter {
  animation: toast-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-exit {
  animation: toast-out 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Status badges */
.badge-active {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.badge-idle {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge-orphan {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

/* Number counter animation */
@keyframes count-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-count {
  animation: count-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Chat bubble */
.chat-bubble-ai {
  background: rgba(0, 212, 170, 0.08);
  border: 1px solid rgba(0, 212, 170, 0.15);
  border-radius: 16px 16px 16px 4px;
}

.chat-bubble-user {
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 16px 16px 4px 16px;
}

/* Custom selection */
::selection {
  background: rgba(0, 212, 170, 0.3);
  color: #f1f5f9;
}

/* Table row hover */
.table-row-hover {
  transition: background-color 0.2s ease;
}
.table-row-hover:hover {
  background-color: rgba(15, 23, 42, 0.5);
}

/* Sidebar active indicator */
.sidebar-active {
  background: rgba(0, 212, 170, 0.1);
  border-right: 2px solid #00d4aa;
  color: #00d4aa;
}
```

---

## File: `src/app/layout.tsx` {#file-src-app-layout-tsx}

```typescript
import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  title: "GreenCloud AI — Smart Cloud Waste & Carbon Optimizer",
  description: "Detect wasted cloud resources, track carbon footprint, and get AI-powered recommendations to save money and reduce emissions across AWS, GCP, and Azure.",
  keywords: "cloud cost optimization, carbon footprint, cloud waste, AWS, GCP, Azure, sustainability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

---

## File: `src/lib/mock-data.ts` {#file-src-lib-mock-data-ts}

```typescript
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
```

---

## File: `src/lib/hooks.ts` {#file-src-lib-hooks-ts}

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';

export function useCountUp(end: number, duration: number = 2000, decimals: number = 0, startOnMount: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnMount) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnMount, hasStarted]);

  useEffect(() => {
    if (!hasStarted && startOnMount) return;
    if (!startOnMount) setHasStarted(true);

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * end;

      setCount(Number(current.toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, decimals, hasStarted, startOnMount]);

  return { count, ref };
}

export function useInView(threshold: number = 0.1) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { isInView, ref };
}
```

---

## File: `src/components/toast-provider.tsx` {#file-src-components-toast-provider-tsx}

```typescript
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertTriangle, Info } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-[#00d4aa]" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-[#ef4444]" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />;
      case 'info': return <Info className="w-5 h-5 text-[#6366f1]" />;
    }
  };

  const getBorderColor = (type: Toast['type']) => {
    switch (type) {
      case 'success': return 'border-l-[#00d4aa]';
      case 'error': return 'border-l-[#ef4444]';
      case 'warning': return 'border-l-[#f59e0b]';
      case 'info': return 'border-l-[#6366f1]';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3" style={{ maxWidth: '400px' }}>
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`glass-card-static p-4 flex items-start gap-3 border-l-4 ${getBorderColor(toast.type)} cursor-pointer`}
              onClick={() => removeToast(toast.id)}
            >
              {getIcon(toast.type)}
              <p className="text-sm text-[#e2e8f0] flex-1">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="text-[#64748b] hover:text-[#e2e8f0] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
```

---

## File: `src/app/page.tsx` {#file-src-app-page-tsx}

```typescript
'use client';

import { motion } from 'framer-motion';
import { useCountUp } from '@/lib/hooks';
import Link from 'next/link';
import {
  Cloud, Leaf, Brain, DollarSign, TrendingDown, Shield, Zap,
  CheckCircle, ArrowRight, BarChart3, Globe2, Cpu, ChevronRight,
  Star, Users, Building
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

function AnimatedCounter({ end, prefix = '', suffix = '', decimals = 0 }: { end: number; prefix?: string; suffix?: string; decimals?: number }) {
  const { count, ref } = useCountUp(end, 2500, decimals);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen gradient-hero grid-bg overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0a0f1e]/70 border-b border-[rgba(148,163,184,0.08)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#0a0f1e]" />
            </div>
            <span className="text-lg font-bold text-white">GreenCloud<span className="text-[#00d4aa]"> AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#94a3b8] hover:text-white transition-colors">Features</a>
            <a href="#comparison" className="text-sm text-[#94a3b8] hover:text-white transition-colors">Compare</a>
            <a href="#stats" className="text-sm text-[#94a3b8] hover:text-white transition-colors">Impact</a>
            <Link href="/dashboard" className="btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Link href="/dashboard" className="md:hidden btn-primary text-sm px-4 py-2">
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00d4aa]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#6366f1]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20 mb-8">
            <Zap className="w-4 h-4 text-[#00d4aa]" />
            <span className="text-sm text-[#00d4aa] font-medium">AI-Powered Cloud Optimization</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Stop Wasting Cloud.{' '}
            <span className="bg-gradient-to-r from-[#00d4aa] to-[#6366f1] bg-clip-text text-transparent">
              Start Saving Planet.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-[#94a3b8] max-w-3xl mx-auto mb-8">
            Detect idle resources, slash carbon emissions, and save thousands on cloud bills — powered by AI that understands your infrastructure.
          </motion.p>

          {/* Animated waste counter */}
          <motion.div variants={fadeUp} className="glass-card-static inline-flex items-center gap-4 px-6 py-4 mb-10">
            <div className="w-3 h-3 rounded-full bg-[#ef4444] animate-pulse" />
            <div className="text-left">
              <p className="text-sm text-[#94a3b8]">Cloud resources wasted globally every day</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                $<AnimatedCounter end={2.4} decimals={1} />B+
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary text-base px-8 py-4 inline-flex items-center justify-center gap-2 font-semibold">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="btn-secondary text-base px-8 py-4 inline-flex items-center justify-center gap-2">
              View Live Demo <BarChart3 className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-6 text-sm text-[#64748b]">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#00d4aa]" /> No credit card</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#00d4aa]" /> 14-day free trial</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#00d4aa]" /> Setup in 5 mins</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-[rgba(148,163,184,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-[#64748b] uppercase tracking-widest mb-8">Trusted by engineering teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {['Stripe', 'Shopify', 'Datadog', 'Notion', 'Linear', 'Vercel'].map((company) => (
              <div key={company} className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#94a3b8]" />
                <span className="text-lg font-semibold text-[#94a3b8]">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything you need to optimize cloud spend</h2>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">One platform to detect waste, reduce carbon, and save money across all your cloud providers.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: DollarSign, title: 'Cost Savings Engine', desc: 'Automatically detect idle resources, over-provisioned instances, and orphaned storage. Save 30%+ on cloud bills.', color: '#00d4aa' },
              { icon: Leaf, title: 'Carbon Footprint Tracker', desc: 'Real-time CO2 tracking per resource, region, and provider. Generate ESG-compliant sustainability reports.', color: '#22c55e' },
              { icon: Brain, title: 'AI Recommendations', desc: 'Machine learning models analyze usage patterns to suggest right-sizing, scheduling, and migration optimizations.', color: '#6366f1' },
              { icon: Globe2, title: 'Multi-Cloud Support', desc: 'Unified view across AWS, GCP, and Azure. One dashboard for all your cloud infrastructure.', color: '#f59e0b' },
              { icon: TrendingDown, title: 'Waste Detection', desc: 'Identify zombie instances, unused EBS volumes, detached IPs, and idle load balancers within minutes.', color: '#ef4444' },
              { icon: Shield, title: 'Compliance Ready', desc: 'Generate reports for SOC 2, ISO 27001, and ESG compliance. Audit trails for all recommendations.', color: '#8b5cf6' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${feature.color}15` }}>
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d4aa]/3 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The cloud waste crisis is real</h2>
            <p className="text-[#94a3b8] text-lg">And it&apos;s costing both your budget and the planet.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { value: 32, suffix: '%', label: 'Average Cloud Waste', sub: 'of cloud spend is wasted on unused resources', icon: Cpu },
              { value: 450, suffix: 'g', label: 'CO2 per kWh', sub: 'carbon intensity in high-emission data center regions', icon: Cloud },
              { value: 500, suffix: 'K+', label: 'Companies Affected', sub: 'businesses overspending on cloud infrastructure globally', icon: Users },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card p-8 text-center"
              >
                <stat.icon className="w-8 h-8 text-[#00d4aa] mx-auto mb-4" />
                <p className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} />{stat.suffix}
                </p>
                <p className="text-lg font-semibold text-[#e2e8f0] mb-1">{stat.label}</p>
                <p className="text-sm text-[#64748b]">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why teams choose GreenCloud AI</h2>
            <p className="text-[#94a3b8] text-lg">See how we compare to alternatives.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-static overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(148,163,184,0.1)]">
                    <th className="text-left p-4 text-[#94a3b8] font-medium">Feature</th>
                    <th className="p-4 text-center">
                      <span className="text-[#00d4aa] font-bold">GreenCloud AI</span>
                    </th>
                    <th className="p-4 text-center text-[#94a3b8] font-medium">CloudHealth</th>
                    <th className="p-4 text-center text-[#94a3b8] font-medium">AWS Cost Explorer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Multi-cloud support', true, true, false],
                    ['AI-powered recommendations', true, false, false],
                    ['Carbon footprint tracking', true, false, false],
                    ['Real-time waste detection', true, true, false],
                    ['ESG compliance reports', true, false, false],
                    ['Region migration advisor', true, false, false],
                    ['Free tier available', true, false, true],
                    ['Setup time', '5 min', '2 hours', '30 min'],
                    ['Starting price', '$0/mo', '$500/mo', 'Free*'],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[rgba(148,163,184,0.06)] table-row-hover">
                      <td className="p-4 text-[#e2e8f0] font-medium">{row[0]}</td>
                      {[1, 2, 3].map(col => (
                        <td key={col} className="p-4 text-center">
                          {typeof row[col] === 'boolean' ? (
                            row[col] ? (
                              <CheckCircle className="w-5 h-5 text-[#00d4aa] mx-auto" />
                            ) : (
                              <span className="text-[#64748b]">—</span>
                            )
                          ) : (
                            <span className={col === 1 ? 'text-[#00d4aa] font-semibold' : 'text-[#94a3b8]'}>{row[col] as string}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 text-center relative"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
              ))}
            </div>
            <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6">
              &ldquo;GreenCloud AI helped us identify $14,000/month in wasted cloud resources we didn&apos;t even know existed. The carbon tracking was the cherry on top for our ESG goals.&rdquo;
            </blockquote>
            <div>
              <p className="text-[#e2e8f0] font-semibold">Sarah Chen</p>
              <p className="text-sm text-[#64748b]">VP of Engineering, TechCorp Inc.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00d4aa]/5 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to optimize your cloud?
          </h2>
          <p className="text-lg text-[#94a3b8] mb-8">
            Join 500+ companies saving money and reducing carbon emissions with GreenCloud AI.
          </p>
          <Link href="/dashboard" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2 font-semibold">
            Get Started Free <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(148,163,184,0.06)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-[#0a0f1e]" />
            </div>
            <span className="text-sm font-semibold text-[#94a3b8]">GreenCloud AI</span>
          </div>
          <p className="text-sm text-[#64748b]">© 2026 GreenCloud AI. Building a sustainable cloud future.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#64748b] hover:text-[#00d4aa] transition-colors">Privacy</a>
            <a href="#" className="text-sm text-[#64748b] hover:text-[#00d4aa] transition-colors">Terms</a>
            <a href="#" className="text-sm text-[#64748b] hover:text-[#00d4aa] transition-colors">Blog</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

## File: `src/app/dashboard/layout.tsx` {#file-src-app-dashboard-layout-tsx}

```typescript
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, LayoutDashboard, Server, Globe2, Brain, FileText, Settings,
  Bell, ChevronLeft, Menu, LogOut, Search
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/resources', label: 'Resources', icon: Server },
  { href: '/dashboard/carbon', label: 'Carbon Tracker', icon: Globe2 },
  { href: '/dashboard/ai-advisor', label: 'AI Advisor', icon: Brain },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Idle EC2 instance detected — web-server-prod-01', time: '2h ago', read: false },
    { id: 2, text: 'Monthly cost report ready for download', time: '5h ago', read: false },
    { id: 3, text: 'AI found 3 new optimization opportunities', time: '1d ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0a0f1e] grid-bg flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-[rgba(10,15,30,0.95)] border-r border-[rgba(148,163,184,0.08)] z-40 overflow-hidden"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[rgba(148,163,184,0.08)]">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-[#0a0f1e]" />
                </div>
                <span className="text-sm font-bold text-white whitespace-nowrap">GreenCloud<span className="text-[#00d4aa]"> AI</span></span>
              </motion.div>
            )}
          </AnimatePresence>
          {!sidebarOpen && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center flex-shrink-0 mx-auto">
              <Leaf className="w-5 h-5 text-[#0a0f1e]" />
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-[#00d4aa]/10 text-[#00d4aa]'
                      : 'text-[#94a3b8] hover:bg-[rgba(148,163,184,0.06)] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#00d4aa] rounded-r-full"
                      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#00d4aa]' : 'text-[#64748b] group-hover:text-[#94a3b8]'}`} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[rgba(148,163,184,0.08)]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-[#64748b] hover:text-white hover:bg-[rgba(148,163,184,0.06)] transition-all"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[260px] bg-[rgba(10,15,30,0.98)] border-r border-[rgba(148,163,184,0.08)] z-50 flex flex-col"
            >
              <div className="h-16 flex items-center px-4 border-b border-[rgba(148,163,184,0.08)]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-[#0a0f1e]" />
                  </div>
                  <span className="text-sm font-bold text-white">GreenCloud<span className="text-[#00d4aa]"> AI</span></span>
                </div>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map(item => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive ? 'bg-[#00d4aa]/10 text-[#00d4aa]' : 'text-[#94a3b8] hover:bg-[rgba(148,163,184,0.06)] hover:text-white'
                      }`}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[72px]'}`}>
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-[rgba(148,163,184,0.08)] bg-[rgba(10,15,30,0.8)] backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[rgba(148,163,184,0.06)] transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-[rgba(148,163,184,0.06)] rounded-xl px-3 py-2 w-64">
              <Search className="w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                placeholder="Search resources..."
                className="bg-transparent text-sm text-[#e2e8f0] placeholder-[#64748b] outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[rgba(148,163,184,0.06)] transition-all"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#ef4444] rounded-full text-[10px] font-bold text-white flex items-center justify-center pulse-glow">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-80 glass-card-static overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-[rgba(148,163,184,0.1)]">
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`px-4 py-3 border-b border-[rgba(148,163,184,0.06)] hover:bg-[rgba(148,163,184,0.04)] transition-colors ${!n.read ? 'bg-[#00d4aa]/5' : ''}`}>
                          <p className="text-sm text-[#e2e8f0]">{n.text}</p>
                          <p className="text-xs text-[#64748b] mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Avatar */}
            <Link href="/" className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[rgba(148,163,184,0.06)] transition-all">
              <LogOut className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#6366f1] flex items-center justify-center text-xs font-bold text-white">
              AK
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
```

---

## File: `src/app/dashboard/page.tsx` {#file-src-app-dashboard-page-tsx}

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign, AlertTriangle, Leaf, TrendingDown, TrendingUp,
  ArrowUpRight, ArrowDownRight, AlertCircle, Info, ChevronRight
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { costTrendData, serviceBreakdown, alerts } from '@/lib/mock-data';
import { useCountUp } from '@/lib/hooks';
import Link from 'next/link';

function StatCard({ title, value, prefix, suffix, trend, trendValue, color, icon: Icon, delay, decimals = 0 }: {
  title: string; value: number; prefix?: string; suffix?: string; trend: 'up' | 'down'; trendValue: string;
  color: string; icon: React.ElementType; delay: number; decimals?: number;
}) {
  const { count, ref } = useCountUp(value, 2000, decimals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800 + delay * 200);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      {loading ? (
        <div className="space-y-3">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-8 w-32" />
          <div className="skeleton h-3 w-20" />
        </div>
      ) : (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -mr-8 -mt-8 transition-transform group-hover:scale-110" style={{ backgroundColor: color }} />
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#94a3b8] font-medium">{title}</p>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
          </div>
          <p ref={ref} className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {prefix}{count.toLocaleString()}{suffix}
          </p>
          <div className="flex items-center gap-1.5">
            {trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-[#ef4444]" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-[#00d4aa]" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-[#ef4444]' : 'text-[#00d4aa]'}`}>
              {trendValue}
            </span>
            <span className="text-xs text-[#64748b]">vs last month</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card-static p-3 text-xs">
        <p className="text-[#94a3b8] mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="font-medium" style={{ color: entry.color }}>
            {entry.dataKey}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [chartsLoaded, setChartsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setChartsLoaded(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const alertIcons: Record<string, React.ElementType> = {
    warning: AlertTriangle,
    danger: AlertCircle,
    info: Info,
  };

  const alertColors: Record<string, string> = {
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#6366f1',
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-sm text-[#64748b] mt-1">Monitor your cloud costs, waste, and carbon footprint</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#64748b]">
          <div className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
          Live data · Last updated 2 min ago
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Monthly Cost" value={12450} prefix="$" trend="up" trendValue="+5.2%" color="#6366f1" icon={DollarSign} delay={0} />
        <StatCard title="Wasted Resources" value={3840} prefix="$" suffix="" trend="up" trendValue="+8.1%" color="#ef4444" icon={AlertTriangle} delay={1} />
        <StatCard title="Carbon Footprint" value={2.4} suffix=" t CO₂" trend="down" trendValue="-12%" color="#22c55e" icon={Leaf} delay={2} decimals={1} />
        <StatCard title="Potential Savings" value={2100} prefix="$" suffix="/mo" trend="down" trendValue="+$300" color="#00d4aa" icon={TrendingDown} delay={3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card-static p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Cost Trend</h3>
              <p className="text-xs text-[#64748b] mt-1">Total spend vs waste over 6 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#6366f1] rounded" /> Total</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#ef4444] rounded" /> Waste</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#00d4aa] rounded" /> Savings</span>
            </div>
          </div>
          {chartsLoaded ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={costTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="cost" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="waste" stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="savings" stroke="#00d4aa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] skeleton" />
          )}
        </motion.div>

        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card-static p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-1">Cost by Service</h3>
          <p className="text-xs text-[#64748b] mb-4">Monthly breakdown</p>
          {chartsLoaded ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={serviceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {serviceBreakdown.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-card-static p-2 text-xs">
                            <p className="text-white font-medium">{payload[0].name}</p>
                            <p className="text-[#94a3b8]">${(payload[0].value as number).toLocaleString()}/mo</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {serviceBreakdown.map(item => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[#94a3b8]">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[380px] skeleton" />
          )}
        </motion.div>
      </div>

      {/* Alerts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card-static p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
            <Link href="/dashboard/resources" className="text-xs text-[#00d4aa] hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, i) => {
              const AlertIcon = alertIcons[alert.type] || Info;
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-[rgba(148,163,184,0.04)] transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${alertColors[alert.type]}15` }}>
                    <AlertIcon className="w-4 h-4" style={{ color: alertColors[alert.type] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-[#00d4aa] transition-colors">{alert.title}</p>
                    <p className="text-xs text-[#64748b] mt-0.5 line-clamp-1">{alert.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-[#64748b]">{alert.time}</p>
                    {alert.savings > 0 && (
                      <p className="text-xs text-[#00d4aa] font-medium mt-0.5">Save ${alert.savings}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card-static p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Run AI Scan', desc: 'Find new savings', href: '/dashboard/ai-advisor', color: '#00d4aa', icon: TrendingDown },
              { label: 'View Resources', desc: '18 resources tracked', href: '/dashboard/resources', color: '#6366f1', icon: TrendingUp },
              { label: 'Carbon Report', desc: 'ESG-ready export', href: '/dashboard/carbon', color: '#22c55e', icon: Leaf },
              { label: 'Cost Report', desc: 'Monthly summary', href: '/dashboard/reports', color: '#f59e0b', icon: DollarSign },
            ].map((action, i) => (
              <Link key={action.label} href={action.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl border border-[rgba(148,163,184,0.08)] hover:border-[rgba(148,163,184,0.15)] bg-[rgba(15,23,42,0.3)] hover:bg-[rgba(15,23,42,0.5)] transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${action.color}15` }}>
                    <action.icon className="w-4.5 h-4.5" style={{ color: action.color }} />
                  </div>
                  <p className="text-sm font-semibold text-white group-hover:text-[#00d4aa] transition-colors">{action.label}</p>
                  <p className="text-xs text-[#64748b] mt-0.5">{action.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Savings Progress */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#00d4aa]/5 to-[#00d4aa]/10 border border-[#00d4aa]/15">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white">Optimization Progress</p>
              <p className="text-sm font-bold text-[#00d4aa]">68%</p>
            </div>
            <div className="w-full h-2 bg-[rgba(148,163,184,0.1)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#00d4aa] to-[#00b894] rounded-full"
              />
            </div>
            <p className="text-xs text-[#64748b] mt-2">5 of 7 recommendations applied</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

---

## File: `src/app/dashboard/resources/page.tsx` {#file-src-app-dashboard-resources-page-tsx}

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Server, Trash2, ArrowDownToLine, ExternalLink } from 'lucide-react';
import { resources, CloudResource } from '@/lib/mock-data';
import { useToast } from '@/components/toast-provider';

type FilterType = 'all' | 'AWS' | 'GCP' | 'Azure' | 'idle' | 'highcost';

const providerColors: Record<string, string> = {
  AWS: '#ff9900',
  GCP: '#4285f4',
  Azure: '#0078d4',
};

const statusConfig: Record<string, { label: string; class: string }> = {
  active: { label: 'Active', class: 'badge-active' },
  idle: { label: 'Idle', class: 'badge-idle' },
  orphan: { label: 'Orphan', class: 'badge-orphan' },
};

export default function ResourcesPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [resourceList, setResourceList] = useState<CloudResource[]>(resources);
  const { showToast } = useToast();

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'AWS', value: 'AWS' },
    { label: 'GCP', value: 'GCP' },
    { label: 'Azure', value: 'Azure' },
    { label: 'Idle Only', value: 'idle' },
    { label: 'High Cost', value: 'highcost' },
  ];

  const filteredResources = resourceList.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.instanceType.toLowerCase().includes(search.toLowerCase()) ||
      r.region.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === 'all' ||
      (filter === 'AWS' && r.provider === 'AWS') ||
      (filter === 'GCP' && r.provider === 'GCP') ||
      (filter === 'Azure' && r.provider === 'Azure') ||
      (filter === 'idle' && (r.status === 'idle' || r.status === 'orphan')) ||
      (filter === 'highcost' && r.monthlyCost > 200);

    return matchesSearch && matchesFilter;
  });

  const totalCost = filteredResources.reduce((sum, r) => sum + r.monthlyCost, 0);
  const wastedCost = filteredResources.filter(r => r.status !== 'active').reduce((sum, r) => sum + r.monthlyCost, 0);

  const handleTerminate = (resource: CloudResource) => {
    setResourceList(prev => prev.filter(r => r.id !== resource.id));
    showToast(`Terminated ${resource.name} — saving $${resource.monthlyCost}/month`, 'success');
  };

  const handleResize = (resource: CloudResource) => {
    showToast(`Resize initiated for ${resource.name} — estimated 40% cost reduction`, 'info');
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Cloud Resources</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage and optimize all your cloud infrastructure</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card-static px-3 py-1.5 flex items-center gap-2 text-sm">
            <span className="text-[#94a3b8]">Total:</span>
            <span className="text-white font-semibold">${totalCost.toLocaleString()}/mo</span>
          </div>
          <div className="glass-card-static px-3 py-1.5 flex items-center gap-2 text-sm">
            <span className="text-[#94a3b8]">Waste:</span>
            <span className="text-[#ef4444] font-semibold">${wastedCost.toLocaleString()}/mo</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 bg-[rgba(148,163,184,0.06)] rounded-xl px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-[#64748b]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, type, or region..."
            className="bg-transparent text-sm text-[#e2e8f0] placeholder-[#64748b] outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-[#64748b]" />
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f.value
                  ? 'bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/30'
                  : 'bg-[rgba(148,163,184,0.06)] text-[#94a3b8] border border-transparent hover:bg-[rgba(148,163,184,0.1)] hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card-static overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(148,163,184,0.1)]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider">Resource</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider hidden sm:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider">Provider</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider hidden md:table-cell">Region</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider">Cost/mo</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider hidden lg:table-cell">Last Used</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredResources.map((resource, i) => (
                  <motion.tr
                    key={resource.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-[rgba(148,163,184,0.06)] table-row-hover"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-[#64748b] flex-shrink-0" />
                        <span className="text-[#e2e8f0] font-medium truncate max-w-[180px]">{resource.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#94a3b8] hidden sm:table-cell">
                      <span className="truncate block max-w-[140px]">{resource.instanceType}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${providerColors[resource.provider]}15`, color: providerColors[resource.provider] }}>
                        {resource.provider}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#94a3b8] hidden md:table-cell">{resource.region}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${resource.monthlyCost > 500 ? 'text-[#ef4444]' : resource.monthlyCost > 200 ? 'text-[#f59e0b]' : 'text-[#e2e8f0]'}`}>
                        ${resource.monthlyCost}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[resource.status].class}`}>
                        {statusConfig[resource.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#64748b] text-xs hidden lg:table-cell">{resource.lastUsed}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {resource.status !== 'active' && (
                          <>
                            <button
                              onClick={() => handleTerminate(resource)}
                              className="p-1.5 rounded-lg text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                              title="Terminate"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleResize(resource)}
                              className="p-1.5 rounded-lg text-[#f59e0b] hover:bg-[#f59e0b]/10 transition-all"
                              title="Resize"
                            >
                              <ArrowDownToLine className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <button className="p-1.5 rounded-lg text-[#64748b] hover:bg-[rgba(148,163,184,0.1)] hover:text-white transition-all" title="Details">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Server className="w-12 h-12 text-[#64748b] mx-auto mb-3" />
            <p className="text-[#94a3b8]">No resources found matching your criteria</p>
          </div>
        )}
      </motion.div>

      <p className="text-xs text-[#64748b] text-center">Showing {filteredResources.length} of {resourceList.length} resources</p>
    </div>
  );
}
```

---

## File: `src/app/dashboard/ai-advisor/page.tsx` {#file-src-app-dashboard-ai-advisor-page-tsx}

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Sparkles, Send, Zap, DollarSign, Leaf, Shield,
  CheckCircle, X, ChevronRight, MessageSquare, TrendingDown
} from 'lucide-react';
import { aiRecommendations, chatResponses, AIRecommendation } from '@/lib/mock-data';
import { useToast } from '@/components/toast-provider';

const categoryConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  cost: { color: '#f59e0b', icon: DollarSign, label: 'Cost' },
  performance: { color: '#6366f1', icon: Zap, label: 'Performance' },
  carbon: { color: '#22c55e', icon: Leaf, label: 'Carbon' },
  security: { color: '#ef4444', icon: Shield, label: 'Security' },
};

const priorityConfig: Record<string, { color: string; label: string }> = {
  high: { color: '#ef4444', label: 'High Priority' },
  medium: { color: '#f59e0b', label: 'Medium' },
  low: { color: '#64748b', label: 'Low' },
};

export default function AIAdvisorPage() {
  const [selectedRec, setSelectedRec] = useState<AIRecommendation | null>(null);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { showToast } = useToast();

  const activeRecs = aiRecommendations.filter(r => !dismissedIds.has(r.id));
  const totalSavings = activeRecs.reduce((sum, r) => sum + r.savings, 0);
  const totalCarbon = activeRecs.reduce((sum, r) => sum + r.carbonImpact, 0);

  const suggestedQuestions = [
    "Why is my AWS bill high?",
    "Which region is most eco-friendly?",
    "How can I reduce carbon emissions?",
    "Show me cost optimization tips",
  ];

  const handleApplyFix = (rec: AIRecommendation) => {
    setDismissedIds(prev => new Set(prev).add(rec.id));
    showToast(`Applied fix: ${rec.action} — saving $${rec.savings}/month`, 'success');
  };

  const handleDismiss = (rec: AIRecommendation) => {
    setDismissedIds(prev => new Set(prev).add(rec.id));
    showToast(`Dismissed recommendation`, 'info');
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', text }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = chatResponses[text] || 
        "I'll analyze that for you. Based on your current infrastructure:\n\n• You have 18 resources across AWS, GCP, and Azure\n• Total monthly spend: $12,450\n• Identified waste: $3,840 (31%)\n• Carbon footprint: 2.4 tonnes CO₂/month\n\nI recommend starting with the high-priority recommendations in the left panel to achieve the quickest wins.";
      setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Advisor</h1>
          <p className="text-sm text-[#64748b] mt-1">AI-powered recommendations to optimize cost and carbon</p>
        </div>
      </div>

      {/* Savings Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-static p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#00d4aa]/20 bg-gradient-to-r from-[#00d4aa]/5 to-transparent"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/15 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-[#00d4aa]" />
          </div>
          <div>
            <p className="text-sm text-[#94a3b8]">Total Potential Impact</p>
            <p className="text-xl font-bold text-white">
              <span className="text-[#00d4aa]">${totalSavings.toLocaleString()}/month</span>
              <span className="text-[#94a3b8] mx-2">|</span>
              <span className="text-[#22c55e]">{totalCarbon.toFixed(1)} tonnes CO₂</span>
            </p>
          </div>
        </div>
        <div className="text-sm text-[#94a3b8]">
          {activeRecs.length} recommendations · {activeRecs.filter(r => r.priority === 'high').length} high priority
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recommendations List */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-sm font-medium text-[#94a3b8] uppercase tracking-wider">Recommendations</h3>
          <AnimatePresence>
            {activeRecs.map((rec, i) => {
              const cat = categoryConfig[rec.category];
              const pri = priorityConfig[rec.priority];
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`glass-card p-5 cursor-pointer ${selectedRec?.id === rec.id ? 'border-[#00d4aa]/30 glow-accent' : ''}`}
                  onClick={() => setSelectedRec(rec)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${cat.color}15` }}>
                      <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${pri.color}15`, color: pri.color }}>
                          {pri.label}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                          {cat.label}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">{rec.issue}</h4>
                      <p className="text-xs text-[#64748b] line-clamp-2">{rec.description}</p>

                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-[#00d4aa]" />
                          <span className="text-xs text-[#00d4aa] font-semibold">${rec.savings}/mo</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Leaf className="w-3.5 h-3.5 text-[#22c55e]" />
                          <span className="text-xs text-[#22c55e] font-semibold">-{rec.carbonImpact}t CO₂</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                          <span className="text-xs text-[#f59e0b] font-semibold">{rec.confidence}% confident</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); handleApplyFix(rec); }}
                          className="px-4 py-1.5 rounded-lg bg-[#00d4aa]/15 text-[#00d4aa] text-xs font-semibold hover:bg-[#00d4aa]/25 transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Apply Fix
                        </motion.button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDismiss(rec); }}
                          className="px-4 py-1.5 rounded-lg bg-[rgba(148,163,184,0.06)] text-[#94a3b8] text-xs font-medium hover:bg-[rgba(148,163,184,0.1)] transition-colors flex items-center gap-1.5"
                        >
                          <X className="w-3.5 h-3.5" /> Dismiss
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  <AnimatePresence>
                    {selectedRec?.id === rec.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-[rgba(148,163,184,0.1)]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-[#64748b] mb-1">Recommended Action</p>
                              <p className="text-sm text-[#e2e8f0]">{rec.action}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#64748b] mb-1">Affected Resources</p>
                              <div className="flex flex-wrap gap-1">
                                {rec.affectedResources.map(r => (
                                  <span key={r} className="px-2 py-0.5 rounded text-xs bg-[rgba(148,163,184,0.08)] text-[#94a3b8]">{r}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {activeRecs.length === 0 && (
            <div className="glass-card-static p-12 text-center">
              <CheckCircle className="w-12 h-12 text-[#00d4aa] mx-auto mb-3" />
              <p className="text-lg font-semibold text-white">All optimized!</p>
              <p className="text-sm text-[#64748b]">All recommendations have been applied or dismissed.</p>
            </div>
          )}
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-2">
          <div className="glass-card-static flex flex-col sticky top-20" style={{ height: 'calc(100vh - 220px)', minHeight: '500px' }}>
            <div className="p-4 border-b border-[rgba(148,163,184,0.1)] flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#00d4aa]" />
              <h3 className="text-sm font-semibold text-white">Ask AI</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#00d4aa]/10 text-[#00d4aa]">Beta</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="w-10 h-10 text-[#64748b] mx-auto mb-3" />
                  <p className="text-sm text-[#94a3b8] mb-4">Ask me anything about your cloud infrastructure</p>
                  <div className="space-y-2">
                    {suggestedQuestions.map(q => (
                      <button
                        key={q}
                        onClick={() => handleSendMessage(q)}
                        className="w-full text-left p-3 rounded-xl bg-[rgba(148,163,184,0.04)] hover:bg-[rgba(148,163,184,0.08)] border border-[rgba(148,163,184,0.08)] hover:border-[rgba(148,163,184,0.15)] text-sm text-[#94a3b8] hover:text-white transition-all flex items-center gap-2 group"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-[#00d4aa] opacity-0 group-hover:opacity-100 transition-opacity" />
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={msg.role === 'user' ? 'flex justify-end' : ''}
                >
                  <div className={`max-w-[95%] p-3.5 ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                    <p className="text-sm text-[#e2e8f0] whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="chat-bubble-ai p-3.5 inline-block"
                >
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-[#00d4aa] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#00d4aa] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#00d4aa] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t border-[rgba(148,163,184,0.1)]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage(chatInput)}
                  placeholder="Ask about your cloud infrastructure..."
                  className="flex-1 bg-[rgba(148,163,184,0.06)] rounded-xl px-4 py-2.5 text-sm text-[#e2e8f0] placeholder-[#64748b] outline-none border border-transparent focus:border-[#00d4aa]/30 transition-colors"
                />
                <button
                  onClick={() => handleSendMessage(chatInput)}
                  className="w-10 h-10 rounded-xl bg-[#00d4aa]/15 hover:bg-[#00d4aa]/25 flex items-center justify-center transition-colors"
                  disabled={!chatInput.trim()}
                >
                  <Send className="w-4 h-4 text-[#00d4aa]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## File: `src/app/dashboard/carbon/page.tsx` {#file-src-app-dashboard-carbon-page-tsx}

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Globe2, TreePine, Plane, MapPin, ArrowRight, TrendingDown, AlertTriangle, CheckCircle, Leaf
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { carbonRegions, carbonMonthlyData } from '@/lib/mock-data';
import { useCountUp } from '@/lib/hooks';

function AnimatedStat({ value, suffix, decimals = 1 }: { value: number; suffix: string; decimals?: number }) {
  const { count, ref } = useCountUp(value, 2000, decimals);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function CarbonPage() {
  const [chartsLoaded, setChartsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setChartsLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  const levelIcons: Record<string, React.ReactNode> = {
    'VERY LOW': <CheckCircle className="w-4 h-4 text-[#00d4aa]" />,
    'LOW': <CheckCircle className="w-4 h-4 text-[#22c55e]" />,
    'MEDIUM': <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />,
    'HIGH': <AlertTriangle className="w-4 h-4 text-[#ef4444]" />,
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Carbon Tracker</h1>
          <p className="text-sm text-[#64748b] mt-1">Monitor and reduce your cloud carbon footprint</p>
        </div>
        <div className="glass-card-static px-4 py-2 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#00d4aa]" />
          <span className="text-sm text-[#94a3b8]">ESG Compliance:</span>
          <span className="text-sm text-[#00d4aa] font-semibold">Ready</span>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 text-center"
        >
          <Globe2 className="w-8 h-8 text-[#6366f1] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white"><AnimatedStat value={2.4} suffix=" t" /></p>
          <p className="text-sm text-[#94a3b8] mt-1">CO₂ this month</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 text-center"
        >
          <TrendingDown className="w-8 h-8 text-[#00d4aa] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white"><AnimatedStat value={3.2} suffix=" t" /></p>
          <p className="text-sm text-[#94a3b8] mt-1">Reducible emissions</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 text-center"
        >
          <TreePine className="w-8 h-8 text-[#22c55e] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white"><AnimatedStat value={0.8} suffix=" t" /></p>
          <p className="text-sm text-[#94a3b8] mt-1">Already offset</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emissions Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card-static p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-1">Monthly Emissions</h3>
          <p className="text-xs text-[#64748b] mb-6">CO₂ emissions vs offsets (tonnes)</p>
          {chartsLoaded ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={carbonMonthlyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `${v}t`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glass-card-static p-3 text-xs">
                          <p className="text-[#94a3b8] mb-1">{label}</p>
                          <p className="text-[#ef4444]">Emissions: {payload[0].value}t CO₂</p>
                          <p className="text-[#00d4aa]">Offset: {payload[1].value}t CO₂</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="emissions" radius={[6, 6, 0, 0]}>
                  {carbonMonthlyData.map((_, i) => (
                    <Cell key={i} fill={i === carbonMonthlyData.length - 1 ? '#6366f1' : '#ef444480'} />
                  ))}
                </Bar>
                <Bar dataKey="offset" fill="#00d4aa" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] skeleton" />
          )}
        </motion.div>

        {/* Region Map / Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card-static p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-1">Data Center Regions</h3>
          <p className="text-xs text-[#64748b] mb-4">Carbon intensity by region (g CO₂/kWh)</p>
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {carbonRegions.map((region, i) => (
              <motion.div
                key={`${region.provider}-${region.region}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(15,23,42,0.3)] hover:bg-[rgba(15,23,42,0.5)] transition-all group"
              >
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: region.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white truncate">{region.region}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: `${region.color}15`, color: region.color }}>
                      {region.provider}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b]">{region.location}</p>
                </div>
                <div className="text-right flex items-center gap-2 flex-shrink-0">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: region.color }}>{region.intensity}g</p>
                    <div className="flex items-center gap-1">
                      {levelIcons[region.level]}
                      <p className="text-xs" style={{ color: region.color }}>{region.level}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Migration Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass-card p-6 border-l-4 border-l-[#00d4aa]"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#00d4aa]" />
              </div>
              <h3 className="text-lg font-semibold text-white">Migration Recommendation</h3>
            </div>
            <p className="text-sm text-[#94a3b8] mb-4">
              Moving non-latency-critical workloads from <span className="text-[#ef4444] font-medium">us-east-1 (Virginia)</span> to{' '}
              <span className="text-[#00d4aa] font-medium">us-west-2 (Oregon)</span> would reduce your carbon intensity by{' '}
              <span className="text-white font-semibold">71%</span>.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <p className="text-[#64748b]">Annual CO₂ Savings</p>
                <p className="text-xl font-bold text-[#00d4aa]">2.1 tonnes</p>
              </div>
              <div>
                <p className="text-[#64748b]">Cost Impact</p>
                <p className="text-xl font-bold text-white">-$85/mo</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button className="btn-primary text-sm px-6 py-2.5">Apply Migration</button>
            <button className="btn-secondary text-sm px-6 py-2.5">View Details</button>
          </div>
        </div>
      </motion.div>

      {/* Carbon Offset Equivalents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">If you optimize, your savings equal...</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: TreePine, value: '45', label: 'Trees Planted', desc: 'Equivalent CO₂ absorption in 1 year', color: '#22c55e' },
            { icon: Plane, value: '3', label: 'Flights Saved', desc: 'Mumbai → Delhi round trips', color: '#f59e0b' },
            { icon: Globe2, value: '12,400', label: 'km Driving Saved', desc: 'Average car CO₂ emissions', color: '#6366f1' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                <item.icon className="w-7 h-7" style={{ color: item.color }} />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{item.value}</p>
              <p className="text-sm font-medium text-[#e2e8f0]">{item.label}</p>
              <p className="text-xs text-[#64748b] mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
```

---

## File: `src/app/dashboard/reports/page.tsx` {#file-src-app-dashboard-reports-page-tsx}

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Share2, Calendar, TrendingDown, TrendingUp, Leaf, DollarSign
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Area, AreaChart
} from 'recharts';
import { reportData } from '@/lib/mock-data';
import { useToast } from '@/components/toast-provider';

export default function ReportsPage() {
  const { showToast } = useToast();
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'6m' | '12m'>('12m');

  useEffect(() => {
    const t = setTimeout(() => setChartsLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  const data = selectedPeriod === '6m' ? reportData.monthly.slice(-6) : reportData.monthly;

  const totalSpent = data.reduce((sum, d) => sum + d.totalCost, 0);
  const totalWaste = data.reduce((sum, d) => sum + d.waste, 0);
  const totalSavings = data.reduce((sum, d) => sum + d.savings, 0);
  const totalCarbon = data.reduce((sum, d) => sum + d.carbon, 0);

  const handleDownload = (reportName: string) => {
    showToast(`Downloading ${reportName}...`, 'success');
  };

  const handleShare = () => {
    showToast('Share link copied to clipboard', 'success');
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-[#64748b] mt-1">Cost analysis, carbon footprint, and optimization reports</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-[rgba(148,163,184,0.06)] rounded-xl p-1">
            {(['6m', '12m'] as const).map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedPeriod === p
                    ? 'bg-[#00d4aa]/15 text-[#00d4aa]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {p === '6m' ? '6 Months' : '12 Months'}
              </button>
            ))}
          </div>
          <button onClick={handleShare} className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Spend', value: `$${(totalSpent / 1000).toFixed(1)}K`, icon: DollarSign, color: '#6366f1', trend: '+12%' },
          { label: 'Total Waste', value: `$${(totalWaste / 1000).toFixed(1)}K`, icon: TrendingUp, color: '#ef4444', trend: '+18%' },
          { label: 'Savings Achieved', value: `$${(totalSavings / 1000).toFixed(1)}K`, icon: TrendingDown, color: '#00d4aa', trend: '+340%' },
          { label: 'Carbon Footprint', value: `${totalCarbon.toFixed(1)}t`, icon: Leaf, color: '#22c55e', trend: '-8%' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              <span className={`text-xs font-medium ${stat.trend.startsWith('+') && stat.color === '#ef4444' ? 'text-[#ef4444]' : 'text-[#00d4aa]'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-[#64748b] mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Year-over-Year Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card-static p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Cost vs Savings Trend</h3>
            <p className="text-xs text-[#64748b] mt-1">Monthly comparison of total cost, waste, and savings achieved</p>
          </div>
        </div>
        {chartsLoaded ? (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#00d4aa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-card-static p-3 text-xs">
                        <p className="text-[#94a3b8] mb-2 font-medium">{label}</p>
                        {payload.map((entry, i) => (
                          <p key={i} style={{ color: entry.color as string }} className="font-medium">
                            {entry.name}: ${(entry.value as number).toLocaleString()}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
                iconType="circle"
                iconSize={8}
              />
              <Area type="monotone" dataKey="totalCost" name="Total Cost" stroke="#6366f1" fill="url(#costGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="waste" name="Waste" stroke="#ef4444" fill="url(#wasteGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="savings" name="Savings" stroke="#00d4aa" fill="url(#savingsGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[320px] skeleton" />
        )}
      </motion.div>

      {/* Carbon Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card-static p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Carbon Emissions Trend</h3>
            <p className="text-xs text-[#64748b] mt-1">Monthly CO₂ emissions in tonnes</p>
          </div>
        </div>
        {chartsLoaded ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}t`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-card-static p-3 text-xs">
                        <p className="text-[#94a3b8] mb-1">{label}</p>
                        <p className="text-[#22c55e]">{payload[0].value}t CO₂</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="carbon" fill="#22c55e" radius={[6, 6, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] skeleton" />
        )}
      </motion.div>

      {/* Downloadable Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Monthly Cost Report', desc: 'Detailed breakdown of cloud spend for October 2026', date: 'Oct 1 – Oct 7, 2026', type: 'PDF', icon: DollarSign, color: '#6366f1' },
            { title: 'Carbon Footprint Report', desc: 'ESG-compliant sustainability report with offset tracking', date: 'Q3 2026', type: 'PDF', icon: Leaf, color: '#22c55e' },
            { title: 'Optimization Summary', desc: 'Applied recommendations and savings achieved', date: 'Last 30 days', type: 'CSV', icon: TrendingDown, color: '#00d4aa' },
            { title: 'Resource Audit Report', desc: 'Complete inventory of cloud resources and utilization', date: 'Oct 7, 2026', type: 'PDF', icon: FileText, color: '#f59e0b' },
            { title: 'Cost Anomaly Report', desc: 'Unusual spending patterns and cost spikes detected', date: 'Sep 2026', type: 'PDF', icon: TrendingUp, color: '#ef4444' },
            { title: 'Team Activity Report', desc: 'Actions taken by team members on recommendations', date: 'Last 30 days', type: 'CSV', icon: Calendar, color: '#8b5cf6' },
          ].map((report, i) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
              className="glass-card p-5 group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${report.color}15` }}>
                  <report.icon className="w-5 h-5" style={{ color: report.color }} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#00d4aa] transition-colors">{report.title}</h4>
                  <p className="text-xs text-[#64748b] mt-0.5">{report.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#64748b]">
                  <Calendar className="w-3 h-3" />
                  {report.date}
                </div>
                <button
                  onClick={() => handleDownload(report.title)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(148,163,184,0.06)] hover:bg-[#00d4aa]/10 text-[#94a3b8] hover:text-[#00d4aa] text-xs font-medium transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  {report.type}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
```

---

## File: `src/app/dashboard/settings/page.tsx` {#file-src-app-dashboard-settings-page-tsx}

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud, Bell, Users, Shield, Hash, Mail, MessageSquare,
  Check, Plus, Trash2, ChevronRight, Settings as SettingsIcon
} from 'lucide-react';
import { teamMembers } from '@/lib/mock-data';
import { useToast } from '@/components/toast-provider';

export default function SettingsPage() {
  const { showToast } = useToast();

  const [providers, setProviders] = useState([
    { name: 'AWS', icon: '🟠', connected: true, accountId: '****-****-1234', regions: 4 },
    { name: 'Google Cloud', icon: '🔵', connected: true, accountId: 'greencloud-prod', regions: 3 },
    { name: 'Azure', icon: '🟦', connected: false, accountId: '', regions: 0 },
  ]);

  const [notifications, setNotifications] = useState({
    slack: true,
    email: true,
    teams: false,
  });

  const [thresholds, setThresholds] = useState({
    wasteThreshold: 500,
    carbonThreshold: 3,
    costSpike: 20,
  });

  const handleConnect = (name: string) => {
    setProviders(prev => prev.map(p =>
      p.name === name ? { ...p, connected: !p.connected, accountId: p.connected ? '' : '****-****-5678', regions: p.connected ? 0 : 2 } : p
    ));
    showToast(`${name} ${providers.find(p => p.name === name)?.connected ? 'disconnected' : 'connected'} successfully`, 'success');
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${notifications[key] ? 'disabled' : 'enabled'}`, 'info');
  };

  const handleSaveThresholds = () => {
    showToast('Alert thresholds saved successfully', 'success');
  };

  return (
    <div className="space-y-8 max-w-[900px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-[#64748b] mt-1">Manage your cloud connections, notifications, and team</p>
      </div>

      {/* Cloud Providers */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5 text-[#00d4aa]" />
          <h2 className="text-lg font-semibold text-white">Cloud Providers</h2>
        </div>
        <div className="space-y-3">
          {providers.map((provider, i) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{provider.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{provider.name}</h3>
                  {provider.connected ? (
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[#64748b]">Account: {provider.accountId}</span>
                      <span className="text-xs text-[#64748b]">·</span>
                      <span className="text-xs text-[#64748b]">{provider.regions} regions</span>
                    </div>
                  ) : (
                    <p className="text-xs text-[#64748b] mt-1">Not connected</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {provider.connected && (
                  <span className="flex items-center gap-1.5 text-xs text-[#00d4aa]">
                    <Check className="w-3.5 h-3.5" /> Connected
                  </span>
                )}
                <button
                  onClick={() => handleConnect(provider.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    provider.connected
                      ? 'bg-[rgba(148,163,184,0.06)] text-[#94a3b8] hover:bg-[#ef4444]/10 hover:text-[#ef4444]'
                      : 'bg-[#00d4aa]/15 text-[#00d4aa] hover:bg-[#00d4aa]/25'
                  }`}
                >
                  {provider.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Notifications */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-[#f59e0b]" />
          <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
        </div>
        <div className="glass-card-static p-5 space-y-4">
          {[
            { key: 'slack' as const, label: 'Slack', desc: 'Get alerts in your Slack workspace', icon: Hash },
            { key: 'email' as const, label: 'Email', desc: 'Receive email notifications', icon: Mail },
            { key: 'teams' as const, label: 'Microsoft Teams', desc: 'Post alerts to Teams channels', icon: MessageSquare },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[rgba(148,163,184,0.06)] flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#94a3b8]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-[#64748b]">{item.desc}</p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationToggle(item.key)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                  notifications[item.key] ? 'bg-[#00d4aa]' : 'bg-[rgba(148,163,184,0.2)]'
                }`}
              >
                <motion.div
                  animate={{ x: notifications[item.key] ? 20 : 2 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-md"
                />
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Alert Thresholds */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-[#ef4444]" />
          <h2 className="text-lg font-semibold text-white">Alert Thresholds</h2>
        </div>
        <div className="glass-card-static p-5 space-y-5">
          {[
            { label: 'Waste Alert Threshold', desc: 'Alert when monthly waste exceeds', key: 'wasteThreshold' as const, prefix: '$', suffix: '/month' },
            { label: 'Carbon Alert Threshold', desc: 'Alert when monthly CO₂ exceeds', key: 'carbonThreshold' as const, prefix: '', suffix: ' tonnes' },
            { label: 'Cost Spike Alert', desc: 'Alert when daily cost increases by', key: 'costSpike' as const, prefix: '', suffix: '%' },
          ].map(item => (
            <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-[#64748b]">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#64748b]">{item.prefix}</span>
                <input
                  type="number"
                  value={thresholds[item.key]}
                  onChange={e => setThresholds(prev => ({ ...prev, [item.key]: Number(e.target.value) }))}
                  className="w-24 bg-[rgba(148,163,184,0.06)] border border-[rgba(148,163,184,0.1)] rounded-lg px-3 py-2 text-sm text-white text-center outline-none focus:border-[#00d4aa]/30 transition-colors"
                />
                <span className="text-sm text-[#64748b]">{item.suffix}</span>
              </div>
            </div>
          ))}
          <button onClick={handleSaveThresholds} className="btn-primary text-sm px-6 py-2.5">
            Save Thresholds
          </button>
        </div>
      </motion.section>

      {/* Team Members */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-white">Team Members</h2>
          </div>
          <button
            onClick={() => showToast('Invitation sent! Team member will receive an email.', 'success')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00d4aa]/15 text-[#00d4aa] text-xs font-medium hover:bg-[#00d4aa]/25 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Invite
          </button>
        </div>
        <div className="glass-card-static overflow-hidden">
          {teamMembers.map((member, i) => (
            <div key={member.email} className="flex items-center justify-between p-4 border-b border-[rgba(148,163,184,0.06)] last:border-0 table-row-hover">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-xs font-bold text-white">
                  {member.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{member.name}</p>
                  <p className="text-xs text-[#64748b]">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  member.role === 'Admin' ? 'bg-[#6366f1]/15 text-[#6366f1]' :
                  member.role === 'Editor' ? 'bg-[#00d4aa]/15 text-[#00d4aa]' :
                  'bg-[rgba(148,163,184,0.1)] text-[#94a3b8]'
                }`}>
                  {member.role}
                </span>
                {member.role !== 'Admin' && (
                  <button
                    onClick={() => showToast(`Removed ${member.name} from team`, 'warning')}
                    className="p-1.5 rounded-lg text-[#64748b] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
```

---

