import React, { useState, useEffect } from 'react';
import styles from './CommunityModalCard.module.css';
import Select from '../Select/Select';

import pers from "../../assets/images/persik.png"

import { Icon28UsersOutline } from '@vkontakte/icons';
import { Icon28UserCircleOutline } from '@vkontakte/icons';

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
  const [subscriberAvatars, setSubscriberAvatars] = useState<{[index: number]: boolean}>({});

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  const handleSubscriberAvatarError = (index: number) => {
    setSubscriberAvatars(prev => ({...prev, [index]: true}));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {type === 'select' && (
          <>
            <div className={styles.title}>Подключение</div>
            <div className={styles.subtitle}>
              Сообщества для проведения розыгрышей
            </div>

            <div className={styles.selectCont}>
              <Select
                placeholder={placeholder || ''}
                options={options}
                onChange={setSelected}
              />
            </div>

            <button
              className={styles.button}
              onClick={() => selected && onSubmit?.(selected)}
            >
              Подключить
            </button>
          </>
        )}

        {type === 'permission' && (
          <>
            <div className={styles.avatarCont}>
              <div className={styles.avatarBack}>
                {communityAvatar && !avatarError ? (
                  <img
                    src={communityAvatar}
                    alt="community"
                    className={styles.avatar}
                    onError={handleAvatarError}
                  />
                ) : (
                  <div className={styles.avatarFallback}>
                    <Icon28UsersOutline width={56} height={56} />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.title}>{communityName}</div>
            <div className={styles.subtitle}>Публикации от имени сообщества</div>

            {/* Подписчики */}
            <div className={styles.subscribers}>
              <div className={styles.subAvatars}>
                {subscribers.slice(0, 3).map((s, i) => {
                  return (
                    <div key={i} className={styles.subAvatarWrapper}>
                      {s.avatar && !subscriberAvatars[i] ? (
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className={styles.subAvatar}
                          onError={() => handleSubscriberAvatarError(i)}
                        />
                      ) : (
                        <div className={styles.subAvatarFallback}>
                          <Icon28UserCircleOutline width={32} height={32} />
                        </div>
                      )}
                    </div>
                  );
                })}
                {subscribers.length > 3 && (
                  <div className={styles.subCount}>+{subscribers.length - 3}</div>
                )}
              </div>
                <div className={styles.subNames}>
                  {subscribers.slice(0, 3).map((s) => s.name).join(', ')}
                  {subscribers.length > 3 && (
                    <>
                      <br />
                      <span className={styles.moreText}>и ещё {subscribers.length - 3} человек</span>
                    </>
                  )}
                </div>
            </div>

            <button className={styles.buttonPrimary}>Дать разрешение</button>
            <button className={styles.buttonSecondary} onClick={onBack}>
              Другое сообщество
            </button>
          </>
        )}

        {type === 'success' && (
          <>
            <div className={styles.avatarCont}>
              {/* Аватар сообщества с заглушкой */}
              {communityAvatar && !avatarError ? (
                <img
                  src={communityAvatar}
                  alt="community"
                  className={styles.avatar}
                  onError={handleAvatarError} // обработка ошибки
                />
              ) : (
                <div className={styles.avatarFallback}>
                  <Icon28UsersOutline width={56} height={56} />
                </div>
              )}
            </div>
            <div className={styles.titleSucces}>{communityName}</div>
            <div className={styles.subtitle}>Сообщество подключено</div>
            <div className={styles.buttonContainer}>
              <button className={styles.buttonPrimary}>Отлично!</button>
              <button className={styles.buttonSecondary}>Настроить виджет</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityModalCard;