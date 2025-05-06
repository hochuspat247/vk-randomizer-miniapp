import React from 'react';
import styles from './BadgeIcon.module.css';

interface IconOrImageProps {
  src?: string; // Путь к изображению
  icon?: React.ReactNode; // Иконка VK UI
}

const BadgeIcon: React.FC<IconOrImageProps> = ({ src, icon }) => {
  return (
    <div className={styles.container}>
      {icon ? (
        <div className={styles.icon}>{icon}</div>
      ) : (
        <img src={src} className={styles.image} />
      )}
    </div>
  );
};

export default BadgeIcon;
