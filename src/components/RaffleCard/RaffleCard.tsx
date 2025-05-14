import React, {useState} from 'react';
import styles from './RaffleCard.module.css'; // Подключаем CSS модуль

import {Raffle_Id }from "../../constants/Text"
import RaffleState from '../RaffleState/RaffleState';
import { Icon20Users3Outline } from '@vkontakte/icons';
import UserCheckIcon from '../../assets/icons/UserCheckIcon';
import { Icon16Dropdown, Icon16DropdownFlipped } from '@vkontakte/icons';
import NestedCommunityCard from '../NestedCommunityCard/NestedCommunityCard';

interface RaffleCardProps {
    raffleId: string;
    name: string;
    status: 'active'; // Статус розыгрыша
    textRaffleState: string;
    winnersCount: number;
    mode: 'time' | 'members' | 'both';
    memberCount?: string;
    timeLeft?: string;
    progress: number; // от 0 до 100
    lastModified: string; // Пример: '14.10.2025 21:31'
    modifiedBy: string;   // Пример: 'Администратор'
    statusСommunity: 'connected' | 'notConfig' | 'error';

    statusNestedCard: 'green' | 'yellow' | 'red' | 'undefined'; // Зеленый - успешно, Желтый - нужно право, Красный - ошибка, Undefined - неизвестно
    statusNestedText: string;
    nickname: string;
    membersCountNested: string;
    adminType: string,
}

const statusCommunityTextMap: Record<string, string> = {
    connected: 'подключено',
    notConfig: 'не подключено',
    error: 'ошибка',
  };
  

const RaffleCard: React.FC<RaffleCardProps> = ({
    raffleId,
    name,
    status,
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
            return (<div className={styles.note}>*выбран режим завершения по <span className={styles.noteBold}>времени</span></div>);
          case 'members':
            return (<div className={styles.note}>*выбран режим завершения по <span className={styles.noteBold}>max</span>количеству человек</div>);
          case 'both':
            return (<div className={styles.note}>*выбран режим завершения по <span className={styles.noteBold}>времени</span> и по <span className={styles.noteBold}>max</span> количеству человек</div>);
        }
      };

    const clamp = (value: number): number => Math.min(Math.max(Math.round(value), 0), 100);

    const [expanded, setExpanded] = useState(true);
    const toggleExpand = () => setExpanded(!expanded);


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
            <RaffleState status={status} text={textRaffleState} />
        </div>
        <div className={styles.badges}>
            <div className={styles.badge}>
                <Icon20Users3Outline width={10} height={10} />
                <span className={styles.text}>{winnersCount} победителей</span>
            </div>
            <div className={styles.badge}>
                <UserCheckIcon  />
                <span className={styles.text}>подписки</span>
            </div>
        </div>
        <div className={styles.panelEnd}>
            <div className={styles.endCont}>
                <div className={styles.title}>до завершения*</div>
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
                <button className={styles.btnRes}>Подвести итоги</button>
                <span className={styles.hint}>←  Можно завершить уже сейчас!</span>
            </div>
        </div>

        <div className={styles.wrapper}>
            <button className={styles.editButton}>Изменить условия</button>
            <div className={styles.metaText}>
                Последнее изменение: {lastModified} – {modifiedBy}
            </div>
        </div>

        <div className={styles.buttonOpenCont}>
            <div className={styles.communityStatCont}>
                <span className={styles.label}>Сообщество:</span>
                <span className={`${styles.statusBadge} ${styles[statusСommunity]}`}>
                    {statusCommunityTextMap[statusСommunity]}
                </span>
            </div>
            <button onClick={toggleExpand} className={styles.toggleBtn}>
                {expanded ? 'Свернуть' : 'Развернуть'}
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
