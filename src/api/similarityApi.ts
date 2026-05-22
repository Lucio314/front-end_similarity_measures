import apiClient from "./client";
import type { SimilarityRequest, SimilarityResponse } from "./types";

export async function computeSimilarity(request: SimilarityRequest): Promise<SimilarityResponse> {
  const { data } = await apiClient.post<SimilarityResponse>("/api/similarity", request);
  return data;
}
