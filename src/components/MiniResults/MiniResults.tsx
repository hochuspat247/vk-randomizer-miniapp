// src/components/MiniResults/MiniResults.tsx
import React from 'react';
import styles from './MiniResults.module.css';
import DefaultAvatar from '@/assets/images/persik.png';
import { Icon24MoreVertical } from '@vkontakte/icons';

export interface Participant {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface MiniResultsProps {
  participants: Participant[];
}

/**
 * Компонент «Мини-результаты» — просто список участников.
 * Растягивается по высоте, а сами элементы внутри прокручиваются.
 */
export const MiniResults: React.FC<MiniResultsProps> = ({ participants }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerCont}>
            <span className={styles.title}>Участники</span>
            <span className={styles.countBadge}>{participants.length}</span>
        </div>
      </div>
      <div className={styles.listWrapper}>
        {participants.map(p => (
          <div key={p.id} className={styles.item}>
            <img
              src={p.avatarUrl || DefaultAvatar}
              alt={p.name}
              className={styles.avatar}
              onError={e => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = DefaultAvatar;
              }}
            />
            <span className={styles.name}>{p.name}</span>
            <Icon24MoreVertical className={styles.moreIcon} />
          </div>
        ))}
      </div>
    </div>
  );
};
