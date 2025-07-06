// src/components/NotificationButton/NotificationButton.tsx
import React, { ReactNode } from 'react';
import styles from './NotificationButton.module.css';
import { Icon28MuteOutline } from '@vkontakte/icons';

interface NotificationButtonProps {
  title?: string;         // Название действия, например "Временно отключить"
  description?: ReactNode;   // Подсказка, например "Выберите, на какой срок..."
  onClick?: () => void;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({
  title = "Временно отключить",
  description = <>Выберите, на какой срок вы хотите <br/> отключить push-уведомления</>,
  onClick
}) => {
  return (
    <>
      {/* Разделитель сверху */}
      <div className={styles.divider} />

      <button className={styles.button} onClick={onClick}>
        <Icon28MuteOutline className={styles.icon} />

        <div className={styles.texts}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>
      </button>

      <div className={styles.divider} />
    </>
  );
};
