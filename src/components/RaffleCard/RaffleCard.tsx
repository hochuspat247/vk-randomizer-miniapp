import React, { useState, useEffect } from 'react';
import styles from './RaffleCard.module.css';
import RaffleState from '../RaffleState/RaffleState';
import NestedCommunityCard from '../NestedCommunityCard/NestedCommunityCard';
import { Icon20Users3Outline, Icon16Dropdown, Icon16DropdownFlipped } from '@vkontakte/icons';

import {
  Raffle_Id,
  LAST_EDIT,
  COMMUNITY_LABEL,
  MODE_TIME,
  MODE_MEMBERS,
  MODE_BOTH,
  SUBSCRIPTION_LABEL,
  FINISH_TITLE,
  FINISH_NOW_HINT,
  EDIT_CONDITIONS,
  COLLAPSE,
  EXPAND
} from '@constants/Texts/RaffleCardText';
import { declOfNum } from '@/panels/CreateRaffle/utils/declension';
import UserCheckIcon from '@/assets/icons/UserCheckIcon';
import { router } from '@/routes';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { nestedCommunityApi, NestedCommunityCard as NestedCommunityCardType } from '@/api/nestedCommunity';
import { Spinner } from '@vkontakte/vkui';

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
  
  // VK enrichment
  vkStatus?: 'connected' | 'notConfig' | 'error';
  vkGroup?: {
    id: number;
    name: string;
    screen_name: string;
    photo_200?: string;
    members_count: number;
  };
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
  memberCount = '0',
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
  vkStatus,
  vkGroup,
}) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouteNavigator(); 

  // --- Nested community card fetch ---
  const [nestedCard, setNestedCard] = useState<NestedCommunityCardType | null>(null);
  const [nestedLoading, setNestedLoading] = useState(false);
  const [nestedError, setNestedError] = useState<string | null>(null);

  useEffect(() => {
    if (!expanded) return;
    setNestedLoading(true);
    setNestedError(null);
    nestedCommunityApi.getCommunityByNickname(nickname)
      .then(card => {
        setNestedCard(card);
      })
      .catch(e => setNestedError(e.message || 'Ошибка загрузки'))
      .finally(() => setNestedLoading(false));
  }, [expanded, nickname]);
  // --- End nested fetch ---

  // Используем VK статус для отображения, если доступен
  const displayStatus = vkStatus || statusСommunity;
  const displayStatusText = statusCommunityTextMap[displayStatus] || statusCommunityTextMap[statusСommunity];

  const renderBadgesPE = () => {
    switch (mode) {
      case 'time':
        return (
          <div className={styles.badgesPE}>
            <div className={styles.badgePE}>{timeLeft}</div>
          </div>
        );
      case 'members': {
        const n = Number(memberCount) || 0;
        const label = declOfNum(n, ['участник', 'участника', 'участников']);
        return (
          <div className={styles.badgesPE}>
            <div className={styles.badgePE}>
              <span className={styles.badgePEText}>{n} {label}</span>
            </div>
          </div>
        );
      }
      case 'both': {
        const n = Number(memberCount) || 0;
        const label = declOfNum(n, ['участник', 'участника', 'участников']);
        return (
          <div className={styles.badgesPE}>
            <div className={styles.badgePE}>
              <span className={styles.badgePEText}>{n} {label}</span>
            </div>
            <span className={styles.slash}>/</span>
            <div className={styles.badgePE}>{timeLeft}</div>
          </div>
        );
      }
    }
  };

  const renderNote = () => {
    switch (mode) {
      case 'time':
        return <div className={styles.note}>*{MODE_TIME}</div>;
      case 'members':
        return <div className={styles.note}>*{MODE_MEMBERS}</div>;
      case 'both':
        return <div className={styles.note}>*{MODE_BOTH}</div>;
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
          <span className={styles.text}>
            {winnersCount} {declOfNum(winnersCount, ['победитель', 'победителя', 'победителей'])}
          </span>
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
            <div
              className={styles.progressFill}
              style={{ width: `${clamp(progress)}%` }}
            />
          </div>
          <div className={styles.noteCont}>{renderNote()}</div>
        </div>

        <div className={styles.footer}>
          <button type="button" onClick={() => {router.push('/resultspanel')}} className={styles.btnRes}>Подвести итоги</button>
          <span className={styles.hint}>{FINISH_NOW_HINT}</span>
        </div>
      </div>

      <div className={styles.wrapper}>
        <button type="button" onClick={() => {router.push(`/editraffle/${raffleId}`)}} className={styles.editButton}>{EDIT_CONDITIONS}</button>
        <div className={styles.metaText}>
          {LAST_EDIT}: {lastModified} – {modifiedBy}
        </div>
      </div>

      <div className={styles.buttonOpenCont}>
        <div className={styles.communityStatCont}>
          <span className={styles.label}>{COMMUNITY_LABEL}</span>
          <span className={`${styles.statusBadge} ${styles[displayStatus]}`}>
            {displayStatusText}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={styles.toggleBtn}
        >
          {expanded ? COLLAPSE : EXPAND}
          {expanded ? <Icon16DropdownFlipped /> : <Icon16Dropdown />}
        </button>
      </div>

      {expanded && (
        <div style={{ marginTop: 12 }}>
          {nestedLoading && <Spinner size="s" />}
          {nestedError && <div style={{ color: 'red', padding: 8 }}>{nestedError}</div>}
          {nestedCard && (
            <NestedCommunityCard
              name={nestedCard.name}
              nickname={nestedCard.nickname}
              status={nestedCard.status === null || nestedCard.status === undefined ? undefined : nestedCard.status}
              statusText={nestedCard.statusText}
              membersCount={nestedCard.membersCount}
              adminType={nestedCard.adminType}
              avatarUrl={nestedCard.avatarUrl}
            />
          )}
          {!nestedLoading && !nestedError && !nestedCard && (
            <div style={{ color: '#999', padding: 8 }}>Нет данных о вложенном сообществе</div>
          )}
        </div>
      )}
    </div>
  );
};

export default RaffleCard;