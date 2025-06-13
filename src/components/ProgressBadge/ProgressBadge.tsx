import React, { useEffect, useRef, useState } from 'react';
import styles from './ProgressBadge.module.css';
import { Icon24GearOutline } from '@vkontakte/icons';

import { Icon16WrenchOutline, Icon20CalendarOutline, Icon20ListAddOutline } from '@vkontakte/icons';

interface ProgressBadgeProps {
  progress: number; // от 0 до 100
    type: 'General' | 'Condition' | 'DateTime' | 'Addons';
}

const ProgressBadge: React.FC<ProgressBadgeProps> = ({ progress, type }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const displayText = clampedProgress === 100 ? 'Готово!' : `${clampedProgress}%`;
  const progressRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const [isIconReached, setIsIconReached] = useState(false);
  const [isTextReached, setIsTextReached] = useState(false);

  const checkIntersections = () => {
    if (progressRef.current && iconRef.current && textRef.current) {
      const progressRect = progressRef.current.getBoundingClientRect();
      const iconRect = iconRef.current.getBoundingClientRect();
      const textRect = textRef.current.getBoundingClientRect();

      // Проверка пересечения с иконкой (25% ширины)
      const iconOverlap = Math.min(progressRect.right, iconRect.right) - Math.max(progressRect.left, iconRect.left);
      setIsIconReached(iconOverlap >= iconRect.width * 0.25);

      // Проверка пересечения с текстом (25% ширины)
      const textOverlap = Math.min(progressRect.right, textRect.right) - Math.max(progressRect.left, textRect.left);
      setIsTextReached(textOverlap >= textRect.width * 0.1);
    }

    animationRef.current = requestAnimationFrame(checkIntersections);
  };

  useEffect(() => {
    // Запускаем постоянную проверку пересечений
    animationRef.current = requestAnimationFrame(checkIntersections);

    // Останавливаем при размонтировании
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Обновляем ширину прогресс-бара при изменении progress
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${clampedProgress}%`;
    }
  }, [clampedProgress]);

  return (
    <>


    {/* General part */}

    {type === 'General' && (<div className={styles.wrapper}>
      <div className={styles.progressContainer}>
        {/* Прогресс-бар */}
        <div
          ref={progressRef}
          className={styles.progressBar}
          style={{ width: `${clampedProgress}%` }}
        />

        {/* Иконка */}
        <div ref={iconRef} className={styles.iconCont}>
          <Icon24GearOutline width={24} height={24} color={isIconReached ? 'black' : '#B2B2B2'} />
        </div>

        {/* Текст */}
        <div
          ref={textRef}
          className={`${styles.progressText} ${isTextReached ? styles.textReached : ''}`}
        >
          {displayText}
        </div>
      </div>

      {/* Остальные иконки */}
      <div className={styles.icons}>
          <div className={styles.iconWrapper}>
            <Icon20ListAddOutline width={24} height={24} fill='#76787A'/>
          </div>
          <div className={styles.iconWrapper}>
            <Icon20CalendarOutline width={24} height={24} fill='#76787A'/>
          </div>
          <div className={styles.iconWrapper}>
            <Icon16WrenchOutline width={24} height={24} fill='#76787A'/>
          </div>
      </div>
    </div>)}


    {/* Condition part */}

    {type === 'Condition' && (<div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
            <Icon24GearOutline width={24} height={24} />
          </div>
      <div className={styles.progressContainer}>
        {/* Прогресс-бар */}
        <div
          ref={progressRef}
          className={styles.progressBar}
          style={{ width: `${clampedProgress}%` }}
        />

        {/* Иконка */}
        <div ref={iconRef} className={styles.iconCont}>
          <Icon20ListAddOutline width={24} height={24} color={isIconReached ? 'black' : '#B2B2B2'} />
        </div>

        {/* Текст */}
        <div
          ref={textRef}
          className={`${styles.progressText} ${isTextReached ? styles.textReached : ''}`}
        >
          {displayText}
        </div>
      </div>

      {/* Остальные иконки */}
      <div className={styles.icons}>
          <div className={styles.iconWrapper}>
            <Icon20CalendarOutline width={24} height={24} fill='#76787A'/>
          </div>
          <div className={styles.iconWrapper}>
            <Icon16WrenchOutline width={24} height={24} fill='#76787A'/>
          </div>
      </div>
    </div>)}


    {/* DateTime part */}

    {type === 'DateTime' && (<div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
            <Icon24GearOutline width={24} height={24} />
          </div>
          <div className={styles.iconWrapper}>
            <Icon20ListAddOutline width={24} height={24} />
          </div>
      <div className={styles.progressContainer}>
        {/* Прогресс-бар */}
        <div
          ref={progressRef}
          className={styles.progressBar}
          style={{ width: `${clampedProgress}%` }}
        />

        {/* Иконка */}
        <div ref={iconRef} className={styles.iconCont}>
          <Icon20CalendarOutline width={24} height={24} color={isIconReached ? 'black' : '#B2B2B2'} />
        </div>

        {/* Текст */}
        <div
          ref={textRef}
          className={`${styles.progressText} ${isTextReached ? styles.textReached : ''}`}
        >
          {displayText}
        </div>
      </div>

      {/* Остальные иконки */}
      <div className={styles.icons}>
          <div className={styles.iconWrapper}>
            <Icon16WrenchOutline width={24} height={24} fill='#76787A'/>
          </div>
      </div>
    </div>)}


    {/* Addons part */}

    {type === 'Addons' && (<div className={styles.wrapper}>
        <div className={styles.iconWrapper}>
            <Icon24GearOutline width={24} height={24} />
          </div>
          <div className={styles.iconWrapper}>
            <Icon20ListAddOutline width={24} height={24} />
          </div>
          <div className={styles.iconWrapper}>
            <Icon20CalendarOutline width={24} height={24} />
          </div>
      <div className={styles.progressContainer}>
        {/* Прогресс-бар */}
        <div
          ref={progressRef}
          className={styles.progressBar}
          style={{ width: `${clampedProgress}%` }}
        />

        {/* Иконка */}
        <div ref={iconRef} className={styles.iconCont}>
          <Icon16WrenchOutline width={22} height={22} color={isIconReached ? 'black' : '#B2B2B2'} />
        </div>

        {/* Текст */}
        <div
          ref={textRef}
          className={`${styles.progressText} ${isTextReached ? styles.textReached : ''}`}
        >
            {displayText}
        </div>
      </div>

      {/* Остальные иконки */}
      <div className={styles.icons}>
      </div>
    </div>)}
    </>
  );
};

export default ProgressBadge;