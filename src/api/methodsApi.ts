import apiClient from "./client";
import type { Method } from "./types";

export async function getMethods(): Promise<Method[]> {
  const { data } = await apiClient.get<{ methods: Method[] }>("/api/methods/");
  return data.methods;
}
