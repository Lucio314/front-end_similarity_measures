import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/layout/Header';
import Stepper from './components/layout/Stepper';
import DataPage from './pages/DataPage';
import StatsPage from './pages/StatsPage';
import OntologiePage from './pages/OntologiePage';

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const renderPage = () => {
    switch (currentStep) {
      case 1: return <DataPage onNext={() => setCurrentStep(2)} />;
      case 2: return <StatsPage onNext={() => setCurrentStep(3)} />;
      case 3: return <OntologiePage onNext={() => setCurrentStep(4)} />;
      default: return (
        <div className="card border-0 shadow-sm p-5 text-center" style={{ borderRadius: 12 }}>
          <p className="text-muted">Étape {currentStep} — à venir</p>
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
        {renderPage()}
      </div>
    </div>
  );
}

export default App;