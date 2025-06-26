import React from 'react';
import styles from './Raffles.module.css';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Panel, PanelHeader, Spinner } from '@vkontakte/vkui';
import {Icon24ChevronLeft } from '@vkontakte/icons';
import FilterIcon from '../../assets/icons/FilterIcon';
import { useRaffleCards, EnrichedRaffleCard } from '@/hooks/useRaffleCards';
import RaffleCard from '../../components/RaffleCard/RaffleCard';
import RaffleCarouselCard from '../../components/RaffleCarouselCard/RaffleCarouselCard';

import SupportCard from '@/components/SupportCard/SupportCard';

interface RafflesProps {
  id: string;
}

const Raffles: React.FC<RafflesProps> = ({ id }) => {

const router = useRouteNavigator();
const { data: raffles, loading, error } = useRaffleCards();

// Маппинг RaffleCard -> RaffleCarouselCardProps
function mapRaffleToCarouselCardProps(raffle: EnrichedRaffleCard) {
  let status: 'active' | 'pending' | 'results' | 'resultsWhite' | 'deleted' | 'draft' | 'completed' = 'active';
  if (raffle.statusNestedCard === 'green') status = 'active';
  else if (raffle.statusNestedCard === 'yellow') status = 'pending';
  else if (raffle.statusNestedCard === 'red') status = 'deleted';
  return {
    raffleId: raffle.raffleId,
    name: raffle.name,
    status,
    stateText: raffle.statusNestedText,
    members: raffle.membersCountNested,
    endDate: raffle.timeLeft || '',
    updatedAt: raffle.lastModified || '',
  };
}

  return (
     <Panel id={id}>
        <PanelHeader
            before={
                <div onClick={() => router.back()} >
                    <Icon24ChevronLeft fill=' #D4F94E'/>
                </div> }
             
        >
            <span className={styles.headerText}>Розыгрышы</span>
          </PanelHeader>

        <div className={styles.container}>
            <button type='button' className={styles.filterButton}>
                <FilterIcon />
                <span className={styles.filterText}>Фильтр</span>
            </button>
            <div className={styles.rafflesCont}>
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
                    <Spinner size="m" />
                  </div>
                )}
                {error && (
                  <div style={{ color: 'red', textAlign: 'center', padding: 24 }}>{error}</div>
                )}
                {!loading && !error && raffles && raffles.map((raffle) => (
                    <RaffleCard
                    key={raffle.raffleId}
                    {...raffle}
                    />
                ))}

                <div className={styles.rafflesMiniCont}>
                <div className={styles.rafflesMini}>
                    <span className={styles.completedText}>Завершенные</span>
                    {loading && <Spinner size="s" />}
                    {error && <div style={{ color: 'red', padding: 8 }}>{error}</div>}
                    {!loading && !error && raffles && raffles
                        .filter(raffle => raffle.statusNestedCard === 'green')
                        .sort((a, b) => {
                          const dateA = new Date(a.lastModified).getTime();
                          const dateB = new Date(b.lastModified).getTime();
                          return dateB - dateA;
                        })
                        .map((raffle) => (
                            <RaffleCarouselCard
                                key={raffle.raffleId}
                                {...mapRaffleToCarouselCardProps(raffle)}
                            />
                        ))
                    }
                </div>
                    <div className={styles.backgroud}></div>
                </div>

                    <div className={styles.rafflesMini}>
                        <span className={styles.completedText}>Неактивные</span>
                        {loading && <Spinner size="s" />}
                        {error && <div style={{ color: 'red', padding: 8 }}>{error}</div>}
                        {!loading && !error && raffles && raffles
                            .filter(raffle => raffle.statusNestedCard === 'red' || raffle.statusNestedCard === 'yellow')
                            .map((raffle) => (
                                <RaffleCarouselCard
                                    key={raffle.raffleId}
                                    {...mapRaffleToCarouselCardProps(raffle)}
                                />
                            ))
                        }
                    </div>

                <SupportCard variant='support'/>
            </div>
        </div>
    </Panel>
  );
};

export default Raffles; 