import React from 'react';
import styles from './RaffleCarouselCard.module.css';
import { Icon16Flag, Icon16PenOutline  } from '@vkontakte/icons';

import RaffleState from '../RaffleState/RaffleState';
import { Raffle_Id, Change_CarouselCard } from '@constants/Texts/RaffleCarouselCardText';
import BadgeIcon from '../BadgeIcon/BadgeIcon';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

interface RaffleCarouselCardProps {
  raffleId: string;
  name: string;
  status: 'active' | 'pending' | "results" | "resultsWhite" | 'deleted' | "draft" | "completed";
  stateText: string;
  members: string;
  endDate: string; //format "14.10 21:31"
  updatedAt: string; //format "14.10.2025 21:31"
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
  const router = useRouteNavigator();
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/editraffle/${raffleId}`);
  };
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
            <div className={styles.updated}>{Change_CarouselCard}<br />{updatedAt}</div>
        </div>

        <div className={styles.actions}>
          <BadgeIcon icon={<Icon16Flag />} />
          <BadgeIcon icon={<Icon16PenOutline onClick={handleEdit} />} />
        </div>
      </div>
    </div>
  );
};

export default RaffleCarouselCard;
