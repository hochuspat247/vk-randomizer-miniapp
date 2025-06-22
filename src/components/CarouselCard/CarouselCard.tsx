// src/components/CarouselCard/CarouselCard.tsx
import React, { useState, useRef } from 'react';
import styles from './CarouselCard.module.css';
import { Icon20Add } from '@vkontakte/icons';

import RaffleCarouselCard, {
  RaffleCarouselCardProps
} from '../RaffleCarouselCard/RaffleCarouselCard';
import CommunityBanner, {
  CommunityBannerProps
} from '../CommunityBanner/CommunityBanner';

interface BaseCarouselCardProps {
  title: string;
  buttonPlus: string;
  button: string;
  variant: 'raffle' | 'community';
  /** если variant="raffle" — передаём RaffleCarouselCardProps[] */
  raffleItems?: RaffleCarouselCardProps[];
  /** если variant="community" — передаём CommunityBannerProps[] */
  communityItems?: CommunityBannerProps[];
  buttonOnClick?: () => void;
  buttonPlusOnClick?: () => void;
}

const CarouselCard: React.FC<BaseCarouselCardProps> = ({
  title,
  buttonPlus,
  button,
  variant,
  raffleItems = [],
  communityItems = [],
  buttonOnClick, 
  buttonPlusOnClick,
}) => {
  // выбираем тот массив, который сейчас нужен
  const items = variant === 'raffle' ? raffleItems : communityItems;
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const startX = useRef(0);

  // отступ между слайдами
  const GAP = 16;

  // обработчики свайпа
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - startX.current;
    setDragX(dx);
  };
  const handleTouchEnd = () => {
    if (dragX > 50 && current > 0) {
      setCurrent(current - 1);
    } else if (dragX < -50 && current < items.length - 1) {
      setCurrent(current + 1);
    }
    setDragX(0);
  };
  const goTo = (idx: number) => {
    setCurrent(idx);
    setDragX(0);
  };

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.titleCont}>
        <span className={styles.title}>{title}</span>
      </div>

      {/* Viewport для свайпов */}
      <div
        className={styles.viewport}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.track}
          style={{
            // ширина = процентная ширина + учёт отступов
            width: `calc(${items.length * 100}%)`,
            // сначала смещаем на нужный слайд (в % + GAP), потом добавляем текущее смещение пальцем
            transform: `
              translateX(calc(-${current * (100 / items.length)}% - ${current * GAP}px))
              translateX(${dragX}px)
            `,
            transition: dragX === 0 ? 'transform 0.3s ease' : 'none',
          }}
        >
          {items.map((item, idx) => (
            <div
              key={variant === 'raffle'
                ? (item as RaffleCarouselCardProps).raffleId
                : (item as CommunityBannerProps).name /* ключ для баннера */
              }
              className={styles.slide}
              style={{
                width: `${100 / items.length}%`,
                marginRight: idx < items.length - 1 ? `${GAP}px` : undefined,
              }}
            >
              {variant === 'raffle' ? (
                <RaffleCarouselCard {...(item as RaffleCarouselCardProps)} />
              ) : (
                <CommunityBanner {...(item as CommunityBannerProps)} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Навигационные точки */}
      <div className={styles.dots}>
        {items.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${idx === current ? styles.activeDot : ''}`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>

      {/* Кнопки под каруселью */}
      <div className={styles.buttons}>
        <button type="button" className={styles.buttonPlus} onClick={buttonPlusOnClick}>
          <Icon20Add fill="#D4F94E" />
          <span className={styles.buttonPlusText}>{buttonPlus}</span>
        </button>
        <button type="button" className={styles.button} onClick={buttonOnClick}>
          <span className={styles.buttonText}>{button}</span>
        </button>
      </div>
    </div>
  );
};

export default CarouselCard;
