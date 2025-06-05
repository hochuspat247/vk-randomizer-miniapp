import React from 'react';
import RaffleCarouselCard from '@components/RaffleCarouselCard/RaffleCarouselCard';
import RaffleCarouselCardMocks from '@mocks/RaffleCarouselCardMocks';
import styles from '../Raffles.module.css';

type RaffleStatus = 'active' | 'pending' | 'draft' | 'results' | 'deleted' | 'resultsWhite' | 'completed';

export const ActiveRaffles: React.FC = () => {
  return (
    <div className={styles.rafflesMini}>
      <span className={styles.completedText}>Активные</span>
      {RaffleCarouselCardMocks
        .filter(raffle => raffle.status === 'active' as RaffleStatus)
        .map((raffle) => (
          <RaffleCarouselCard
            key={raffle.raffleId}
            raffleId={raffle.raffleId}
            name={raffle.name}
            status={raffle.status as RaffleStatus}
            stateText={raffle.stateText}
            members={raffle.members}
            endDate={raffle.endDate}
            updatedAt={raffle.updatedAt}
          />
        ))
      }
    </div>
  );
}; 