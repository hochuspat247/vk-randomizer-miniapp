// src/components/SupportCard/SupportCard.tsx
import React from 'react';
import styles from './SupportCard.module.css';
import { Icon20LifebuoyOutline } from '@vkontakte/icons';

import { SupportTitle, SupportButton, SupportDesc, SupportAlt, GuideTitle, GuideDesc, GuideButton, GuideAlt, AdminOwnerTitle, AdminOwnerDesc, AdminOwnerButton, AdminOwnerAlt } from '@/constants/Texts/SupportCardText';

import spiralSupport from '@assets/images/261.png';
import spiralGuide from '@assets/images/Image Container.png';
import spiralAdmin from '@assets/images/260.png';
import { SupportCardProps } from './SupportCardTypes';

const SupportCard: React.FC<SupportCardProps> = ({ variant }) => {
  let title: React.ReactNode;
  let description: React.ReactNode;
  let buttonText: string;
  let spiralSrc: string;
  let spiralAlt: string;
  let onButtonClick: () => void;

  switch (variant) {
    case 'support':
      title = SupportTitle;
      description = SupportDesc
      buttonText    = SupportButton;
      spiralSrc     = spiralSupport;
      spiralAlt     = SupportAlt;
      onButtonClick = () => console.log('Открываем поддержку');
      break;

    case 'guide':
      title = GuideTitle;
      description = GuideDesc;
      buttonText    = GuideButton;
      spiralSrc     = spiralGuide;
      spiralAlt     = GuideAlt;
      onButtonClick = () => console.log('Старт гида');
      break;

    case 'adminOwner':
      title = AdminOwnerTitle;
      description = AdminOwnerDesc;
      buttonText    = AdminOwnerButton;
      spiralSrc     = spiralAdmin;
      spiralAlt     = AdminOwnerAlt;
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