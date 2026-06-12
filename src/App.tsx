import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/layout/Header';
import Stepper from './components/layout/Stepper';
import DataPage from './pages/DataPage';
import StatsPage from './pages/StatsPage';
import OntologiePage from './pages/OntologiePage';
import MissingsPage from './pages/MissingsPage';
import PatternPage from './pages/PatternPage';
import MethodPage from './pages/MethodPage';
import ParameterPage from './pages/ParameterPage';
import ResultsPage from './pages/ResultsPage';
import { useAppContext } from './context/AppContext';

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { datasetId } = useAppContext();

  const next = () => setCurrentStep(s => s + 1);
  const back = () => setCurrentStep(s => s - 1);
  const goTo = (step: number) => setCurrentStep(step);

  // Step 3 (Ontology) passes hasGaps so App can skip step 4 if no gaps
  const [hasGaps, setHasGaps] = useState<boolean>(true);

  const handleStatsNext = (gaps: boolean) => {
    setHasGaps(gaps);
    setCurrentStep(3);
  };

  const handleOntologyNext = () => {
    // Skip Temporal Gaps (step 4) if dataset has no gaps
    setCurrentStep(hasGaps ? 4 : 5);
  };

  const renderPage = () => {
    switch (currentStep) {
      case 1: return <DataPage onNext={next} />;
      case 2: return <StatsPage onNext={handleStatsNext} />;
      case 3: return <OntologiePage onNext={handleOntologyNext} />;
      case 4: return <MissingsPage onNext={next} onBack={back} />;
      case 5: return <PatternPage onNext={next} onBack={() => goTo(hasGaps ? 4 : 3)} />;
      case 6: return <MethodPage onNext={next} onBack={back} />;
      case 7: return <ParameterPage onNext={next} onBack={back} />;
      case 8: return <ResultsPage onBackParameter={() => goTo(7)} onBackPattern={() => goTo(5)} />;
      default: return (
        <div className="card border-0 shadow-sm p-5 text-center" style={{ borderRadius: 12 }}>
          <p className="text-muted">Step {currentStep} — coming soon</p>
        </div>
      );
    }
  };

  return (
    <div className="app-bg">
      <div className="container py-4" style={{ maxWidth: 1100 }}>
        <Header />
        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 12 }}>
          <div className="card-body px-4 py-3">
            <Stepper currentStep={currentStep} />
          </div>
        </div>
<<<<<<< HEAD
          <DataPage onNext={() => setCurrentStep(2)} />
          <OntologyPage onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)}/>
          <StatsPage onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)}/>
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
=======
        {renderPage()}
>>>>>>> 6aa9fe3f32b22ce48e3d636566bcab17893dc74a
      </div>
    </div>
  );
}

export default App;
