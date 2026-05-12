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
    temps: string;
} //Type pour les json des séquence de méthodes

export interface ListParametersProps{
    nomParam: string;
    getter: string | number;
    setter: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<number>>;
} //Type pour ListeParametres dans ParameterPage


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

//============================================================
// Types utilisés dans la page OntologyPage
//============================================================

export interface OntologyProps{
    name: string;
    children: OntologyProps[]
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
    { emoji: "🚶", emojiName: "marcher", emojiColor: "#ff2828" },
    { emoji: "🚌", emojiName: "bus", emojiColor: "#fe00e9" },
    { emoji: "🚴", emojiName: "vélo", emojiColor: "#ff4281" },
    {emoji: "🚗", emojiName: "voiture", emojiColor:"#ee670d"},
    { emoji: "💼", emojiName: "travail", emojiColor: "#a36f0e" },
    { emoji: "❓", emojiName: "missing", emojiColor: "#ddce48" },
    { emoji: "🏠", emojiName: "maison", emojiColor: "#6eff42" },
    { emoji: "🍽️", emojiName: "restaurant", emojiColor: "#00C49F" },
    { emoji: "⚽", emojiName: "sport", emojiColor: "#0d7494" },
    { emoji: "🛍️", emojiName: "shopping", emojiColor: "#2f1cdf" },
    { emoji: "📚", emojiName: "étude", emojiColor: "#9e28ff" }
]