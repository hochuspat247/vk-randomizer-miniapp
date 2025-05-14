import React from 'react';
import styles from './RaffleCarouselCard.module.css';
import { Icon16Flag, Icon16PenOutline  } from '@vkontakte/icons';

import RaffleState from '../RaffleState/RaffleState';
import { Raffle_Id } from '../../constants/Text';
import BadgeIcon from '../BadgeIcon/BadgeIcon';

interface RaffleCarouselCardProps {
  raffleId: string;
  name: string;
  status: 'active' | 'pending' | 'deleted' | 'draft';
  stateText: string;
  members: string;
  endDate: string;
  updatedAt: string;
}

const RaffleCarouselCard: React.FC<RaffleCarouselCardProps> = ({
  raffleId,
  name,
  status,
  stateText,
  members,
  endDate,
  updatedAt,
}) => {
  return (
    <div className={styles.card}>
      {/* Верхняя часть: Название + бейджи */}
      <div className={styles.cardTop}>
        <div className={styles.raffleL}>
            <div className={styles.raffleTextCont}>
            <span className={styles.raffleText}>{Raffle_Id}</span>
            <span className={styles.raffleId}>{raffleId}</span>
            </div>
            <span className={styles.name}>{name}</span>
        </div>

        {/* Правая часть с бейджами */}
        <div className={styles.rightBadges}>
            <div className={styles.badge}>{members}</div>
            <div className={styles.badge}>{endDate}</div>
        </div>
      </div>

      {/* Статус и обновление */}
      <div className={styles.footer}>
        <div className={styles.cont}>
            <RaffleState status={status} text={stateText} />
            <div className={styles.updated}>Изменено:<br />{updatedAt}</div>
        </div>

        <div className={styles.actions}>
          <BadgeIcon icon={<Icon16Flag />} />
          <BadgeIcon icon={<Icon16PenOutline />} />
        </div>
      </div>
    </div>
  );
};

export default RaffleCarouselCard;
