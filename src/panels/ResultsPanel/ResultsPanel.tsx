// src/panels/ResultsPanel/ResultsPanel.tsx
import React from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
} from '@vkontakte/vkui';
import { Icon24ChevronLeft } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import CommunityBanner, {
  CommunityBannerProps,
} from '@/components/CommunityBanner/CommunityBanner';
import { BigResults, BigResultsProps } from '@/components/BigResults/BigResults';
import { MiniResults, Participant } from '@/components/MiniResults/MiniResults';
import DefaultAvatar from '@/assets/images/persik.png';

import styles from './ResultsPanel.module.css';

export interface ResultsPanelProps {
  id: string;
  /** Данные для баннера сообщества */
  bannerData?: Omit<CommunityBannerProps, 'onClick'> & { onClick: () => void };
  /** Дата проведения */
  date?: string;
  /** Общее число участников */
  participantsCount?: number;
  /** Длительность */
  duration?: string;
  /** Список победителей */
  winners?: BigResultsProps['winners'];
  /** Полный список участников */
  participants?: Participant[];
  idResults?: string;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  id,
  bannerData,
  date,
  participantsCount,
  duration,
  winners,
  idResults='492850',
  participants,
}) => {
  const router = useRouteNavigator();

  // Подставляем «моковые» данные, если props не переданы:
  const banner = bannerData ?? {
    avatarUrl: undefined,
    name: 'Москва 24 — Новости',
    adminType: 'Владелец',
    onClick: () => {
      /* например, переход в сообщество */
      router.push('/community');
    },
  };

  const drawDate = date ?? '18.04.2025';
  const drawParticipants = participantsCount ?? 4997;
  const drawDuration = duration ?? '7 дней';

  const drawWinners: BigResultsProps['winners'] = winners ??
    [
      { rank: 1, name: '@mariyana492', avatarUrl: DefaultAvatar },
      { rank: 2, name: '@ivan_petrov',   avatarUrl: DefaultAvatar },
      { rank: 3, name: '@ivan_petrov',   avatarUrl: DefaultAvatar },
    //   { rank: 3, name: '@ivan_petrov',   avatarUrl: DefaultAvatar },
    ];

  const drawParticipantsList: Participant[] = participants ??
    [
      { id: '1', name: 'Mikhail Likhachyov', avatarUrl: DefaultAvatar },
      { id: '2', name: 'Alexey Zaycev',       avatarUrl: DefaultAvatar },
      { id: '3', name: 'Danila Kropotkin',    avatarUrl: DefaultAvatar },
      { id: '4', name: 'Ivan Baryshev',       avatarUrl: DefaultAvatar },
       { id: '1', name: 'Mikhail Likhachyov', avatarUrl: DefaultAvatar },
      { id: '2', name: 'Alexey Zaycev',       avatarUrl: DefaultAvatar },
      { id: '3', name: 'Danila Kropotkin',    avatarUrl: DefaultAvatar },
      { id: '4', name: 'Ivan Baryshev',       avatarUrl: DefaultAvatar },
    ];

  // Если победителей не больше 3 — рисуем BigResults, иначе mini
  const showBig = drawWinners.length <= 3;

  return (
    <Panel id={id} className={styles.panel}>
      <PanelHeader
        before={
            <Icon24ChevronLeft fill="#D4F94E" onClick={() => router.back()}/>
        }
        className={styles.header}
      >
        <PanelHeaderContent className={styles.headerContent}>
          Итоги {idResults}
        </PanelHeaderContent>
      </PanelHeader>

      <div className={styles.body}>
        {/* Баннер сообщества */}
        <CommunityBanner
          avatarUrl={banner.avatarUrl}
          name={banner.name}
          adminType={banner.adminType}
          onClick={banner.onClick}
        />

        <div className={styles.divider} />

        {/* Основной блок с победителями */}
        {showBig ? (
          <BigResults
            date={drawDate}
            participants={drawParticipants}
            duration={drawDuration}
            winners={drawWinners}
          />
        ) : (
          <div className={styles.miniSection1}>
            <MiniResults
              participants={drawWinners.map(w => ({
                id: String(w.rank),
                name: w.name,
                avatarUrl: w.avatarUrl,
              }))}
            />
          </div>
        )}

        <div className={styles.divider} />

        {/* Список всех участников */}
        <div className={styles.miniSection2}>
          <MiniResults participants={drawParticipantsList} />
        </div>
      </div>
    </Panel>
  );
};

export default ResultsPanel;
