import apiClient from "./client";
import type { OntologyNode } from "./types";

export async function getOntology(datasetId?: string | null): Promise<OntologyNode> {
  const params = datasetId ? { dataset_id: datasetId } : {};
  const { data } = await apiClient.get<OntologyNode>("/api/ontology", { params });
  return data;
}

export async function uploadOntology(
  file: File,
  datasetId: string
): Promise<{ message: string; ontology: OntologyNode }> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await apiClient.post(
    `/api/ontology/upload?dataset_id=${datasetId}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}
