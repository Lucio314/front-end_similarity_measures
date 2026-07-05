import apiClient from "./client";
import type { Dataset, DatasetStats, Sequence, WuPalmerMatrix } from "./types";

export async function getDatasets(): Promise<Dataset[]> {
  const { data } = await apiClient.get<{ datasets: Dataset[] }>("/api/datasets");
  return data.datasets;
}

export async function uploadDataset(file: File): Promise<{ dataset_id: string; name: string; size: number }> {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await apiClient.post("/api/datasets/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (err: unknown) {
    // Extraire le message détaillé renvoyé par FastAPI (champ "detail")
    const detail =
      (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
    throw new Error(detail ?? "Erreur lors de l'upload du dataset.");
  }
}

export async function loadDefaultDataset(): Promise<{ message: string }> {
  const { data } = await apiClient.post("/api/datasets/load-default");
  return data;
}

export async function getDatasetStats(datasetId: string): Promise<DatasetStats> {
  const { data } = await apiClient.get<DatasetStats>(`/api/datasets/${datasetId}/stats`);
  return data;
}

export async function getSequences(
  datasetId: string,
  limit = 50,
  offset = 0
): Promise<{ sequences: Sequence[]; count: number }> {
  const { data } = await apiClient.get(`/api/datasets/${datasetId}/sequences`, {
    params: { limit, offset },
  });
  return data;
}

export async function getWuPalmerMatrix(datasetId: string): Promise<WuPalmerMatrix> {
  const { data } = await apiClient.get<WuPalmerMatrix>(`/api/datasets/${datasetId}/wupalmer-matrix`);
  return data;
}
