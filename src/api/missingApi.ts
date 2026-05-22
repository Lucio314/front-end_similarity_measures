import apiClient from "./client";
import type { MissingStrategy, ApplyStrategyResponse } from "./types";

export async function getMissingStrategies(): Promise<MissingStrategy[]> {
  const { data } = await apiClient.get<{ strategies: MissingStrategy[] }>("/api/missing-strategies");
  return data.strategies;
}

export async function applyMissingStrategy(
  datasetId: string,
  strategy: string,
  value?: string
): Promise<ApplyStrategyResponse> {
  const { data } = await apiClient.post<ApplyStrategyResponse>(
    `/api/datasets/${datasetId}/missing-strategy`,
    { strategy, value }
  );
  return data;
}
