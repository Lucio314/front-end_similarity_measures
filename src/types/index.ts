export interface Step {
  id: number;
  label: string;
}

export const STEPS: Step[] = [
  { id: 1, label: 'Données' },
  { id: 2, label: 'Statistiques' },
  { id: 3, label: 'Ontologie' },
  { id: 4, label: 'Trous' },
  { id: 5, label: 'Motif' },
  { id: 6, label: 'Méthode' },
  { id: 7, label: 'Paramètres' },
  { id: 8, label: 'Résultats' },
];

export interface AppContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export interface ActivitiesProps{
    actiId: string;
    icon: string;
    nomActi: string;
    temps: number;
} //Type pour les json des séquence de méthodes

//============================================================
// Types utilisés dans la page StatsPage
//============================================================

export interface DataStatsProps{
    name : string;
    value : number;
}

export interface DatasetInfoGlobalProps{
    num_sequences: number;
    num_activities: number;
    avg_length: number;
}

export interface DatasetInfoDurationProps{
    min: number;
    avg: number;
    max: number;
}

export interface DatasetInfoActivitiesProps{
    distribution: Array<DataStatsProps>;
}

export interface DatasetInfoMissingProps{
    total_gaps: number;
    sequences_with_gaps: number;
    percentage_sequences_with_gaps: number;
    avg_gaps_per_sequence: number;
    percentage_missing_activities: number;
}

export interface DatasetInfoProps{
    global: DatasetInfoGlobalProps;
    duration: DatasetInfoDurationProps;
    activities: DatasetInfoActivitiesProps;
    missing: DatasetInfoMissingProps;
}

export interface DatasetSequenceProps{
    id: number;
    label: string;
    length: number;
    total_duration: number;
    activities: Array<ResultsActivitiesProps>;
    avg_duration: number
}
export interface DatasetProps{
    dataset_id: string;
    count: number;
    limit: number;
    offset: number; 
    sequence: Array<DatasetSequenceProps>;
}

//============================================================
// Types utilisés dans la page OntologyPage
//============================================================

export interface OntologyProps{
    name: string;
    children: OntologyProps[]
}

export const ONTOLOGY_COLORS : Array<string> = ["#c226ff", "#5046e6", "#839ef8", "#62cdee"]

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
    symmetry: boolean;
    normalized: boolean;
    metric: boolean;
    requires_ontology: boolean;
    supports_different_lengths: boolean;
}

export interface MethodProps{
    name: string;
    label: string;
    description: string;
    principle: string;
    advantages: Array<string>;
    limitations: Array<string>;
    properties: MethodPropertiesProps;
    params: Array<string>;
    semantic_measure? : SemanticMeasureProps
}

//============================================================
// Types utilisés dans la page PatternPage
//============================================================

export interface PatternActivitiesProps{
    id: string;
    name: string;
    emoji: string;
    duration: number;
}

//============================================================
// Types utilisés dans la page ParameterPage
//============================================================

export interface ParamsProps{
    param: string;
    nomClasse: string;
    paramTitre: string;
    paramValue: Array<string>;
    paramValueMax: number;
    paramValueMin: number;
    paramValuePas: number;
    paramLegend: Array<string>;
    paramInfo: string;
}

export interface ListParametersProps{
    nomParam: string;
    getter: number;
    setter: React.Dispatch<React.SetStateAction<number>>;
} //Type pour ListeParametres dans ParameterPage

//============================================================
// Types utilisés dans la page ResultsPage
//============================================================


export interface ResultsActivitiesProps{
    name: string;
    duration: number;
}
export interface ResultsPatternProps{
    label: string;
    length: number;
    total_durations: number;
    activities: Array<ResultsActivitiesProps>;
}
export interface ResultsSummaryProps{
    total_results: number;
    best_score: number;
    avg_duration: number;
}

export interface ResutlsMetaProps{
    dataset_id: string;
    method: string;
    top_k: number;
    count: number;
}

export interface ResultsSequenceProps{
    id: string;
    label: string;
    length: number;
    total_durations: number;
    activities: Array<ResultsActivitiesProps>;
}

export interface ResultsOneResultProps{
    rank: number;
    score: number;
    sequence: ResultsSequenceProps
}

export interface ResultsProps{
    pattern: ResultsPatternProps;
    summary: ResultsSummaryProps;
    meta: ResutlsMetaProps;
    results: Array<ResultsOneResultProps>
}

export interface EmojisProps{
    emoji: string;
    emojiName: string;
    emojiColor: string;
}

export const EMOJIS : Array<EmojisProps> = [
    { emoji: "❓", emojiName: "missing", emojiColor: "#ff2828" },
    { emoji: "🚌", emojiName: "bus", emojiColor: "#fe00e9" },
    { emoji: "🚴", emojiName: "vélo", emojiColor: "#ff4281" },
    { emoji: "🚗", emojiName: "voiture", emojiColor:"#ee670d"},
    { emoji: "💼", emojiName: "travail", emojiColor: "#a36f0e" },
    { emoji: "🚶", emojiName: "marcher", emojiColor: "#ddce48" },
    { emoji: "🏠", emojiName: "maison", emojiColor: "#6eff42" },
    { emoji: "🍽️", emojiName: "restaurant", emojiColor: "#00C49F" },
    { emoji: "⚽", emojiName: "sport", emojiColor: "#0d7494" },
    { emoji: "🛍️", emojiName: "shopping", emojiColor: "#2f1cdf" },
    { emoji: "📚", emojiName: "étude", emojiColor: "#9e28ff" }
]