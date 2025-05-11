import React from 'react';
import styles from './BadgeIcon.module.css';

interface IconOrImageProps {
  src?: string; // Путь к изображению
  icon?: React.ReactNode; // Иконка VK UI
  alt?: string; // Описание изображения
}

const BadgeIcon: React.FC<IconOrImageProps> = ({ src, icon, alt = "Default image description" }) => {
  // Приоритет для src, если src есть, показываем картинку, если нет - показываем иконку
  if (src) {
    return (
      <div className={styles.container}>
        <img src={src} alt={alt} className={styles.image} />
      </div>
    );
  }

  // Если src нет, проверяем, передан ли icon
  if (icon) {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>{icon}</div>
      </div>
    );
  }

  // Если не передан ни src, ни icon, можно вернуть пустой блок или заглушку
  return (
    <div className={styles.container}>
      <div className={styles.icon}></div>
    </div>
  );
};

export default BadgeIcon;
