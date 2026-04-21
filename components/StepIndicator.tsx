
import React from 'react';
import { Step, StepId } from '../types';
import { STEPS } from '../constants';

interface StepIndicatorProps {
  currentStep: string;
  onStepClick: (id: string) => void;
  completedSteps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  onStepClick, 
  completedSteps 
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
      {STEPS.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = completedSteps.includes(step.id);
        
        return (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all duration-300 text-sm font-bold shadow-sm ${
              isActive 
                ? "bg-red-500 border-red-500 text-white shadow-red-200" 
                : isCompleted
                  ? "bg-green-50 border-green-200 text-green-600"
                  : "bg-white border-orange-100 text-gray-400 hover:border-orange-200"
            }`}
          >
            <span className="text-lg">{step.icon}</span>
            <span className="whitespace-nowrap">{step.label}</span>
            {isCompleted && !isActive && <span className="text-[10px]">✓</span>}
          </button>
        );
      })}
    </div>
  );
};
