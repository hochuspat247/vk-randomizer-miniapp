import React from 'react';
import RaffleCarouselCard from '@components/RaffleCarouselCard/RaffleCarouselCard';
import RaffleCarouselCardMocks from '@mocks/RaffleCarouselCardMocks';
import styles from '../Raffles.module.css';

type RaffleStatus = 'active' | 'pending' | 'draft' | 'results' | 'deleted' | 'resultsWhite' | 'completed';

export const InactiveRaffles: React.FC = () => {
  return (
    <div className={styles.rafflesMini}>
      <span className={styles.completedText}>Неактивные</span>
      {RaffleCarouselCardMocks
        .filter(raffle => 
          raffle.status === 'draft' as RaffleStatus || 
          raffle.status === 'pending' as RaffleStatus ||
          raffle.status === 'deleted' as RaffleStatus
        )
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