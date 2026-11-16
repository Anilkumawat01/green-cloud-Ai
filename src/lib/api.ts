/**
 * GreenCloud AI - Serverless API Client
 * Seamlessly connects the Next.js frontend to the AWS Serverless Backend (API Gateway + Lambda + DynamoDB).
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface OptimizationResponse {
  success: boolean;
  logId: string;
  persistedToDynamoDB: boolean;
  summary: {
    totalResources: number;
    totalMonthlyCost: number;
    potentialCostSavings: number;
    totalCarbonEmissionsKg: number;
    totalCarbonEmissionsTonnes: number;
    potentialCarbonSavingsKg: number;
    potentialCarbonSavingsTonnes: number;
    carbonReductionPct: number;
    greenestRegionRecommended: string;
    recommendationsCount: number;
  };
  recommendations: Array<{
    id: string;
    resource: string;
    type: string;
    priority: string;
    action: string;
    monthlySavings: number;
    carbonSavingsKg: number;
    impact: string;
  }>;
  timestamp: string;
}

export async function runServerlessOptimization(resources?: any[]): Promise<OptimizationResponse | null> {
  if (!API_BASE_URL) {
    console.info('[GreenCloud AI] NEXT_PUBLIC_API_URL not configured, running locally.');
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resources }),
    });

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('[GreenCloud AI] Failed to call AWS Serverless backend:', error);
    return null;
  }
}

export async function fetchOptimizationLogs(): Promise<any[]> {
  if (!API_BASE_URL) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/logs`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();
    return data.logs || [];
  } catch (error) {
    console.error('[GreenCloud AI] Failed to fetch logs:', error);
    return [];
  }
}

export async function fetchCarbonRegions(): Promise<any | null> {
  if (!API_BASE_URL) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/regions`);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();
    return data.regions || null;
  } catch (error) {
    console.error('[GreenCloud AI] Failed to fetch carbon regions:', error);
    return null;
  }
}

export async function checkServerlessHealth(): Promise<boolean> {
  if (!API_BASE_URL) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

