// src/components/EditRaffle/hooks/useCanProceed.ts
import { CreateRaffleStep, FormData } from '../types';
import { validateDateTime } from '../utils/dateTimeUtils';
import { isStepComplete }   from '../utils/validationUtils';

export function useCanProceed(
  currentStep: CreateRaffleStep,
  formData: FormData
): boolean {
  if (currentStep === 'DateTime') {
    return Boolean(
      formData.startDateTime &&
      formData.endDateTime &&
      validateDateTime(formData.startDateTime, formData.endDateTime)
    );
  }
  return isStepComplete(currentStep, formData);
}
