import React from 'react';
import styles from './CommunityCard.module.css';

import {
  Icon20Users3Outline,
  Icon20DiamondOutline,
  Icon20GearOutline,
  Icon20PinOutline,
  Icon20HelpOutline,
  Icon20MegaphoneOutline,
} from '@vkontakte/icons';

import { ADMIN, OWNER, RAFFLE, Change_Widget } from '../../constants/Texts/CommunityCardText';
import { getRoleDisplayName } from '@/utils/vkTransformers';

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
import { declOfNum } from '@/panels/CreateRaffle/utils/declension';

interface CommunityCardProps {
  membersCount: string;
  raffleCount: string;
  adminType: 'owner' | 'admin' | 'editor' | 'moderator' | 'member' | 'advertiser';
  avatarUrl: string;
  status: 'green' | 'yellow' | 'red';
  name: string;
  nickname: string;
  buttonDesc: string;
  stateText: string;
}

// Функция для получения иконки роли
function getRoleIcon(role: 'owner' | 'admin' | 'editor' | 'moderator' | 'member' | 'advertiser') {
  switch (role) {
    case 'owner':
      return <Icon20DiamondOutline className={styles.icon} />;
    case 'admin':
      return <Crown />;
    case 'editor':
      return <Icon20PinOutline className={styles.icon} />;
    case 'moderator':
      return <Icon20HelpOutline className={styles.icon} />;
    case 'advertiser':
      return <Icon20MegaphoneOutline className={styles.icon} />;
    case 'member':
      return <Icon20Users3Outline className={styles.icon} />;
    default:
      return <Icon20Users3Outline className={styles.icon} />;
  }
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  membersCount,
  raffleCount,
  adminType,
  avatarUrl,
  status, 
  name, 
  nickname,
  buttonDesc,
  stateText
}) => {

  const containerClasses = [
    styles.container,
    status === 'yellow' && styles.containerYellow,
    status === 'red' && styles.containerRed,
  ].filter(Boolean).join(' ');

  const rafflesNum = Number(raffleCount) || 0;
  const rafflesLabel = declOfNum(rafflesNum, ['розыгрыш', 'розыгрыша', 'розыгрышей']);
  
  return (
    <div className={containerClasses}>
      <div className={styles.badges}>
        {/* MEMBERS */}
        <div className={styles.badge}> 
          <Icon20Users3Outline className={styles.icon} /> {/* Иконка колличества участников */}
          <span className={styles.text}>{membersCount}</span>
        </div>

        {/* ROLE */}
        <div className={styles.badge}>
          {getRoleIcon(adminType)}
          <span className={styles.text}>
            {getRoleDisplayName(adminType)}
          </span>
        </div>

        {/* RAFFLES */}
        <div className={styles.badge}>
          <span className={styles.text}>{rafflesNum}</span>
          <span className={styles.text}>{rafflesLabel}</span>
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
            <span 
              className={styles.nickname}   
              onClick={() => window.open(`https://vk.com/${nickname}`, '_blank')}
            >
              {nickname}
            </span>
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
          {/* <WidgetStatusBadge status={status} text={stateText}/> */}
          <WidgetStatusBadge status={status} text={stateText}/>
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
