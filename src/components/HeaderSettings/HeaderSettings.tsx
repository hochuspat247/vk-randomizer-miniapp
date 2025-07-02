// src/components/HeaderSettings/HeaderSettings.tsx
import React, { useState } from 'react';
import styles from './HeaderSettings.module.css';
import { Icon20LogoVk } from '@vkontakte/icons';
import { Icon16InfoOutline  } from '@vkontakte/icons';
import DefaultAvatar from '@/assets/images/persik.png';

interface HeaderSettingsProps {
  avatarUrl?: string;
  name: string;
  vkId: string;
}

export const HeaderSettings: React.FC<HeaderSettingsProps> = ({
  avatarUrl,
  name,
  vkId,
}) => {
  const [imgSrc, setImgSrc] = useState(avatarUrl || DefaultAvatar);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = DefaultAvatar;
  };

  return (
    <div className={styles.container}>
      <img
        src={imgSrc}
        onError={handleError}
        alt={name}
        className={styles.avatar}
      />
      <div className={styles.name}>{name}</div>

      <div className={styles.row}>
        <div className={styles.idContainer}>
            <div className={styles.id}>
                <Icon20LogoVk className={styles.vkIcon} />
                <span className={styles.idText1}>ID</span>
            </div>
          <span className={styles.idText2}>{vkId}</span>
        </div>
        <div className={styles.infoButton}>
          <Icon16InfoOutline color='#76787A' />
        </div>
      </div>
    </div>
  );
};
