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