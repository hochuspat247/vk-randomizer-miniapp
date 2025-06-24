import React from 'react';
import styles from './Community.module.css';
import CommunityCard from '@components/CommunityCard/CommunityCard';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import { Icon24ChevronLeft } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useCommunity } from '@hooks/useCommunity';

interface CommuniytProps {
  id: string;
}

const Community: React.FC<CommuniytProps> = ({ id }) => {
  const router = useRouteNavigator();
  const { communities, loading, error } = useCommunity();

  const activeCommunities = communities.filter(community => community.status === 'green');
  const inactiveCommunities = communities.filter(community => community.status !== 'green');

  if (loading) {
    return (
      <Panel id={id}>
        <PanelHeader>
          <span className={styles.headerText}>Сообщества</span>
        </PanelHeader>
        <div className={styles.container}>
          <div>Загрузка сообществ...</div>
        </div>
      </Panel>
    );
  }

  if (error) {
    return (
      <Panel id={id}>
        <PanelHeader>
          <span className={styles.headerText}>Сообщества</span>
        </PanelHeader>
        <div className={styles.container}>
          <div>Ошибка: {error}</div>
        </div>
      </Panel>
    );
  }

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
                    <CommunityCard key={community.id} {...community} />
                ))}
            </div>

            <div className={styles.actCommunity}>
                <span className={styles.title}>Неактивные сообщества</span>
                
                {inactiveCommunities.map(community => (
                    <CommunityCard key={community.id} {...community} />
                ))}
            </div>
        </div>
    </Panel>
  );
};

export default Community;