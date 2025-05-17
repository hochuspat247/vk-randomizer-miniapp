import React, { useState } from 'react';
import styles from './CommunityModalCard.module.css';

import Select from '../Select/Select';
import { Icon28UsersOutline, Icon28UserCircleOutline } from '@vkontakte/icons';

import {
  CONNECT_TITLE,
  CONNECT_SUBTITLE,
  CONNECT_BUTTON,
  PERMISSION_SUBTITLE,
  PERMISSION_BUTTON,
  OTHER_COMMUNITY,
  SUCCESS_SUBTITLE,
  SUCCESS_BUTTON_OK,
  SUCCESS_BUTTON_WIDGET,
  AND_MORE,
  NO_COMMUNITIES_PLACEHOLDER
} from '../../constants/Texts/CommunityModalCardText'; // или оставь свои строки напрямую

interface Subscriber {
  name: string;
  avatar: string;
}

interface CommunityModalCardProps {
  type: 'select' | 'permission' | 'success';
  placeholder?: string;
  options?: string[];
  communityName?: string;
  communityAvatar?: string;
  subscribers?: Subscriber[];
  onSubmit?: (selected: string) => void;
  onBack?: () => void;
}

const CommunityModalCard: React.FC<CommunityModalCardProps> = ({
  type,
  placeholder,
  options = [],
  communityName,
  communityAvatar,
  subscribers = [],
  onSubmit,
  onBack,
}) => {
  const [selected, setSelected] = useState('');
  const [avatarError, setAvatarError] = useState(false);
  const [subscriberAvatars, setSubscriberAvatars] = useState<{ [index: number]: boolean }>({});

  const handleAvatarError = () => setAvatarError(true);
  const handleSubscriberAvatarError = (index: number) => {
    setSubscriberAvatars((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* SELECT */}
        {type === 'select' && (
          <>
            <div className={styles.title}>{CONNECT_TITLE}</div>
            <div className={styles.subtitle}>{CONNECT_SUBTITLE}</div>
            <div className={styles.selectCont}>
              {options.length > 0 ? (
                <Select
                  placeholder={placeholder || ''}
                  options={options}
                  onChange={setSelected}
                />
              ) : (
                <div className={styles.selectPlaceholder}>{NO_COMMUNITIES_PLACEHOLDER}</div>
              )}
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={() => selected && onSubmit?.(selected)}
            >
              {CONNECT_BUTTON}
            </button>
          </>
        )}

        {/* PERMISSION */}
        {type === 'permission' && (
          <>
            <div className={styles.avatarCont}>
              <div className={styles.avatarBack}>
                {communityAvatar && !avatarError ? (
                  <img src={communityAvatar} alt="community" className={styles.avatar} onError={handleAvatarError} />
                ) : (
                  <div className={styles.avatarFallback}><Icon28UsersOutline width={56} height={56} /></div>
                )}
              </div>
            </div>
            <div className={styles.title}>{communityName}</div>
            <div className={styles.subtitle}>{PERMISSION_SUBTITLE}</div>

            <div className={styles.subscribers}>
              <div className={styles.subAvatars}>
                {subscribers.slice(0, 3).map((s, i) => (
                  <div key={i} className={styles.subAvatarWrapper}>
                    {!subscriberAvatars[i] && s.avatar ? (
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className={styles.subAvatar}
                        onError={() => handleSubscriberAvatarError(i)}
                      />
                    ) : (
                      <div className={styles.subAvatarFallback}><Icon28UserCircleOutline width={32} height={32} /></div>
                    )}
                  </div>
                ))}
                {subscribers.length > 3 && (
                  <div className={styles.subCount}>+{subscribers.length - 3}</div>
                )}
              </div>
              <div className={styles.subNames}>
                {subscribers.slice(0, 3).map((s) => s.name).join(', ')}
                {subscribers.length > 3 && (
                  <>
                    <br />
                    <span className={styles.moreText}>{AND_MORE} {subscribers.length - 3} человек</span>
                  </>
                )}
              </div>
            </div>

            <button type="button" className={styles.buttonPrimary}>{PERMISSION_BUTTON}</button>
            <button type="button" className={styles.buttonSecondary} onClick={onBack}>
              {OTHER_COMMUNITY}
            </button>
          </>
        )}

        {/* SUCCESS */}
        {type === 'success' && (
          <>
            <div className={styles.avatarCont}>
              {!avatarError && communityAvatar ? (
                <img src={communityAvatar} alt="community" className={styles.avatar} onError={handleAvatarError} />
              ) : (
                <div className={styles.avatarFallback}><Icon28UsersOutline width={56} height={56} /></div>
              )}
            </div>
            <div className={styles.titleSucces}>{communityName}</div>
            <div className={styles.subtitle}>{SUCCESS_SUBTITLE}</div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.buttonPrimary}>{SUCCESS_BUTTON_OK}</button>
              <button type="button" className={styles.buttonSecondary}>{SUCCESS_BUTTON_WIDGET}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityModalCard;
