/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Header from './components/layout/Header';
import Stepper from './components/layout/Stepper';
import DataPage from './pages/DataPage';

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
      </div>
    </div>
  );
}

export default App;