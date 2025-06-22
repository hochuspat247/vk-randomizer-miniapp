// src/components/EditRaffle/hooks/useSteps.ts
import { useState } from 'react';
import { CreateRaffleStep } from '../types';

export function useSteps() {
  const steps: CreateRaffleStep[] = ['General', 'Condition', 'DateTime', 'Addons'];
  const [currentStep, setCurrentStep] = useState<CreateRaffleStep>(steps[0]);

  function nextStep() {
    setCurrentStep(prev => {
      const idx = steps.indexOf(prev);
      return idx < steps.length - 1 ? steps[idx + 1] : prev;
    });
  }

  /** 
   * Если на первом шаге — вызываем onFirst(), 
   * иначе переходим на предыдущий
   */
  function prevStep(onFirst: () => void) {
    setCurrentStep(prev => {
      const idx = steps.indexOf(prev);
      if (idx > 0) return steps[idx - 1];
      onFirst();
      return prev;
    });
  }

  return { currentStep, nextStep, prevStep };
}
