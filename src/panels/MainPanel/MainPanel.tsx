// src/panels/MainPanel/MainPanel.tsx
import React, { useEffect, useState } from 'react';
import { Panel, Div, Spinner } from '@vkontakte/vkui';

import MainHeader         from '@/components/MainHeader/MainHeader';
import { ToggleSwitch }   from '@/components/ToggleSwitch/ToggleSwitch';
import SupportCard        from '@/components/SupportCard/SupportCard';
import CarouselCard       from '@/components/CarouselCard/CarouselCard';

import { useCommunities, useActiveCommunities } from '@/api/hooks';
import { useRaffleCards } from '@/hooks/useRaffleCards';
import { notificationsApi } from '@/api/notifications';
import { VKApi } from '@/api/vkApi';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import styles from './MainPanel.module.css';
import CommunityModalWrapper from '@/components/CommunityModalWrapper/CommunityModalWrapper';
import NotificationCard from '@/components/NotificationCard/NotificationCard';
import { CommunityBanner } from '@/types/community';
import { getRoleDisplayName } from '@/utils/vkTransformers';

export type MainTab = 'main' | 'notifications';

export interface MainPanelProps {
  id: string;
  initialTab?: MainTab;
}

const MainPanel: React.FC<MainPanelProps> = ({ id, initialTab = 'main' }) => {
  const [isMainTab, setIsMainTab] = useState(initialTab === 'main');
  const [showModal, setShowModal] = useState(false);              // ← управляем показом
  const routeNavigator = useRouteNavigator();
  const { data: communities, refresh } = useCommunities();
  const { activeIds } = useActiveCommunities();
  const { data: raffles, loading: carouselLoading, error: carouselError } = useRaffleCards();
  const [notifications, setNotifications] = useState<any[] | null>(null);
  const [notifLoading, setNotifLoading] = useState(true);
  const [notifError, setNotifError] = useState<string | null>(null);
  const [communityBanners, setCommunityBanners] = useState<CommunityBanner[]>([]);

  // Получаем баннеры сообществ с правильными ролями
  useEffect(() => {
    if (communities) {
      const filtered = communities.filter(c => activeIds.includes(c.id));
      const banners: CommunityBanner[] = filtered.map(community => ({
        avatarUrl: community.avatarUrl,
        name: community.name,
        adminType: getRoleDisplayName(community.adminType)
      }));
      setCommunityBanners(banners);
      console.log('Обновлены баннеры сообществ:', {
        totalCommunities: communities.length,
        activeIds: activeIds.length,
        filteredCount: filtered.length,
        banners: banners.length
      });
    }
  }, [communities, activeIds]);

  useEffect(() => {
    notificationsApi.getNotifications()
      .then(setNotifications)
      .catch(e => setNotifError(e.message || 'Ошибка загрузки'))
      .finally(() => setNotifLoading(false));
  }, []);

  useEffect(() => {
    console.log('showModal changed:', showModal);
  }, [showModal]);

  // Обработчик закрытия модального окна с обновлением данных
  const handleModalClose = async () => {
    console.log('Закрытие модального окна, начинаем обновление данных...');
    setShowModal(false);
    
    // Очищаем кэш VK API для получения свежих данных
    VKApi.clearCombinedCache();
    console.log('Кэш VK API очищен');
    
    // Небольшая задержка для очистки кэша
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Обновляем данные сообществ после закрытия модального окна
    console.log('Обновляем данные сообществ...');
    await refresh();
    console.log('Данные сообществ обновлены');
    
    // Принудительно обновляем компонент для пересчета communityBanners
    setCommunityBanners(prev => [...prev]);
    console.log('Компонент принудительно обновлен');
  };

  // Маппинг RaffleCard -> RaffleCarouselCardProps
  function mapRaffleToCarouselCardProps(raffle: any) {
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
      <MainHeader />

      {/* Переключатель вкладок */}
      <div className={styles.toggleSwitch}>
        <ToggleSwitch
          variant="main"
          checked={isMainTab}
          onChange={setIsMainTab}
          label=""
        />
      </div>

      {/* Контент */}
      <Div>
        {isMainTab ? (
          <div className={styles.scrollWrapper}>
            {/* Гайд */}
            <div className={styles.stickySection}>
              <SupportCard variant="guide" />
            </div>

            {/* Карусель розыгрышей */}
            <div className={styles.stickySection}>
              {carouselLoading && <Spinner size="s" />}
              {carouselError && <div style={{ color: 'red', padding: 8 }}>{carouselError}</div>}
              {!carouselLoading && !carouselError && (
                <CarouselCard
                  title="Мои розыгрыши"
                  buttonPlus="Добавить"
                  button="Смотреть все"
                  variant="raffle"
                  raffleItems={(raffles || []).sort((a, b) => {
                    const dateA = new Date(a.lastModified).getTime();
                    const dateB = new Date(b.lastModified).getTime();
                    return dateB - dateA;
                  }).map(mapRaffleToCarouselCardProps)}
                  buttonPlusOnClick={() => routeNavigator.push('/createRaffle')}
                  buttonOnClick={() => routeNavigator.push('/raffles')}
                />
              )}
            </div>

            {/* Карусель сообществ */}
            <div className={styles.stickySection}>
              <CarouselCard
                title="Мои сообщества"
                buttonPlus="Добавить"
                button="Смотреть все"
                variant="community"
                communityItems={communityBanners}
                buttonPlusOnClick={() => setShowModal(true)}      // ← открываем модалку
                buttonOnClick={() => routeNavigator.push('/community')}
              />
            </div>

            {/* Карточка поддержки */}
            <div className={styles.stickySection}>
              <SupportCard variant="support" />
            </div>
          </div>
        ) : (
          <div className={styles.groupNotif}>
            {notifLoading && <Spinner size="s" />}
            {notifError && <div style={{ color: 'red', padding: 8 }}>{notifError}</div>}
            {!notifLoading && !notifError && notifications && notifications.map((item, idx) => (
              <NotificationCard key={idx} {...item} />
            ))}
          </div>
        )}
      </Div>

      {/* ===== Модалка (перекрывает весь экран) ===== */}
      {showModal && (
        <CommunityModalWrapper onClose={handleModalClose} />
      )}
    </Panel>
  );
};

export default MainPanel;
