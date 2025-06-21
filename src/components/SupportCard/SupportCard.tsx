// src/components/SupportCard/SupportCard.tsx
import React from 'react';
import styles from './SupportCard.module.css';
import { Icon20LifebuoyOutline } from '@vkontakte/icons';

import spiralSupport from '@assets/images/261.png';
import spiralGuide from '@assets/images/Image Container.png';
import spiralAdmin from '@assets/images/260.png';

interface SupportCardProps {
  variant: 'support' | 'guide' | 'adminOwner';
}

const SupportCard: React.FC<SupportCardProps> = ({ variant }) => {
  let title: React.ReactNode;
  let description: React.ReactNode;
  let buttonText: string;
  let spiralSrc: string;
  let spiralAlt: string;
  let onButtonClick: () => void;

  switch (variant) {
    case 'support':
      title = 'Возникли трудности?';
      description = (
        <>
          Напишите в службу поддержки —<br/>
          поможем разобраться, подскажем<br/>
          и быстро решим ваш вопрос.
        </>
      );
      buttonText    = 'Служба поддержки';
      spiralSrc     = spiralSupport;
      spiralAlt     = 'спираль поддержки';
      onButtonClick = () => console.log('Открываем поддержку');
      break;

    case 'guide':
      title = 'Что умеет приложение?';
      description = (
        <>
          В пару кликов создавайте<br/>
          розыгрыши в VK, настраивайте<br/>
          условия, добавляйте виджеты<br/>
          и автоматически выбирайте<br/>
          победителей.
        </>
      );
      buttonText    = 'Гайд по использованию';
      spiralSrc     = spiralGuide;
      spiralAlt     = 'спираль гида';
      onButtonClick = () => console.log('Старт гида');
      break;

    case 'adminOwner':
      title = (
        <>
          Вы администратор или<br/>
          владелец сообщества?
        </>
      );
      description = (
        <>
            В пару кликов создавайте <br/>
            собственные розыгрыши в VK, <br/>
            настраивайте условия участия, <br/>
            добавляйте умные виджеты приложенияи <br/>
            автоматически выбирайте победителей.
        </>
      );
      buttonText    = 'Написать администратору';
      spiralSrc     = spiralAdmin;
      spiralAlt     = 'спираль админа';
      onButtonClick = () => console.log('Переход к админу');
      break;

    default:
      // Этот блок никогда не выполнится на runtime, но нужен для TS
      throw new Error(`Unknown variant: ${variant}`);
  }

  return (
    <div className={`${styles.supportCard} ${styles[variant]}`}>
      <div className={styles.supportCardTop}>
        <div className={styles.supportCardText}>
          <span className={styles.supportCardTitle}>{title}</span>
          <span className={styles.supportCardDescription}>{description}</span>
        </div>
        <img
          className={`${styles.spiral} ${styles[variant]}`}
          src={spiralSrc}
          alt={spiralAlt}
        />
      </div>
      <button
        type="button"
        className={styles.supportButton}
        onClick={onButtonClick}
      >
        {variant === 'support' && (
          <Icon20LifebuoyOutline fill="#D4F94E" />
        )}
        <span className={styles.supportButtonText}>{buttonText}</span>
      </button>
    </div>
  );
};

export default SupportCard;