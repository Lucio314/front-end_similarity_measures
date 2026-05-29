/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { AppContextType } from '../types';
// ici l'app context gère l'état global de l'application, comme les étapes du processus, les fichiers téléchargés et l'identifiant du dataset. 
// Il fournit également des fonctions pour mettre à jour ces états.
const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [datasetId, setDatasetId] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ currentStep, setCurrentStep, uploadedFiles, setUploadedFiles, datasetId, setDatasetId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext doit être utilisé dans un <AppProvider>');
  }
  return context;
}