// src/components/MenuSettings/MenuSettings.tsx
import React from 'react';
import styles from './MenuSettings.module.css';
import { items } from '@/constants/Texts/MenuSettingsText';

export const MenuSettings: React.FC = () => {

  // Индексы, после которых нужно рисовать разделитель (после idx)
  const separatorsAfter = new Set<number>([1, 4, 6, 8]);
  // А также перед первым элементом
  const showBeforeFirst = true;

  return (
    <div className={styles.container}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {showBeforeFirst && idx === 0 && <div className={styles.divider} />}

          <button className={styles.item} onClick={item.onClick}>
            <div className={styles.iconWrapper}>{item.icon}</div>
            <span className={styles.label}>{item.label}</span>
          </button>

          {separatorsAfter.has(idx) && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  );
};
