// src/components/NotificationCard/NotificationCard.tsx
import React, { useRef, useEffect, useState } from 'react';
import styles from './NotificationCard.module.css';

import gold from "@assets/images/Gold.png";
import CircleIcon from '@assets/icons/CircleIcon';
import { Icon16DeleteOutline, Icon16LinkOutline } from '@vkontakte/icons';
import ErrorBannerIcon from '@assets/icons/ErrorBannerIcon';

import {
  NEW,
  Raffle_NotificationCard,
  Completed_NotificationCard,
  ResultsPublished,
  At,
  PleaseTryAgain,
  ConnectionAfterTime
} from "@constants/Texts/NotificationCardText";
import { declOfNum } from '@/panels/CreateRaffle/utils/declension';

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
  participantsCount = 0,
  winners = [],
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

  // Склонение участников
  const participantsLabel = declOfNum(participantsCount, ['человек', 'человека', 'человек']);
// Специальное склонение для "победитель" — 1 vs >1
const winnersLabel = winners.length === 1 ? 'Победитель' : 'Победители';

  return (
    <div className={styles.container}>
      <div className={styles.notificationCont}>
        <div className={styles.notificationContL}>
          {isNew && (
            <div className={styles.ContLNew}>
              <span>{NEW}</span>
            </div>
          )}

          <div className={styles.ContTexts}>
            {type === 'warning' &&  (
              <div className={styles.warningTitle}>{warningTitle}</div>
            )}

            {type === 'error' && (
              <div ref={titleRef} className={styles.errorTitle}>{errorTitle}</div>
            )}

            {type === 'completed' && (
              <div className={raffleEndClass}>
                <span>{Raffle_NotificationCard}</span>
                <span className={raffleIdClass}>{raffleId}</span>
                <span>{Completed_NotificationCard}</span>
              </div>
            )}

            <div className={styles.otherInfo}>
              <div className={styles.raffleEndInfo}>
                {type === 'warning' && warningDescription?.map((text, i) => (
                  <div key={i} className={styles.warningText}>{text}</div>
                ))}

                {type === 'error' && errorDescription && (
                  <div
                    style={{ width: titleWidth ? `${titleWidth}px` : 'auto' }}
                    className={styles.errorText}
                  >{errorDescription}</div>
                )}

                {type === 'completed' && (
                  <>
                    <div className={styles.reason}>{reasonEnd}</div>
                    <div className={styles.participants}>
                      Приняли участие: {participantsCount} {participantsLabel}
                    </div>
                    <div className={styles.published}>{ResultsPublished}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.notificationContR}>
          {type !== 'completed' ? (
            <>
              <div className={styles.IconCont}><CircleIcon/></div>
              <div className={styles.IconCont}><Icon16DeleteOutline/></div>
            </>
          ) : (
            <>
              <div className={styles.IconCont}><Icon16LinkOutline/></div>
              <div className={styles.IconCont}><Icon16DeleteOutline/></div>
            </>
          )}
        </div>
      </div>

      {type === 'completed' && (
        <div className={styles.goldCont}>
          <img className={styles.goldImg} src={gold} alt='gold' />
        </div>
      )}

      {type === 'completed' && winners.length > 0 && (
        <div className={styles.winnersCont}>
          <span className={styles.winnersText}>{winnersLabel}:</span>
          <div className={styles.winners}>
            {winners.map((winner, i) => (
              <div key={i} onClick={() => window.open(`https://vk.com/${winner}`, '_blank')} className={styles.winnerBadge}>
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
            {PleaseTryAgain}<br/>{ConnectionAfterTime}
          </span>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
