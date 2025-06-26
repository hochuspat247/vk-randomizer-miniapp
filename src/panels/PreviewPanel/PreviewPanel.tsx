// src/components/PreviewPanel/PreviewPanel.tsx
import React, { useEffect, useState } from 'react';
import styles from './PreviewPanel.module.css';
import { Panel } from '@vkontakte/vkui';
import PreviewRaffle from '@/components/PreviewRaffle/PreviewRaffle';
import { useParams } from '@vkontakte/vk-mini-apps-router';
import { rafflesApi } from '@/api/raffle';
import { RaffleCard } from '@/types/raffle';
import persikImage from '@/assets/images/persik.png';
import { useCommunities } from '@/api/hooks';

export interface PreviewPanelProps {
  id: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ id }) => {
  const params = useParams();
  const raffleId = params?.id;
  const [raffle, setRaffle] = useState<RaffleCard | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: communities } = useCommunities();

  useEffect(() => {
    if (raffleId) {
      rafflesApi.getRaffleById(raffleId).then((data) => {
        setRaffle(data.raffle);
        setLoading(false);
      });
    }
  }, [raffleId]);

  if (loading) return <Panel id={id}><div className={styles.panelWrapper}>Загрузка...</div></Panel>;
  if (!raffle) return <Panel id={id}><div className={styles.panelWrapper}>Розыгрыш не найден</div></Panel>;

  // Всегда ищем нужное сообщество по id или nickname
  let comm = undefined;
  if (communities && raffle) {
    console.log('communities:', communities);
    console.log('raffle:', raffle);
    console.log('raffle.nickname:', raffle.nickname);
    const raffleNick = (raffle.nickname || '').replace(/^@/, '');
    console.log('raffleNick:', raffleNick);
    comm = communities.find(c => c.nickname === raffleNick);
    console.log('found comm:', comm);
  }

  const channelAvatarSrc = comm?.avatarUrl || 'https://vk.com/images/community_200.png';
  const channelName = comm?.name || raffle.nickname || 'Сообщество';
  const description = raffle.description || comm?.stateText || 'Описание недоступно';

  console.log('PreviewRaffle props:', {
    imageSrc: raffle.imageSrc || persikImage,
    channelAvatarSrc,
    channelName,
    description,
    endTime: raffle.endTime,
    raffleItem: raffle.name,
  });

  return (
    <Panel id={id}>
      <div className={styles.panelWrapper}>
        <PreviewRaffle
          imageSrc={raffle.imageSrc || persikImage}
          raffleItem={raffle.name}
          channelAvatarSrc={channelAvatarSrc}
          channelName={channelName}
          description={description}
          endTime={raffle.endTime || raffle.timeLeft || ''}
        />
      </div>
    </Panel>
  );
};

export default PreviewPanel;
