// Types spécifiques à la couche API (réponses du backend FastAPI)

// ── Datasets ──────────────────────────────────────────────────────────────────

export interface Dataset {
  id: string;
  name: string;
  ontology: string;
  size: number;
}

export interface Activity {
  name: string;
  duration: number;
}

export interface Sequence {
  id: number;
  label: string;
  length: number;
  total_duration: number;
  activities: Activity[];
}

export interface DatasetStats {
  global: { num_sequences: number; num_activities: number; avg_length: number };
  duration: { min: number; avg: number; max: number };
  activities: { distribution: { name: string; value: number }[] };
  missing: {
    total_gaps: number;
    sequences_with_gaps: number;
    percentage_sequences_with_gaps: number;
    avg_gaps_per_sequence: number;
    percentage_missing_activities: number;
  };
}

export interface WuPalmerMatrix {
  dataset_id: string;
  labels: string[];
  matrix: number[][];
}

// ── Méthodes ──────────────────────────────────────────────────────────────────

export interface Method {
  name: string;
  label: string;
  description: string;
  principle: string;
  advantages: string[];
  limitations: string[];
  properties: {
    symmetry: boolean;
    normalized: boolean;
    metric: boolean;
    requires_ontology: boolean;
    supports_different_lengths: boolean;
  };
  params: string[];
  semantic_measure?: {
    name: string;
    description: string;
    formula: string;
    range: [number, number];
  };
}

// ── Similarité ────────────────────────────────────────────────────────────────

export interface SimilarityRequest {
  dataset_id: string;
  pattern: { individuals: string[]; durations: number[] };
  method: "RFTH" | "FTH" | "CED";
  params: Record<string, number | string>;
  top_k?: number;
  threshold?: number;
}

export interface SimilarityResult {
  rank: number;
  score: number;
  sequence: Sequence;
}

export interface SimilarityResponse {
  pattern: { label: string; length: number; total_duration: number; activities: Activity[] };
  summary: { total_results: number; best_score: number; avg_duration: number };
  meta: { dataset_id: string; method: string; top_k: number; count: number };
  results: SimilarityResult[];
}

// ── Ontologie ─────────────────────────────────────────────────────────────────

export interface OntologyNode {
  name: string;
  children?: OntologyNode[];
}

// ── Données manquantes ────────────────────────────────────────────────────────

export interface MissingStrategy {
  id: string;
  label: string;
  description: string;
  requires_value: boolean;
  advantages: string[];
  disadvantages: string[];
}

export interface ApplyStrategyResponse {
  new_dataset_id: string;
  strategy: string;
  num_sequences: number;
}
