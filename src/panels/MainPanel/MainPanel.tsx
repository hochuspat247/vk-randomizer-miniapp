// src/panels/MainPanel/MainPanel.tsx
import React, { useEffect, useState } from 'react';
import { Panel, Div } from '@vkontakte/vkui';

import MainHeader         from '@/components/MainHeader/MainHeader';
import { ToggleSwitch }   from '@/components/ToggleSwitch/ToggleSwitch';
import SupportCard        from '@/components/SupportCard/SupportCard';
import CarouselCard       from '@/components/CarouselCard/CarouselCard';

import RaffleCarouselCardMocks   from '@/mocks/RaffleCarouselCardMocks';
import CommunityBannerMocks      from '@/mocks/CommunityBannerMocks';

import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import styles from './MainPanel.module.css';
import CommunityModalWrapper from '@/components/CommunityModalWrapper/CommunityModalWrapper';
import NotificationCardMocks from '@/mocks/NotificationCardMocks';
import NotificationCard from '@/components/NotificationCard/NotificationCard';

export type MainTab = 'main' | 'notifications';

export interface MainPanelProps {
  id: string;
  initialTab?: MainTab;
}

const MainPanel: React.FC<MainPanelProps> = ({ id, initialTab = 'main' }) => {
  const [isMainTab, setIsMainTab] = useState(initialTab === 'main');
  const [showModal, setShowModal] = useState(false);              // ← управляем показом
  const routeNavigator = useRouteNavigator();

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
              <CarouselCard
                title="Мои розыгрыши"
                buttonPlus="Добавить"
                button="Смотреть все"
                variant="raffle"
                raffleItems={RaffleCarouselCardMocks}
                buttonPlusOnClick={() => routeNavigator.push('/createRaffle')}
                buttonOnClick={() => routeNavigator.push('/raffles')}
              />
            </div>

            {/* Карусель сообществ */}
            <div className={styles.stickySection}>
              <CarouselCard
                title="Мои сообщества"
                buttonPlus="Добавить"
                button="Смотреть все"
                variant="community"
                communityItems={CommunityBannerMocks}
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
                {NotificationCardMocks.map((item, idx) => (
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
