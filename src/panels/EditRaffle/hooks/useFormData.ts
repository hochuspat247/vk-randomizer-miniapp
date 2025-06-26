// src/components/EditRaffle/hooks/useFormData.ts
import { useState, useRef, useEffect, useCallback } from 'react';
import { FormData } from '../types';

const defaultFormData: FormData = {
  community: '',
  giveawayName: '',
  prizeDescription: '',
  photos: [],
  conditionOptions: [],
  communityTagOptions: [],
  participationConditions: [],
  requiredCommunities: [],
  communityPartnersTags: [],
  numberWinners: '',
  blackListOptions: [],
  blackListSel: [],
  startDateTime: '',
  endDateTime: '',
  endByParticipants: false,
  publishResults: false,
  onlySubscribers: false,
  isPartners: false,
  hideParticipantsCount: false,
  excludeMe: false,
  excludeAdmins: false,
  partnersTags: [],
  memberMax: '',
  isSelectedStartTime: '',
  isSelectedEndTime: '',
  startDateLabel: '',
  endDateLabel: '',
};

export function useFormData() {
  const [formData, setFormData] = useState<FormData>(() => ({ ...defaultFormData }));
  const draftRef = useRef<FormData>(formData);

  useEffect(() => {
    draftRef.current = formData;
  }, [formData]);

  /** Обновить одно поле формы */
  const updateField = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  /** Обновить несколько полей разом */
  const updateFields = useCallback((fields: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  }, []);

  return { formData, updateField, updateFields, draftRef };
}
