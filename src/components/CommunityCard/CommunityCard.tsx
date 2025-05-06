import React from 'react';
import styles from './CommunityCard.module.css';


import {
  Icon20Users3Outline,
  Icon20DiamondOutline,
} from '@vkontakte/icons';

import crown from '../../assets/icons/crown_16.svg';
import lockG from "../../assets/icons/lock_circle_fill_blue_16.svg"
import lockY from "../../assets/icons/lock_circle_fill_blue_16 (1).svg"
import lockR from "../../assets/icons/lock_circle_fill_blue_16 (2).svg"
import arrowRAct from "../../assets/icons/Icon.svg"
import arrowRNoact from "../../assets/icons/Icon (1).svg"
import gearsNoact from "../../assets/icons/gear_outline_20.svg"
import gearsAct from "../../assets/icons/gear_outline_20 (1).svg"
import WidgetStatusBadge from '../WidgetStatusBadge/WidgetStatusBadge';
import BadgeIcon from '../BadgeIcon/BadgeIcon';
import update from "../../assets/icons/ArrowsClockwise.svg"


import { Icon16DeleteOutline, Icon24CupOutline  } from '@vkontakte/icons';



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
  return (
    <div className={`${styles.container} ${
      status === 'yellow'
        ? styles.containerYellow
        : status === 'red'
        ? styles.containerRed
        : ''
    }`}>
      <div className={styles.badges}>
        {/* MEMBERS */}
        <div className={styles.badge}>
          <Icon20Users3Outline className={styles.icon} />
          <span className={styles.text}>{membersCount}</span>
        </div>

        {/* ADMIN / OWNER */}
        <div className={styles.badge}>
          {adminType === 'admin' ? (
            <img src={crown} className={styles.icon} alt="crown" />
          ) : (
            <Icon20DiamondOutline className={styles.icon} />
          )}
          <span className={styles.text}>
            {adminType === 'admin' ? 'АДМИН' : 'ВЛАДЕЛЕЦ'}
          </span>
        </div>

        {/* RAFFLES */}
        <div className={styles.badge}>
          <span className={styles.text}>{raffleCount}</span>
          <span className={styles.text}>РОЗЫГРЫША</span>
        </div>
      </div>

      {/* Аватар с замком */}
      <button className={styles.avatarCont}>
        {/* <div className={styles.avatar}> */}
          <div
            className={styles.avatarImg}
            style={{ background: `url(${avatarUrl}) lightgray 50% / cover no-repeat` }}
          >
            <div
              className={styles.lockIcon}
              // style={{ backgroundColor: statusColor[status] }}
            >
              {status === 'green' && <img src={lockG}/>}
              {status === 'yellow' && <img src={lockY} />}
              {status === 'red' && <img src={lockR} />}
            </div>
          </div>
          <div className={styles.avatarInfo}>
            <span className={styles.name}>{name}</span>
            <span className={styles.nickname}>{nickname}</span>
          </div>
        {/* </div> */}
        <img src={status !== "green" ? arrowRNoact : arrowRAct}/>
      </button>
      
      <div className={styles.changeWidgetCont}>
        <button className={`${styles.changeWidget} ${status === 'green' ? styles.activeButton : styles.inactiveButton}`}>
            <img src={status !== "green" ? gearsNoact : gearsAct}/>
            <span className={styles.CWtext}>Изменить виджет</span>
        </button>
        <span className={styles.CWtext2}>{buttonDesc}</span>
      </div>
      
      <div className={styles.WidgetStatusCont}>
        <div className={styles.WidgetStatusLpart}>
          <WidgetStatusBadge status={status} text="Виджет не добавлен"/>
          <img src={update} />
        </div>
        <div className={styles.IconCont}>
          <BadgeIcon icon={<Icon24CupOutline  />} />
          <BadgeIcon icon={<Icon16DeleteOutline />} />
        </div>
      </div>
    </div>
  );
};


export default CommunityCard;
