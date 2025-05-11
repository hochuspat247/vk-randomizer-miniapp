import React from 'react';
import styles from './CommunityCard.module.css';

import {
  Icon20Users3Outline,
  Icon20DiamondOutline,
  Icon20GearOutline,
} from '@vkontakte/icons';

import { ADMIN, OWNER, RAFFLE, Change_Widget } from '../../constants/Text';

import WidgetStatusBadge from '../WidgetStatusBadge/WidgetStatusBadge';
import BadgeIcon from '../BadgeIcon/BadgeIcon';

import { Icon16DeleteOutline, Icon24CupOutline  } from '@vkontakte/icons';
import Crown from '../../assets/icons/Crown';
import LockG from '../../assets/icons/LockG';
import LockY from '../../assets/icons/LockY';
import LockR from '../../assets/icons/LockR';
import ArrowRNoact from '../../assets/icons/ArrowRNoact';
import ArrowRAct from '../../assets/icons/ArrowRAct';
import Update from '../../assets/icons/Update';



interface CommunityCardProps {
  membersCount: string;
  raffleCount: string;
  adminType: 'admin' | 'owner';
  avatarUrl: string;
  status: 'green' | 'yellow' | 'red';
  name: string;
  nickname: string;
  buttonDesc: string;
  
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  membersCount,
  raffleCount,
  adminType,
  avatarUrl,
  status, 
  name, 
  nickname,
  buttonDesc
}) => {

  const containerClasses = [
    styles.container,
    status === 'yellow' && styles.containerYellow,
    status === 'red' && styles.containerRed,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={containerClasses}>
      <div className={styles.badges}>
        {/* MEMBERS */}
        <div className={styles.badge}> 
          <Icon20Users3Outline className={styles.icon} /> {/* Иконка колличества участников */}
          <span className={styles.text}>{membersCount}</span>
        </div>

        {/* ADMIN / OWNER */}
        <div className={styles.badge}>
          {adminType === 'admin' ? (
            <>
            <Crown /> {/* Иконка админа */}
            </>
          ) : (
            <>
            <Icon20DiamondOutline className={styles.icon} /> {/* Иконка владельца */}
            </>
          )}
          <span className={styles.text}>
            {adminType === 'admin' ? ADMIN : OWNER}
          </span>
        </div>

        {/* RAFFLES */}
        <div className={styles.badge}>
          <span className={styles.text}>{raffleCount}</span>
          <span className={styles.text}>{RAFFLE}</span>
        </div>
      </div>

      {/* Аватар с замком */}
      <button type='button' className={styles.avatarCont}>
          <div
            className={styles.avatarImg}
            style={{ ['--avatar-url' as any]: `url(${avatarUrl})` }}
            >
            <div
              className={styles.lockIcon}
            >
              {status === 'green' && <LockG/>} {/* Иконка зеленного замка */}
              {status === 'yellow' && <LockY/>} {/* Иконка желтого замка */}
              {status === 'red' && <LockR/>} {/* Иконка красного замка */}
            </div>
          </div>
          <div className={styles.avatarInfo}>
            <span className={styles.name}>{name}</span>
            <span className={styles.nickname}>{nickname}</span>
          </div>
        {/* </div> */}
        {status !== "green" ? <ArrowRNoact /> : <ArrowRAct />} {/* Иконки неактивной и активной чтрелок */}
      </button>
      
      <div className={styles.changeWidgetCont}>
        <button 
          type='button' 
          className={`${styles.changeWidget} ${status === 'green' ? styles.activeButton : styles.inactiveButton}`}
          disabled={status !== 'green'}
          >
            {status !== "green" ? <Icon20GearOutline /> : <Icon20GearOutline />} {/* Иконки неактивной и активной шестеренки */}
            <span className={styles.CWtext}>{Change_Widget}</span>
        </button>
        <span className={styles.CWtext2}>{buttonDesc}</span>
      </div>
      
      <div className={styles.WidgetStatusCont}>
        <div className={styles.WidgetStatusLpart}>
          <WidgetStatusBadge status={status} text="Виджет не добавлен"/>
          <Update />
        </div>
        <div className={styles.IconCont}>
          <BadgeIcon icon={<Icon24CupOutline  />} /> {/* Иконка кубка */}
          <BadgeIcon icon={<Icon16DeleteOutline />} /> {/* Иконка удаления */}
        </div>
      </div>
    </div>
  );
};


export default CommunityCard;
