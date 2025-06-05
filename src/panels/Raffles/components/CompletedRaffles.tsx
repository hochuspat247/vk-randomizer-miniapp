import React from 'react';
import RaffleCarouselCard from '@components/RaffleCarouselCard/RaffleCarouselCard';
import RaffleCarouselCardMocks from '@mocks/RaffleCarouselCardMocks';
import styles from '../Raffles.module.css';

export const CompletedRaffles: React.FC = () => {
  return (
    <div className={styles.rafflesMini}>
      <span className={styles.completedText}>Завершенные</span>
      {RaffleCarouselCardMocks
        .filter(raffle => 
          raffle.status === 'resultsWhite' || 
          raffle.status === 'results'
        )
        .map((raffle) => (
          <RaffleCarouselCard
            key={raffle.raffleId}
            raffleId={raffle.raffleId}
            name={raffle.name}
            status={raffle.status}
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