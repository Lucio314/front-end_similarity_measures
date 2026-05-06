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

export interface DataStatsProps{
    name : string;
    value : number;
} //Type pour data dans l'ensemble de la page StatsPage

interface DatasetInfoGlobalProps{
    num_sequences: number;
    num_activities: number;
    avg_length: number;
}

interface DatasetInfoDurationProps{
    min: number;
    avg: number;
    max: number;
}

interface DatasetInfoActivitiesProps{
    distribution: Array<DataStatsProps>;
}

interface DatasetInfoMissingProps{
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