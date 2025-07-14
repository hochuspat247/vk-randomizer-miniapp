// src/components/PreviewPanel/PreviewPanel.tsx
import React, { useEffect, useState } from 'react';
import styles from './PreviewPanel.module.css';
import { Panel, PanelHeader, PanelHeaderContent, Button } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PreviewRaffle from '@/components/PreviewRaffle/PreviewRaffle';
import { useParams } from '@vkontakte/vk-mini-apps-router';
import { rafflesApi } from '@/api/raffle';
import { RaffleCard } from '@/types/raffle';
import persikImage from '@/assets/images/persik.png';
import { useCommunities } from '@/api/hooks';
import BackIcon from '../../assets/icons/BackIcon';

export interface PreviewPanelProps {
  id: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ id }) => {
  const params = useParams();
  const nav = useRouteNavigator();
  const raffleId = params?.id;
  const [raffle, setRaffle] = useState<RaffleCard | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: communities } = useCommunities();

  useEffect(() => {
    if (raffleId) {
      rafflesApi.getRaffleById(raffleId).then((data) => {
        setRaffle(data.raffle || data);
        setLoading(false);
      });
    }
  }, [raffleId]);

  const handleBackToList = () => {
    // Переходим обратно к списку розыгрышей
    nav.push('/raffles');
  };

  if (loading) return (
    <Panel id={id}>
      <PanelHeader className={styles.panelHeaderOverride}>
        <PanelHeaderContent className={styles.panelHeaderContentOverride}>
          <span className={styles.panelHeaderText}>Загрузка...</span>
        </PanelHeaderContent>
      </PanelHeader>
      <div className={styles.panelWrapper}>Загрузка...</div>
    </Panel>
  );
  
  if (!raffle) return (
    <Panel id={id}>
      <PanelHeader className={styles.panelHeaderOverride}>
        <PanelHeaderContent className={styles.panelHeaderContentOverride}>
          <span className={styles.panelHeaderText}>Ошибка</span>
        </PanelHeaderContent>
      </PanelHeader>
      <div className={styles.panelWrapper}>Розыгрыш не найден</div>
    </Panel>
  );

  // Всегда ищем нужное сообщество по id
  const comm = communities?.find(c => String(c.id) === String((raffle as any).communityId || (raffle as any).community_id));

  // Описание: сначала contest_text, потом description, потом stateText, потом fallback
  const description = (raffle as any).contest_text || (raffle as any).description || comm?.stateText || 'Описание недоступно';

  // Дата окончания: пробуем все варианты
  const rawEndTime = (raffle as any).endTime || (raffle as any).end_date || (raffle as any).endDate || '';
  function formatDate(dateStr: string) {
    if (!dateStr) return 'Дата окончания не указана';
    const date = new Date(dateStr);
    return date.toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
  const endTime = formatDate(rawEndTime);

  const channelAvatarSrc = comm?.avatarUrl || 'https://vk.com/images/community_200.png';
  const channelName = comm?.name || 'Сообщество';

  // Выбираем фото для превью: если есть raffle.photos[0] — используем его, иначе persikImage
  const imageSrc = Array.isArray((raffle as any).photos) && (raffle as any).photos.length > 0
    ? (raffle as any).photos[0]
    : persikImage;

  // Подробный лог
  console.log('raffle:', raffle);
  console.log('communities:', communities);
  console.log('comm:', comm);
  console.log('PreviewRaffle props:', {
    imageSrc,
    raffleItem: raffle.name,
    channelAvatarSrc,
    channelName,
    description,
    endTime,
  });

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <div onClick={handleBackToList} className={styles.backIcon}>
            <BackIcon />
          </div>
        }
        className={styles.panelHeaderOverride}
      >
        <PanelHeaderContent className={styles.panelHeaderContentOverride}>
          <span className={styles.panelHeaderText}>Превью розыгрыша</span>
        </PanelHeaderContent>
      </PanelHeader>
      
      <div className={styles.panelWrapper}>
        <PreviewRaffle
          imageSrc={imageSrc}
          raffleItem={raffle.name}
          channelAvatarSrc={channelAvatarSrc}
          channelName={channelName}
          description={description}
          endTime={endTime}
        />
        
        <div style={{ padding: 16, textAlign: 'center' }}>
          <Button 
            size="l" 
            mode="primary" 
            onClick={handleBackToList}
            style={{ width: '100%', marginTop: 16 }}
          >
            Назад к списку розыгрышей
          </Button>
        </div>
      </div>
    </Panel>
  );
};

export default PreviewPanel;
