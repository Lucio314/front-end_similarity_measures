// Point d'entrée unique — importer depuis "@/api" dans les composants
// Exemple : import { computeSimilarity, getMethods } from "@/api";

export { default as apiClient } from "./client";
export * from "./types";
export * from "./datasetsApi";
export * from "./similarityApi";
export * from "./methodsApi";
export * from "./ontologyApi";
export * from "./missingApi";
