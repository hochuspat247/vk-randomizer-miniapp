// src/components/EditRaffle/hooks/useCanProceed.ts
import { CreateRaffleStep, FormData } from '../types';
import { validateDateTime } from '../utils/dateTimeUtils';
import { isStepComplete }   from '../utils/validationUtils';

export function useCanProceed(
  currentStep: CreateRaffleStep,
  formData: FormData
): boolean {
  // В режиме редактирования разрешаем переход между шагами без валидации
  return true;
}
