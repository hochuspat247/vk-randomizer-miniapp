import React from 'react';
import styles from './Community.module.css';
import CommunityCard from '@components/CommunityCard/CommunityCard';
import CommunityCardMocks from '@mocks/CommunityCardMocks';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import { Icon24ChevronLeft } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

interface CommuniytProps {
  id: string;
}

const Community: React.FC<CommuniytProps> = ({ id }) => {

    const router = useRouteNavigator();

  const activeCommunities = CommunityCardMocks.filter(community => community.status === 'green');
  const inactiveCommunities = CommunityCardMocks.filter(community => community.status !== 'green');

  return (
     <Panel id={id}>
        <PanelHeader
            before={
                <div onClick={() => router.back()} >
                    <Icon24ChevronLeft fill=' #D4F94E'/>
                </div> }
             
        >
            <span className={styles.headerText}>Сообщества</span>
          </PanelHeader>

        <div className={styles.container}>
            <div className={styles.actCommunity}>
                <span className={styles.title}>Активные сообщества</span>
                
                {activeCommunities.map(community => (
                    <CommunityCard {...community} />
                ))}
            </div>

            <div className={styles.actCommunity}>
                <span className={styles.title}>Неактивные сообщества</span>
                
                {inactiveCommunities.map(community => (
                    <CommunityCard {...community} />
                ))}
            </div>
        </div>
    </Panel>
  );
};

export default Community;