// ── Navigation ────────────────────────────────────────────────────────────────

export interface Step {
  id: number;
  label: string;
}

export const STEPS: Step[] = [
<<<<<<< HEAD
  { id: 1, label: 'Datas' },
  { id: 2, label: 'Ontology' },
  { id: 3, label: 'Statistics' },
  { id: 4, label: 'Temporal Gaps' },
  { id: 5, label: 'Pattern' },
  { id: 6, label: 'Methods' },
=======
  { id: 1, label: 'Data' },
  { id: 2, label: 'Statistics' },
  { id: 3, label: 'Ontology' },
  { id: 4, label: 'Temporal Gaps' }, //Trou -> Temporal Gaps
  { id: 5, label: 'Pattern' },
  { id: 6, label: 'Method' },
>>>>>>> 6aa9fe3f32b22ce48e3d636566bcab17893dc74a
  { id: 7, label: 'Parameters' },
  { id: 8, label: 'Results' },
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

  root.children.forEach((child, idx) => {
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
  const step = (90 - lightness) / Math.max(node.children.length, 1);
  node.children.forEach((child, i) => {
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

<<<<<<< HEAD
export const DEPTH_COLORS = [
  { color: "#4f46e5", label: "Racine" },
  { color: "#7c3aed", label: "Niveau 1" },
  { color: "#0891b2", label: "Niveau 2" },
  { color: "#059669", label: "Feuilles (activités)" },
];

//============================================================
// Types utilisés dans la page MissingsPage
//============================================================

export interface StrategiesProps{
    idStrategie: string;
    strategie: string;
    descriptionStrategie: string;
    emoji: string;
    avantages: Array<string>;
    inconvenients: Array<string>
}

//============================================================
// Types utilisés dans la page MethodPage
//============================================================

export interface SemanticMeasureProps{
    name: string;
    description: string;
    formula: string;
    range: Array<number>
}

export interface MethodPropertiesProps{
=======
export interface MethodProps {
  name: string;
  label: string;
  description: string;
  principle: string;
  advantages: string[];
  limitations: string[];
  properties: {
>>>>>>> 6aa9fe3f32b22ce48e3d636566bcab17893dc74a
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
