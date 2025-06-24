// src/components/PreviewPanel/PreviewPanel.tsx
import React from 'react';
import styles from './PreviewRaffle.module.css';
import { Icon16ClockOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

export interface PreviewRaffleProps {
  /** URL изображения розыгрыша */
  imageSrc: string;
  /** Заголовок розыгрыша */
  raffleItem: string;
  /** URL аватарки канала */
  channelAvatarSrc: string;
  /** Название канала */
  channelName: string;
  /** Описание розыгрыша */
  description: string;
  endTime: string;
}

const PreviewRaffle: React.FC<PreviewRaffleProps> = ({
  imageSrc,
  raffleItem,
  channelAvatarSrc,
  channelName,
  description,
  endTime,
}) => {

    const router = useRouteNavigator();

  return (

    <div className={styles.container}>
        {/* Изображение */}
        <div className={styles.imageWrapper}>
            <img src={imageSrc} alt={raffleItem} className={styles.image} />
        </div>

        {/* Контент ниже картинки */}
        <div className={styles.content}>
            <div className={styles.rowInfo}>
                <div className={styles.titleName}>
                    <div className={styles.title}>
                        <span>Розыгрыш </span>  
                        <span className={styles.tittleItem}>{raffleItem}</span>
                    </div>
                    <span className={styles.channelName}>{channelName}</span>
                </div>
                <img
                    src={channelAvatarSrc}
                    alt={channelName}
                    className={styles.channelAvatar}
                />
            </div>
            {/* Описание */}
            <span className={styles.description}>{description}</span>

            <div className={styles.lineCont}>
                <div className={styles.line}></div>
            </div>

            <div className={styles.end}>
                <div className={styles.endCont}>
                    <span className={styles.endText}>До окончания розыгрыша:</span>
                    <div className={styles.endTime}>{endTime}</div>
                </div>
                <div className={styles.button}>
                    <Icon16ClockOutline  />
                    Ожидаем завершение
                </div>
                <span className={styles.redText}>
                    Внимание! Вы не участвуете в розыгрыше
                </span>
                <button className={styles.buttonParticipation}>
                    <span>Принять участие</span>
                </button>
            </div>

            <div className={styles.lineCont2}>
                <div className={styles.line}></div>
            </div>

            <button 
                className={styles.buttonMain}
                onClick={() => router.push("/")}
            >
                <span>На главную</span>
            </button>
        </div>
    </div>
  );
};

export default PreviewRaffle;
