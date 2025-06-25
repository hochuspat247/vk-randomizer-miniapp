import React from 'react';
import styles from './Community.module.css';
import CommunityCard from '@components/CommunityCard/CommunityCard';
import { useCommunities } from '@/api/hooks';
import { Panel, PanelHeader, Spinner, Button } from '@vkontakte/vkui';
import { Icon24ChevronLeft, Icon24Refresh } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { CommunityCard as CommunityCardType } from '@/types/community';

interface CommuniytProps {
  id: string;
}

const Community: React.FC<CommuniytProps> = ({ id }) => {
  const router = useRouteNavigator();
  const { data: communities, loading, error, refetch } = useCommunities();

  const activeCommunities = communities?.filter(community => community.status === 'green') || [];
  const inactiveCommunities = communities?.filter(community => community.status !== 'green') || [];

  const handleRefresh = () => {
    refetch();
  };

  if (loading) {
    return (
      <Panel id={id}>
        <PanelHeader>
          <span className={styles.headerText}>Сообщества</span>
        </PanelHeader>
        <div className={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Spinner size="m" />
          </div>
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
          <div style={{ 
            padding: '20px', 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ color: '#FF3B30', fontSize: '16px', fontWeight: '500' }}>
              {error}
            </div>
            <Button 
              mode="secondary" 
              onClick={handleRefresh}
              before={<Icon24Refresh />}
            >
              Попробовать снова
            </Button>
          </div>
        </div>
      </Panel>
    );
  }

  // Проверяем, есть ли вообще сообщества
  const hasCommunities = communities && communities.length > 0;

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
            {!hasCommunities ? (
              <div style={{ 
                padding: '20px', 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ fontSize: '16px', color: '#666' }}>
                  У вас нет сообществ, где вы являетесь администратором
                </div>
                <Button 
                  mode="secondary" 
                  onClick={handleRefresh}
                  before={<Icon24Refresh />}
                >
                  Обновить
                </Button>
              </div>
            ) : (
              <>
                {activeCommunities.length > 0 && (
                  <div className={styles.actCommunity}>
                    <span className={styles.title}>Активные сообщества</span>
                    
                    {activeCommunities.map((community: CommunityCardType) => (
                        <CommunityCard key={community.id} {...community} />
                    ))}
                  </div>
                )}

                {inactiveCommunities.length > 0 && (
                  <div className={styles.actCommunity}>
                    <span className={styles.title}>Неактивные сообщества</span>
                    
                    {inactiveCommunities.map((community: CommunityCardType) => (
                        <CommunityCard key={community.id} {...community} />
                    ))}
                  </div>
                )}
              </>
            )}
        </div>
    </Panel>
  );
};

export default Community;