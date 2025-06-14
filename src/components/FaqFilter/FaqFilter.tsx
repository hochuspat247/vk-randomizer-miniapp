// FaqFilter.tsx
import React, { useState, useEffect } from 'react';
import styles from './FaqFilter.module.css';
import {options} from "@constants/Texts/FaqFilter"

interface FaqFilterProps {
  /** Начальное выбранное значение (необязательно) */
  defaultValue?: string;
  /** Колбэк, в который придёт новое выбранное значение */
  onSelect?: (value: string) => void;
}

const FaqFilter: React.FC<FaqFilterProps> = ({ defaultValue, onSelect }) => {
  const [selected, setSelected] = useState<string>(defaultValue || '');

  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  const handleClick = (value: string) => {
    setSelected(value);
    onSelect?.(value);
  };

  return (
    <div className={styles.container}>
      {options.map(opt => {
        const isActive = opt.value === selected;
        const fill = isActive ? '#2C2D2E' : '#E1E3E6';
        return (
          <button
            key={opt.value}
            className={[
              styles.button,
              isActive ? styles.active : ''
            ].join(' ')}
            onClick={() => handleClick(opt.value)}
          >
            {/* Рендерим иконку только если она задана */}
            {opt.Icon && <opt.Icon fill={fill} />}
            <span className={styles.label}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FaqFilter;
