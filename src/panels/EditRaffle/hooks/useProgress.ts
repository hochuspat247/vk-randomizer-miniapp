import { useState, useEffect, useRef } from 'react';
import { FormData } from '../types';

export const useProgress = (formData: FormData) => {
  const [progress, setProgress] = useState(0);

  const initialStart = useRef(formData.startDateTime);
  const initialEnd   = useRef(formData.endDateTime);

  useEffect(() => {
    const totalFields = 10; // 10 обязательных полей
    const progressPerField = 100 / totalFields;

    let filledFields = 0;

    // General
    if (formData.community) filledFields += 1;
    if (formData.giveawayName.trim()) filledFields += 1;
    if (formData.prizeDescription.trim()) filledFields += 1;
    if (formData.photos.length > 0) filledFields += 1;

    // Condition
    if (formData.participationConditions.length > 0) filledFields += 1;
    if (formData.requiredCommunities.length > 0) filledFields += 1;
    if (formData.numberWinners.trim()) filledFields += 1;
    if (formData.blackListSel.length > 0) filledFields += 1;

    // DateTime
    if (formData.startDateTime !== initialStart.current) filledFields += 1;
    if (formData.endDateTime   !== initialEnd.current)   filledFields += 1;

    const newProgress = Math.round(filledFields * progressPerField);
    setProgress(newProgress);
  }, [formData]);

  return progress;
}; 