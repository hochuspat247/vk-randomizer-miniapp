// src/components/CommunityBanner/CommunityBanner.tsx
import React, { useState } from 'react';
import styles from './CommunityBanner.module.css';
import { Icon20ChevronRight } from '@vkontakte/icons';
import LockIcon from '@/assets/icons/LockG'; // ваша иконка замка (зелёная)
import DefaultAvatar from '@/assets/images/Picture(1).png'; 
import { getRoleDisplayName } from '@/utils/vkTransformers';

export interface CommunityBannerProps {
  /** URL аватара сообщества */
  avatarUrl?: string;
  /** Название сообщества */
  name: string;
  /** Роль в сообществе (например, "Владелец", "Администратор") */
  adminType: string;
  /** Обработчик клика по баннеру */
  onClick?: () => void;
}

const CommunityBanner: React.FC<CommunityBannerProps> = ({
  avatarUrl,
  name,
  adminType,
  onClick,
}) => {
  console.log('CommunityBanner adminType:', adminType);
  console.log('getRoleDisplayName(adminType):', getRoleDisplayName(adminType as any));

    const [imgError, setImgError] = useState(false);

        // выбираем, что именно рендерить: переданный URL или заглушку
    const src = avatarUrl && !imgError ? avatarUrl : DefaultAvatar;

  return (
    <div className={styles.banner} onClick={onClick}>
      <div className={styles.left}>
        <div className={styles.avatarWrapper}>
          <img
            className={styles.avatar}
            src={src}
            alt={name}
            onError={() => setImgError(true)}
          />
        <div className={styles.lock}>
            <LockIcon fill="D4F94E" />
        </div>
        </div>
        <div className={styles.texts}>
          <div className={styles.name}>{name}</div>
          <div className={styles.role}>{getRoleDisplayName(adminType as any)}</div>
        </div>
      </div>
        <Icon20ChevronRight width={24} height={24} fill="#D4F94E" />
    </div>
  );
};

export default CommunityBanner;
