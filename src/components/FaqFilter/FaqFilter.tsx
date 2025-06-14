// FaqFilter.tsx
import React, { useState, useEffect } from 'react';
import styles from './FaqFilter.module.css';
import PlayTriangleIcon from '@/assets/icons/PlayTriangleIcon';
import { Icon20Users3Outline, Icon20ErrorCircleOutline } from '@vkontakte/icons';
import BuildingIcon from '@/assets/icons/BuildingIcon';
import WrenchIcon from '@/assets/icons/WrenchIcon';
import CrownIcon from '@/assets/icons/CrownIcon';

interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
}

interface Option {
  label: string;
  value: string;
  /** Иконка — опционально */
  Icon?: React.FC<IconProps>;
}

interface FaqFilterProps {
  /** Начальное выбранное значение (необязательно) */
  defaultValue?: string;
  /** Колбэк, в который придёт новое выбранное значение */
  onSelect?: (value: string) => void;
}

const options: Option[] = [
  { label: 'Все',         value: 'all'         /* без Icon */ },
  { label: 'Введение',    value: 'intro',       Icon: PlayTriangleIcon           },
  { label: 'Сообщества',  value: 'communities', Icon: Icon20Users3Outline        },
  { label: 'Виджеты',     value: 'widgets',     Icon: BuildingIcon               },
  { label: 'Розыгрыши',   value: 'raffles',     Icon: CrownIcon                  },
  { label: 'Ошибки',      value: 'errors',      Icon: Icon20ErrorCircleOutline   },
  { label: 'Прочее',      value: 'other',       Icon: WrenchIcon                 },
];

const ACTIVE_COLOR   = 'var(--Green, #2C2D2E)';
const INACTIVE_COLOR = 'var(--Dark-Text-Primary, #E1E3E6)';

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
        const fill = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;
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
