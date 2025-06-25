import React from 'react';
import styles from './Raffles.module.css';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Panel, PanelHeader, Spinner } from '@vkontakte/vkui';
import {Icon24ChevronLeft } from '@vkontakte/icons';
import FilterIcon from '../../assets/icons/FilterIcon';
import { useRaffleCards } from '@/hooks/useRaffleCards';
import { useRaffleCarouselCards } from '@/hooks/useRaffleCarouselCards';
import RaffleCard from '../../components/RaffleCard/RaffleCard';
import RaffleCarouselCard from '../../components/RaffleCarouselCard/RaffleCarouselCard';

import SupportCard from '@/components/SupportCard/SupportCard';

interface RafflesProps {
  id: string;
}

const Raffles: React.FC<RafflesProps> = ({ id }) => {

const router = useRouteNavigator();
const { data: raffles, loading, error } = useRaffleCards();
const { data: carouselCards, loading: carouselLoading, error: carouselError } = useRaffleCarouselCards();

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
                    {carouselLoading && <Spinner size="s" />}
                    {carouselError && <div style={{ color: 'red', padding: 8 }}>{carouselError}</div>}
                    {!carouselLoading && !carouselError && carouselCards && carouselCards
                        .filter(raffle => 
                            raffle.status === 'resultsWhite' || 
                            raffle.status === 'results'
                        )
                        .map((raffle) => (
                            <RaffleCarouselCard
                                key={raffle.raffleId}
                                {...raffle}
                            />
                        ))
                    }
                </div>
                    <div className={styles.backgroud}></div>
                </div>

                    <div className={styles.rafflesMini}>
                        <span className={styles.completedText}>Неактивные</span>
                        {carouselLoading && <Spinner size="s" />}
                        {carouselError && <div style={{ color: 'red', padding: 8 }}>{carouselError}</div>}
                        {!carouselLoading && !carouselError && carouselCards && carouselCards
                            .filter(raffle => 
                                raffle.status === 'draft' || 
                                raffle.status === 'pending' ||
                                raffle.status === 'deleted'
                            )
                            .map((raffle) => (
                                <RaffleCarouselCard
                                    key={raffle.raffleId}
                                    {...raffle}
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