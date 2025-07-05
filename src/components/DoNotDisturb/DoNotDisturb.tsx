// src/components/DoNotDisturb/DoNotDisturb.tsx
import React, { useState, useEffect } from 'react';
import styles from './DoNotDisturb.module.css';
import { Icon20Check } from '@vkontakte/icons';
import { dndOptions } from '@/constants/Texts/DoNotDisturb';
import {TimePicker} from '../TimePicker/TimePicker';

export interface DndOption {
  id: string;
  label: string;
}

interface DoNotDisturbProps {
  options?: DndOption[];
  onChange?: (selectedId: string, time?: string) => void;
}

export const DoNotDisturb: React.FC<DoNotDisturbProps> = ({
  options = dndOptions,
  onChange
}) => {
  const [selectedId, setSelectedId] = useState<string>('off');
  const [time, setTime] = useState<string>('');
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    setTime(`${hh}:${mm}`);
  }, []);

  const handleSelect = (id: string) => {
    if (id === 'custom') {
      setSelectedId('custom');
      setPopoverOpen(true);
      onChange?.('custom', time);
    } else {
      setSelectedId(id);
      setPopoverOpen(false);
      onChange?.(id);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    setSelectedId('custom');
    onChange?.('custom', newTime);
  };

  return (
    <div className={styles.container}>
      <div className={styles.separator} />

      {options.map(opt => (
        <button
          key={opt.id}
          type="button"
          className={`${styles.option} ${
            selectedId === opt.id ? styles.active : ''
          }`}
          onClick={() => handleSelect(opt.id)}
        >
          <span className={styles.label}>{opt.label}</span>
          {selectedId === opt.id && <Icon20Check className={styles.check} />}
        </button>
      ))}

      <div className={styles.separator} />

      <div className={styles.customWrapper}>
        <button
          type="button"
          className={`${styles.option2} ${
            selectedId === 'custom' ? styles.active : ''
          }`}
          onClick={() => handleSelect('custom')}
        >
          <div className={styles.labelCont}>
            <span className={styles.label}>Активировать до (выберите)</span>
            <span className={styles.time}>{time}</span>
          </div>
          {selectedId === 'custom' && <Icon20Check className={styles.check} />}
        </button>

        {popoverOpen && (
          <div className={styles.popover}>
            <TimePicker/>
          </div>
        )}
      </div>
    </div>
  );
};
