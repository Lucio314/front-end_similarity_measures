// ── Navigation ────────────────────────────────────────────────────────────────

export interface Step {
  id: number;
  label: string;
}

export const STEPS: Step[] = [
  { id: 1, label: 'Data' },
  { id: 2, label: 'Statistics' },
  { id: 3, label: 'Ontology' },
  { id: 4, label: 'Temporal Gaps' },
  { id: 5, label: 'Method' },
  { id: 6, label: 'Parameters' },
  { id: 7, label: 'Results' },
];

// ── App context ───────────────────────────────────────────────────────────────

export interface AppContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  datasetId: string | null;
  setDatasetId: (id: string | null) => void;
}

// ── Ontology ──────────────────────────────────────────────────────────────────

export interface OntologyProps {
  name: string;
  children: OntologyProps[];
}

export const ONTOLOGY_COLORS: string[] = [
  '#4f46e5',
  '#7c3aed',
  '#0891b2',
  '#059669',
];

// Build a flat color map from ontology: name -> hsl color
// Each subtree rooted at a level-1 node gets its own hue, children get lighter shades
export function buildOntologyColorMap(
  root: OntologyProps
): Record<string, string> {
  const map: Record<string, string> = {};
  const topLevelHues = [220, 270, 180, 140, 30, 0, 310, 60];

  (root.children ?? []).forEach((child, idx) => {
    const hue = topLevelHues[idx % topLevelHues.length];
    assignColors(child, hue, 40, 60, map);
  });

  return map;
}

function assignColors(
  node: OntologyProps,
  hue: number,
  saturation: number,
  lightness: number,
  map: Record<string, string>
): void {
  map[node.name] = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const children = node.children ?? [];
  const step = (90 - lightness) / Math.max(children.length, 1);
  children.forEach((child, i) => {
    assignColors(child, hue, saturation + 10, lightness + step * (i + 1), map);
  });
}

// DFS traversal returning leaf names in order
export function dfsLeaves(node: OntologyProps): string[] {
  if (!node.children || node.children.length === 0) return [node.name];
  return node.children.flatMap(dfsLeaves);
}

// ── Pattern (PatternPage) ─────────────────────────────────────────────────────

export interface PatternActivitiesProps {
  id: string;
  name: string;
  emoji: string;
  duration: number;
}

export interface EmojisProps {
  emoji: string;
  emojiName: string;
  emojiColor?: string;
}

// EMOJIS was a hardcoded constant. Activities now come from the backend.
// Kept as empty array so legacy imports still compile.
export const EMOJIS: EmojisProps[] = [];

// Activity labels use the first letter of the activity name as fallback (see PatternRepr, SeqRepr, etc.)
export const ACTIVITY_EMOJI_MAP: Record<string, string> = {};

// ── Methods ───────────────────────────────────────────────────────────────────

export interface MethodProps {
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

// ── Parameters ────────────────────────────────────────────────────────────────

export interface ListParametersProps {
  nomParam: string;
  getter: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
}

export interface ParamsProps {
  param: string;
  nomClasse: string;
  paramTitre: string;
  paramValue: string[];
  paramValueMax: number;
  paramValueMin: number;
  paramValuePas: number;
  paramLegend: string[];
  paramInfo: string;
}

export interface SearchConfig {
  params: Record<string, number | string>;
  top_k: number;
  threshold: number;
}

// ── Statistics sub-components (binome) ───────────────────────────────────────

export interface DataStatsProps {
  name: string;
  value: number;
}

export interface DatasetInfoProps {
  global: {
    num_sequences: number;
    num_activities: number;
    avg_length: number;
  };
  duration: {
    min: number;
    avg: number;
    max: number;
  };
  activities: {
    distribution: DataStatsProps[];
  };
  missing: {
    total_gaps: number;
    sequences_with_gaps: number;
    percentage_sequences_with_gaps: number;
    avg_gaps_per_sequence: number;
    percentage_missing_activities: number;
  };
}

export interface DatasetSequenceActivityProps {
  name: string;
  duration: number;
}

export interface DatasetSequenceItemProps {
  id: number;
  label: string;
  length: number;
  total_duration: number;
  activities: DatasetSequenceActivityProps[];
}

// Alias kept for backward compat with SeqStats
export type DatasetSequenceProps = DatasetSequenceItemProps;

export interface DatasetProps {
  dataset_id: string;
  count: number;
  limit: number;
  offset: number;
  sequence: DatasetSequenceItemProps[];
}

// ── Results ───────────────────────────────────────────────────────────────────

export interface ResultsActivitiesProps {
  name: string;
  duration: number;
}

export interface ResultsPatternProps {
  label: string;
  length: number;
  total_durations: number;
  activities: ResultsActivitiesProps[];
}

export interface ResultsSummaryProps {
  total_results: number;
  best_score: number;
  avg_duration: number;
}

export interface ResultsOneResultProps {
  rank: number;
  score: number;
  sequence: {
    id: string;
    label: string;
    length: number;
    total_durations: number;
    activities: ResultsActivitiesProps[];
  };
}

export interface ResultsProps {
  pattern: ResultsPatternProps;
  summary: ResultsSummaryProps;
  meta: {
    dataset_id: string;
    method: string;
    top_k: number;
    count: number;
  };
  results: ResultsOneResultProps[];
}
