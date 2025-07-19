// src/components/Swipers/Swipers.tsx
import React, { ReactNode } from 'react';
import { Headline } from '@vkontakte/vkui';
import styles from './Swipers.module.css';
import { Toggle } from '../Toggle/Toggle';

export interface SwiperOption {
  /** Уникальный ключ */
  id: string;
  /** Основной текст */
  label: string;
  /** Подсказка снизу */
  subtitle?: ReactNode;
  /** Текущее значение */
  checked: boolean;
  /** Колбэк при переключении */
  onChange: (checked: boolean) => void;
}

interface SwipersProps {
  /** Заголовок группы */
  title: string;
  /** Список опций */
  options: SwiperOption[];
}

export const Swipers: React.FC<SwipersProps> = ({ title, options }) => {
  return (
    // Обертка блока с настройками (вместо Group)
    <div className={styles.container}>
      {/* Заголовок секции */}
      <Headline className={styles.header}>{title}</Headline>

      {/* Список переключателей */}
      {options.map(opt => (
        <div key={opt.id} className={styles.cell}>
          {/* Текстовая часть: заголовок + при необходимости подзаголовок */}
          <div className={styles.texts}>
            <span className={styles.label}>{opt.label}</span>
            {opt.subtitle && <span className={styles.subtitle}>{opt.subtitle}</span>}
          </div>

          {/* Сам тумблер */}
          <Toggle checked={opt.checked} onChange={opt.onChange} />
        </div>
      ))}
    </div>
  );
};
