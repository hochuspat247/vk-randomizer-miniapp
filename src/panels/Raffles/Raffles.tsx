import React from 'react';
import styles from './Raffles.module.css';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import { Icon20LifebuoyOutline, Icon24ChevronLeft } from '@vkontakte/icons';
import FilterIcon from '../../assets/icons/FilterIcon';
import RaffleCardMocks from '../../mocks/RaffleCardMocks';
import RaffleCard from '../../components/RaffleCard/RaffleCard';
import RaffleCarouselCardMocks from '../../mocks/RaffleCarouselCardMocks';
import RaffleCarouselCard from '../../components/RaffleCarouselCard/RaffleCarouselCard';

import spiral from "../../assets/images/261.png" 

interface RafflesProps {
  id: string;
}

const router = useRouteNavigator

const Raffles: React.FC<RafflesProps> = ({ id }) => {


  return (
     <Panel id={id}>
        <PanelHeader
            before={
                <div onClick={() => router.popPage()} >
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
                {RaffleCardMocks.map((raffle) => (
                    <RaffleCard
                    key={raffle.raffleId}
                    raffleId={raffle.raffleId}
                    name={raffle.name}
                    textRaffleState={raffle.textRaffleState}
                    winnersCount={raffle.winnersCount}
                    mode={raffle.mode}
                    memberCount={raffle.memberCount}
                    timeLeft={raffle.timeLeft}
                    progress={raffle.progress}
                    lastModified={raffle.lastModified}
                    modifiedBy={raffle.modifiedBy}
                    statusСommunity={raffle.statusСommunity}
                    statusNestedCard={raffle.statusNestedCard}
                    statusNestedText={raffle.statusNestedText}
                    nickname={raffle.nickname}
                    membersCountNested={raffle.membersCountNested}
                    adminType={raffle.adminType}
                    />
                ))}

                <div className={styles.rafflesMiniCont}>
                <div className={styles.rafflesMini}>
                    <span className={styles.completedText}>Завершенные</span>
                    {RaffleCarouselCardMocks
                        .filter(raffle => 
                            raffle.status === 'resultsWhite' || 
                            raffle.status === 'results'
                        )
                        .map((raffle, index) => (
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
                    <div className={styles.backgroud}></div>
                </div>

                    <div className={styles.rafflesMini}>
                        <span className={styles.completedText}>Неактивные</span>
                        {RaffleCarouselCardMocks
                            .filter(raffle => 
                                raffle.status === 'draft' || 
                                raffle.status === 'pending' ||
                                raffle.status === 'deleted'
                            )
                            .map((raffle, index) => (
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

                <div className={styles.supportCard}>
                    <div className={styles.supportCardTop}>
                        <div className={styles.supportCardText}>
                            <span className={styles.supportCardTitle}>Возникли трудности?</span>
                            <span className={styles.supportCardtext}>Напишите в службу поддержки — <br/>
                                поможем разобраться, подскажем <br/>
                                и быстро решим ваш вопрос.
                            </span>
                        </div>
                        <img className={styles.spiral} src={spiral} alt='gold spiral'/>
                    </div>
                    <button className={styles.supportButton}>
                        <Icon20LifebuoyOutline fill='#D4F94E'/>
                        <span className={styles.supportButtonText}>Служба поддержки</span>
                    </button>
                </div>
                
            </div>
        </div>
    </Panel>
  );
};

export default Raffles; 