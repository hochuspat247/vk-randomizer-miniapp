import React from 'react';
import styles from './BigResults.module.css';
import { Icon16Flag } from '@vkontakte/icons';
import { Icon20Users3 } from '@vkontakte/icons';
import { Icon20RecentOutline } from '@vkontakte/icons';
import { CrownResultIcon } from '@/assets/icons/CrownResultIcon';
import DefaultAvatar from '@/assets/images/persik.png';


interface Winner {
  rank: number;
  name: string;
  avatarUrl: string;
}

interface BigResultsProps {
  date: string;            // например "18.04.2025"
  participants: number;    // например 5000
  duration: string;        // например "7 дней"
  winners: Winner[];       // список победителей
}

export const BigResults: React.FC<BigResultsProps> = ({
  date,
  participants,
  duration,
  winners
}) => {

    const title = winners.length === 1
    ? 'Победитель розыгрыша'
    : 'Победители розыгрыша';

    const isThreeWinners = winners.length === 3 ;

  return (
    <div className={styles.container}>
      {/* Статистика сверху */}
      <div className={styles.stats}>
        <div className={styles.statsItem}>
          <Icon16Flag />
          <span>{date}</span>
        </div>
        <div className={styles.statsItem}>
          <Icon20Users3 />
          <span>{participants.toLocaleString()}</span>
        </div>
        <div className={styles.statsItem}>
          <Icon20RecentOutline />
          <span>{duration}</span>
        </div>
      </div>

      {/* Заголовок */}
      <span className={styles.title}>
        {title}
      </span>

      {/* Блок победителей */}
      <div className={styles.winners}>
        {winners.map(w => (
          <div key={w.rank} className={`${styles.winner} ${isThreeWinners && w.rank === 2 ? styles.secondWithGap : ""}`}>
                <div className={`${styles.avatarWrapper}`}>
                    <img 
                        src={w.avatarUrl} 
                        alt={w.name} 
                        className={styles.avatar} 
                        onError={e => {
                            // при ошибке загрузки подставляем локальную заглушку
                            const img = e.currentTarget;
                            img.onerror = null;
                            img.src = DefaultAvatar;
                        }}
                    />
                    <div className={styles.crown}>
                        <CrownResultIcon />
                    </div>
                    <div className={styles.rankBadge}>{w.rank}</div>
                </div>
                <span className={styles.nickname}>
                    {w.name}
                </span>
            </div>
        ))}
      </div>
    </div>
  );
};
