/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import type { AppContextType } from '../types';

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  return (
    <AppContext.Provider value={{ currentStep, setCurrentStep, uploadedFiles, setUploadedFiles }}>
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