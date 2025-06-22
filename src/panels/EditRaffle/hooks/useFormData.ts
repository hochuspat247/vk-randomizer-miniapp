// src/components/EditRaffle/hooks/useFormData.ts
import { useState, useRef, useEffect } from 'react';
import { FormData } from '../types';
import { editRaffleMock } from '@/mocks/EditRaffleMock';

export function useFormData() {
  const [formData, setFormData] = useState<FormData>(() => ({ ...editRaffleMock }));
  const draftRef = useRef<FormData>(formData);

  useEffect(() => {
    draftRef.current = formData;
  }, [formData]);

  /** Обновить одно поле формы */
  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  /** Обновить несколько полей разом */
  function updateFields(fields: Partial<FormData>) {
    setFormData(prev => ({ ...prev, ...fields }));
  }

  return { formData, updateField, updateFields, draftRef };
}
