import React, { useState } from 'react';
import styles from './RaffleCard.module.css';

import {
  Raffle_Id,
  LAST_EDIT,
  COMMUNITY_LABEL,
  MODE_TIME,
  MODE_MEMBERS,
  MODE_BOTH,
  WINNERS_LABEL,
  SUBSCRIPTION_LABEL,
  FINISH_TITLE,
  FINISH_NOW_HINT,
  EDIT_CONDITIONS,
  COLLAPSE,
  EXPAND
} from '../../constants/Texts/RaffleCardText';

import RaffleState from '../RaffleState/RaffleState';
import NestedCommunityCard from '../NestedCommunityCard/NestedCommunityCard';

import { Icon20Users3Outline, Icon16Dropdown, Icon16DropdownFlipped } from '@vkontakte/icons';
import UserCheckIcon from '../../assets/icons/UserCheckIcon';

interface RaffleCardProps {
  raffleId: string;
  name: string;
  textRaffleState: string;
  winnersCount: number;
  mode: 'time' | 'members' | 'both';
  memberCount?: string;
  timeLeft?: string;
  progress: number;
  lastModified: string;
  modifiedBy: string;
  statusСommunity: 'connected' | 'notConfig' | 'error';

  // Nested
  statusNestedCard: 'green' | 'yellow' | 'red' | undefined;
  statusNestedText: string;
  nickname: string;
  membersCountNested: string;
  adminType: 'admin' | 'owner';
}

const statusCommunityTextMap: Record<RaffleCardProps['statusСommunity'], string> = {
  connected: 'подключено',
  notConfig: 'не настроено',
  error: 'ошибка',
};

const clamp = (value: number): number => Math.min(Math.max(Math.round(value), 0), 100);

const RaffleCard: React.FC<RaffleCardProps> = ({
  raffleId,
  name,
  textRaffleState,
  winnersCount,
  mode,
  memberCount = '',
  timeLeft = '',
  progress,
  lastModified,
  modifiedBy,
  statusСommunity,
  statusNestedCard,
  statusNestedText,
  nickname,
  membersCountNested,
  adminType,
}) => {
  const [expanded, setExpanded] = useState(true);

  const renderBadgesPE = () => {
    switch (mode) {
      case 'time':
        return (
          <div className={styles.badgesPE}>
            <div className={styles.badgePE}>{timeLeft}</div>
          </div>
        );
      case 'members':
        return (
          <div className={styles.badgesPE}>
            <div className={styles.badgePE}>
              <span className={styles.badgePEText}>{memberCount} ЧЕЛОВЕК</span>
            </div>
          </div>
        );
      case 'both':
        return (
          <div className={styles.badgesPE}>
            <div className={styles.badgePE}>
              <span className={styles.badgePEText}>{memberCount} ЧЕЛОВЕК</span>
            </div>
            <span className={styles.slash}>/</span>
            <div className={styles.badgePE}>{timeLeft}</div>
          </div>
        );
    }
  };

  const renderNote = () => {
    switch (mode) {
      case 'time':
        return (
          <div className={styles.note}>
            *{MODE_TIME}
          </div>
        );
      case 'members':
        return (
          <div className={styles.note}>
            *{MODE_MEMBERS}
          </div>
        );
      case 'both':
        return (
          <div className={styles.note}>
            *{MODE_BOTH}
          </div>
        );
    }
  };

  return (
    <div className={styles.raffleCard}>
      <div className={styles.raffle}>
        <div className={styles.raffleL}>
          <div className={styles.raffleTextCont}>
            <span className={styles.raffleText}>{Raffle_Id}</span>
            <span className={styles.raffleId}>{raffleId}</span>
          </div>
          <span className={styles.name}>{name}</span>
        </div>
        <RaffleState status='active' text={textRaffleState} />
      </div>

      <div className={styles.badges}>
        <div className={styles.badge}>
          <Icon20Users3Outline width={10} height={10} />
          <span className={styles.text}>{winnersCount} {WINNERS_LABEL}</span>
        </div>
        <div className={styles.badge}>
          <UserCheckIcon />
          <span className={styles.text}>{SUBSCRIPTION_LABEL}</span>
        </div>
      </div>

      <div className={styles.panelEnd}>
        <div className={styles.endCont}>
          <div className={styles.title}>{FINISH_TITLE}</div>
          {renderBadgesPE()}
        </div>

        <div className={styles.progressBarCont}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${clamp(progress)}%` }} />
          </div>
          <div className={styles.noteCont}>{renderNote()}</div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.btnRes}>Подвести итоги</button>
          <span className={styles.hint}>{FINISH_NOW_HINT}</span>
        </div>
      </div>

      <div className={styles.wrapper}>
        <button type="button" className={styles.editButton}>{EDIT_CONDITIONS}</button>
        <div className={styles.metaText}>
          {LAST_EDIT}: {lastModified} – {modifiedBy}
        </div>
      </div>

      <div className={styles.buttonOpenCont}>
        <div className={styles.communityStatCont}>
          <span className={styles.label}>{COMMUNITY_LABEL}</span>
          <span className={`${styles.statusBadge} ${styles[statusСommunity]}`}>
            {statusCommunityTextMap[statusСommunity]}
          </span>
        </div>
        <button type="button" onClick={() => setExpanded(!expanded)} className={styles.toggleBtn}>
          {expanded ? COLLAPSE : EXPAND}
          {expanded ? <Icon16DropdownFlipped /> : <Icon16Dropdown />}
        </button>
      </div>

      {expanded && (
        <NestedCommunityCard
          name={name}
          nickname={nickname}
          status={statusNestedCard}
          statusText={statusNestedText}
          membersCount={membersCountNested}
          adminType={adminType}
        />
      )}
    </div>
  );
};

export default RaffleCard;
