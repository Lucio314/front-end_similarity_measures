import axios from "axios";

/**
 * Instance axios partagée pour toutes les requêtes vers le backend FastAPI.
 * Définir VITE_API_URL dans un fichier .env.local pour changer l'URL.
 * Par défaut : http://localhost:8000 (uvicorn en dev)
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
