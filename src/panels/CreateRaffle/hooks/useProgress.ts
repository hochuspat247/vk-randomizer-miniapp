import { useState, useEffect, useRef } from 'react';
import { FormData } from '../types';

export const useProgress = (formData: FormData) => {
  const [progress, setProgress] = useState(0);

  const initialStart = useRef(formData.startDateTime);
  const initialEnd   = useRef(formData.endDateTime);

  useEffect(() => {
    let totalFields = 8; // General + Condition
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
    let bonus = 0;
    if (formData.startDateTime) bonus += 10;
    if (formData.endByParticipants) {
      totalFields += 2; // startDateTime и memberMax
      if (formData.startDateTime) filledFields += 1;
      if (formData.memberMax.trim()) filledFields += 1;
    } else {
      totalFields += 2; // startDateTime и endDateTime
      if (formData.startDateTime) filledFields += 1;
      if (formData.endDateTime) filledFields += 1;
    }

    let newProgress = Math.round((filledFields / totalFields) * 100) + bonus;
    if (newProgress > 100) newProgress = 100;
    if (newProgress >= 100) {
      setProgress(100);
    } else {
      setProgress(newProgress);
    }
  }, [formData]);

  return progress;
}; 