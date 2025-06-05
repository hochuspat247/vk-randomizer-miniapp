import React from 'react';
import { Icon20LifebuoyOutline } from '@vkontakte/icons';
import styles from '../Raffles.module.css';

export const EmptyState: React.FC = () => {
  return (
    <div className={styles.emptyState}>
      <Icon20LifebuoyOutline />
      <span className={styles.emptyStateText}>
        У вас пока нет розыгрышей
      </span>
    </div>
  );
}; 