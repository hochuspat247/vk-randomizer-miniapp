import { CreateRaffleStep } from '../types';

export const isStepComplete = (
  step: CreateRaffleStep,
  formData: {
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
  }
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
        formData.blackListSel.length > 0
      );
    case 'DateTime':
      return !!formData.startDateTime && !!formData.endDateTime;
    case 'Addons':
      return true; // Addons не влияет на прогресс
    default:
      return false;
  }
};

export const getMissingFields = (
  step: CreateRaffleStep,
  formData: {
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
  }
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
  } else if (step === 'DateTime') {
    if (!formData.startDateTime) missing.push('Дата и время начала');
    if (!formData.endDateTime) missing.push('Дата и время окончания');
  }
  
  return missing;
}; 