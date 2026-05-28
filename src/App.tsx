/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/layout/Header';
import Stepper from './components/layout/Stepper';
import DataPage from './pages/DataPage';
import StatsPage from './pages/StatsPage';
import MissingsPage from './pages/MissingsPage';
import PatternPage from './pages/PatternPage';
import MethodPage from './pages/MethodPage';
import ParameterPage from './pages/ParameterPage';
import ResultsPage from './pages/ResultsPage';
import OntologyPage from './pages/OntologyPage';

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div className="app-bg">
      <div className="container py-4" style={{ maxWidth: 1100 }}>

        <Header />

        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 12 }}>
          <div className="card-body px-4 py-3">
            <Stepper currentStep={currentStep} />
          </div>
        </div>
          <DataPage onNext={() => setCurrentStep(2)} />
          <StatsPage onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)}/>
          <OntologyPage onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)}/>
          <MissingsPage onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)}/>
          <PatternPage onNext={() => setCurrentStep(6)} onBack={() => setCurrentStep(4)}/>
          <MethodPage onNext={() => setCurrentStep(7)} onBack={() => setCurrentStep(5)}/>
          <ParameterPage onNext={() => setCurrentStep(8)} onBack={() => setCurrentStep(6)}/>
          <ResultsPage onBackParameter={() => setCurrentStep(7)} onBackPattern={() => setCurrentStep(5)}/>
          {
            /* 
              Faire le css des différentes pages et encore quelques modif mineures
            */
          }
      </div>
    </div>
  );
}

export default App;