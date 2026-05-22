import apiClient from "./client";
import type { OntologyNode } from "./types";

export async function getOntology(): Promise<OntologyNode> {
  const { data } = await apiClient.get<OntologyNode>("/api/ontology");
  return data;
}
