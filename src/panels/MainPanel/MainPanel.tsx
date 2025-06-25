// src/panels/MainPanel/MainPanel.tsx
import React, { useEffect, useState } from 'react';
import { Panel, Div, Spinner } from '@vkontakte/vkui';

import MainHeader         from '@/components/MainHeader/MainHeader';
import { ToggleSwitch }   from '@/components/ToggleSwitch/ToggleSwitch';
import SupportCard        from '@/components/SupportCard/SupportCard';
import CarouselCard       from '@/components/CarouselCard/CarouselCard';

import { useCommunities } from '@/api/hooks';
import { useRaffleCarouselCards } from '@/hooks/useRaffleCarouselCards';
import { notificationsApi } from '@/api/notifications';

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
  const { data: communities } = useCommunities();
  const { data: raffleCarouselCards, loading: carouselLoading, error: carouselError } = useRaffleCarouselCards();
  const [notifications, setNotifications] = useState<any[] | null>(null);
  const [notifLoading, setNotifLoading] = useState(true);
  const [notifError, setNotifError] = useState<string | null>(null);
  const [communityBanners, setCommunityBanners] = useState<CommunityBanner[]>([]);

  // Получаем баннеры сообществ с правильными ролями
  useEffect(() => {
    if (communities) {
      const banners: CommunityBanner[] = communities.map(community => ({
        avatarUrl: community.avatarUrl,
        name: community.name,
        adminType: getRoleDisplayName(community.adminType)
      }));
      setCommunityBanners(banners);
    }
  }, [communities]);

  useEffect(() => {
    notificationsApi.getNotifications()
      .then(setNotifications)
      .catch(e => setNotifError(e.message || 'Ошибка загрузки'))
      .finally(() => setNotifLoading(false));
  }, []);

  useEffect(() => {
  console.log('showModal changed:', showModal);
}, [showModal]);

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
                  raffleItems={raffleCarouselCards || []}
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
        <CommunityModalWrapper onClose={() => setShowModal(false)} />
      )}
    </Panel>
  );
};

export default MainPanel;
