import React from 'react';
import styles from './BadgeIcon.module.css';

interface IconOrImageProps {
  src?: string; // Путь к изображению
  icon?: React.ReactNode; // Иконка VK UI
  alt?: string; // Описание изображения
}

const BadgeIcon: React.FC<IconOrImageProps> = ({ src, icon, alt = "Default image description" }) => {
  return (
    <div className={styles.container}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <div className={styles.icon}>{icon ?? null}</div>
      )}
    </div>
  );
};

export default BadgeIcon;
