import { STEPS } from '../../types';

interface StepperProps {
  currentStep: number;
}

function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="d-flex align-items-start w-100">
      {STEPS.map((step, index) => (
        <>
          <div key={step.id} className="d-flex flex-column align-items-center flex-shrink-0">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle fw-semibold"
              style={{
                width: 36,
                height: 36,
                backgroundColor: step.id <= currentStep ? '#4f46e5' : '#e5e7eb',
                color: step.id <= currentStep ? '#ffffff' : '#9ca3af',
                fontSize: 14,
                transition: 'background-color 0.25s',
              }}
            >
              {step.id}
            </div>
            <span
              style={{
                fontSize: 11,
                marginTop: 6,
                whiteSpace: 'nowrap',
                color: step.id === currentStep ? '#4f46e5' : '#9ca3af',
                fontWeight: step.id === currentStep ? 600 : 400,
              }}
            >
              {step.label}
            </span>
          </div>

          {index < STEPS.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 2,
                marginTop: 17,
                backgroundColor: step.id < currentStep ? '#4f46e5' : '#e5e7eb',
                transition: 'background-color 0.25s',
              }}
            />
          )}
        </>
      ))}
    </div>
  );
}

export default Stepper;