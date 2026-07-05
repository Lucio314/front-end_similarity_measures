import React from 'react';
import { useTranslation } from 'react-i18next';

const STEP_KEYS = ['data', 'statistics', 'ontology', 'temporal_gaps', 'method', 'parameters', 'results'];

interface StepperProps {
  currentStep: number;
}

function Stepper({ currentStep }: StepperProps) {
  const { t } = useTranslation();

  return (
    <div className="d-flex align-items-start w-100">
      {STEP_KEYS.map((key, index) => {
        const id = index + 1;
        return (
          <React.Fragment key={key}>
            <div className="d-flex flex-column align-items-center flex-shrink-0">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle fw-semibold"
                style={{
                  width: 36, height: 36,
                  backgroundColor: id <= currentStep ? '#4f46e5' : '#e5e7eb',
                  color: id <= currentStep ? '#ffffff' : '#9ca3af',
                  fontSize: 14,
                  transition: 'background-color 0.25s',
                }}
              >
                {id}
              </div>
              <span style={{
                fontSize: 11, marginTop: 6, whiteSpace: 'nowrap',
                color: id === currentStep ? '#4f46e5' : '#9ca3af',
                fontWeight: id === currentStep ? 600 : 400,
              }}>
                {t(`steps.${key}`)}
              </span>
            </div>
            {index < STEP_KEYS.length - 1 && (
              <div style={{
                flex: 1, height: 2, marginTop: 17,
                backgroundColor: id < currentStep ? '#4f46e5' : '#e5e7eb',
                transition: 'background-color 0.25s',
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Stepper;
