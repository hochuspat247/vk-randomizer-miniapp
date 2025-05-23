import React, { useRef, useEffect, useState } from 'react';
import styles from './NotificationCard.module.css';

import gold from "../../assets/images/Gold.png";
import CircleIcon from '../../assets/icons/CircleIcon';

import { Icon16DeleteOutline } from '@vkontakte/icons';
import { Icon16LinkOutline } from '@vkontakte/icons';
import ErrorBannerIcon from '../../assets/icons/ErrorBannerIcon';
import {
  NEW, 
  Raffle_NotificationCard, 
  Completed_NotificationCard,
  ParticipantCountText,
  PeopleText,
  ResultsPublished,
  Winners_NotificationCard,
  At,
  PleaseTryAgain,
  ConnectionAfterTime
} from "../../constants/Texts/NotificationCardText"

interface NotificationCardProps {
    type: 'warning' | 'completed' | 'error';
    raffleId?: number;
    participantsCount?: number;
    winners?: string[];
    reasonEnd?: string;
    new?: boolean;
    warningTitle?: string;
    warningDescription?: string[];
    errorTitle?: string;
    errorDescription?: string;
  }
  

const NotificationCard: React.FC<NotificationCardProps> = ({
  type,
  raffleId,
  participantsCount,
  winners,
  reasonEnd,
  new: isNew,
  warningTitle,
  warningDescription,
  errorTitle,
  errorDescription
}) => {

    const raffleEndClass = [
        styles.raffleEnd,
        !isNew && styles.inactive
    ].filter(Boolean).join(' ');
    
    const raffleIdClass = [
        styles.raffleId,
        !isNew && styles.inactive
    ].filter(Boolean).join(' ');

    const titleRef = useRef<HTMLDivElement>(null);
    const [titleWidth, setTitleWidth] = useState<number | null>(null);

    useEffect(() => {
        if (titleRef.current) {
            setTitleWidth(titleRef.current.offsetWidth);
        }
    }, [errorTitle]);

  return (
    <div className={styles.container}>
      <div className={styles.notificationCont}>
        <div className={styles.notificationContL}>
          {/* Бейдж NEW */}
          {isNew && (
            <div className={styles.ContLNew}>
              <span>{NEW}</span>
            </div>
          )}

            <div className={styles.ContTexts}>
                {/* Заголовок */}
                {type === 'warning' &&  (<div className={styles.warningTitle}>{warningTitle}</div>)}
                {type === 'error' && (<div ref={titleRef} className={styles.errorTitle}>{errorTitle}</div>)}
                {type === 'completed' && (
                    <div className={raffleEndClass}>
                        <span>{Raffle_NotificationCard}</span> 
                        <span className={raffleIdClass}>{raffleId}</span>
                        <span>{Completed_NotificationCard}</span>
                    </div>
                )}

                {/* Описание */}
                <div className={styles.otherInfo}>
                    <div className={styles.raffleEndInfo}>
                    {type === 'warning' && warningDescription?.length > 0 &&
                        warningDescription.map((text, index) => (
                        <div key={index} className={styles.warningText}>{text}</div>
                        ))
                    }

                    {type === 'error' && errorDescription && (
                        <div style={{ width: titleWidth ? `${titleWidth}px` : 'auto' }} className={styles.errorText}>{errorDescription}</div>
                    )}

                    {type === "completed" && (
                        <>
                        <div className={styles.reason}>{reasonEnd}</div>
                        <div className={styles.participants}>
                            {ParticipantCountText} {participantsCount} {PeopleText}
                        </div>
                        <div className={styles.published}>{ResultsPublished}</div>
                        </>
                    )}
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.notificationContR}>
          {/* Иконка зависит от типа */}
          {type !== 'completed' ? (
            <>
              <div className={styles.IconCont}><CircleIcon/></div> {/* Иконка круга */}
              <div className={styles.IconCont}><Icon16DeleteOutline/></div> {/* Иконка удаления */}
            </>
            ) : (
            <>
              <div className={styles.IconCont}><Icon16LinkOutline/></div> {/* Иконка стрелки */}
              <div className={styles.IconCont}><Icon16DeleteOutline/></div> {/* Иконка удаления */}

            </>
          )}
        </div>
      </div>

      {/* Изображение золота — только если completed */}
      {type === 'completed' && (
        <div className={styles.goldCont}>
          <img className={styles.goldImg} src={gold} alt='gold' />
        </div>
      )}

      {/* Плашка победителей — только если completed */}
      {type === 'completed' && winners && winners.length > 0 && (
        <div className={styles.winnersCont}>
          <span className={styles.winnersText}>{Winners_NotificationCard}</span>
          <div className={styles.winners}>
            {winners.map((winner, index) => (
              <div key={index} className={styles.winnerBadge}>
                {At}{winner}
              </div>
            ))}
          </div>
        </div>
      )}

        {type === 'error' && (
        <div className={styles.errorBanner}>
            <span className={styles.errorBannerIcon}><ErrorBannerIcon/></span>
            <span className={styles.errorBannerText}>
            {PleaseTryAgain} <br/> {ConnectionAfterTime}
            </span>
        </div>
        )}

    </div>
  );
};

export default NotificationCard;
