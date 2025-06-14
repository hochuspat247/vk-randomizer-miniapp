// src/utils/validationUtils.ts
import { CreateRaffleStep } from '../types';

interface FormData {
  community: string;
  giveawayName: string;
  prizeDescription: string;
  photos: File[];
  participationConditions: string[];
  requiredCommunities: string[];
  numberWinners: string;
  blackListSel: string[];
  startDateTime: string;
  endDateTime: string;
  endByParticipants: boolean;
  memberMax: string;
}

const isDigits = (s: string) => /^\d+$/.test(s);

export const isStepComplete = (
  step: CreateRaffleStep,
  formData: FormData
): boolean => {
  switch (step) {
    case 'General':
      return (
        !!formData.community &&
        !!formData.giveawayName.trim() &&
        !!formData.prizeDescription.trim() &&
        formData.photos.length > 0
      );

    case 'Condition':
      return (
        formData.participationConditions.length > 0 &&
        formData.requiredCommunities.length > 0 &&
        !!formData.numberWinners.trim() &&
        isDigits(formData.numberWinners)
      );

    case 'DateTime':
      if (formData.endByParticipants) {
        // режим «По дате» — надо заполнить обе даты
        return !!formData.startDateTime && !!formData.endDateTime;
      } else {
        // режим «По участникам» — достаточно ввести memberMax
        return !!formData.memberMax.trim() && isDigits(formData.memberMax);
      }
    case 'Addons':
      return true;

    default:
      return false;
  }
};

export const getMissingFields = (
  step: CreateRaffleStep,
  formData: FormData
): string[] => {
  const missing: string[] = [];

  if (step === 'General') {
    if (!formData.community) missing.push('Сообщество');
    if (!formData.giveawayName.trim()) missing.push('Название розыгрыша');
    if (!formData.prizeDescription.trim()) missing.push('Описание приза');
    if (formData.photos.length === 0) missing.push('Фотографии');
  } else if (step === 'Condition') {
    if (formData.participationConditions.length === 0) missing.push('Условия участия');
    if (formData.requiredCommunities.length === 0) missing.push('Обязательные сообщества');
    if (!formData.numberWinners.trim()) missing.push('Количество победителей');
    if (formData.blackListSel.length === 0) missing.push('Черный список');
  }  if (step === 'DateTime') {
    if (formData.endByParticipants) {
      // «По дате»
      if (!formData.startDateTime) missing.push('Дата и время начала');
      if (!formData.endDateTime)   missing.push('Дата и время окончания');
    } else {
      // «По участникам»
      if (!formData.memberMax.trim()) missing.push('Максимальное количество участников');
    }
  }

  return missing;
};
