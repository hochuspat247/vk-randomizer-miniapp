// src/components/CommunityModalCard/CommunityModalWrapper.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useCommunities, useActiveCommunities } from '@/api/hooks';
import { VKApi } from '@/api/vkApi';
import styles from './CommunityModalWrapper.module.css';
import CommunityModalCard from '../CommunityModalCard/CommunityModalCard';
import { communitiesApi } from '@/api/community';

interface Props {
  onClose: () => void;
}

const CommunityModalWrapper: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState<'select' | 'permission' | 'success'>('select');
  const [selected, setSelected] = useState('');
  const { data: communities, refetch, loading, error } = useCommunities();
  const { addCommunity } = useActiveCommunities();
  const [subscribers, setSubscribers] = useState<{ name: string; avatar: string }[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  // Получаем список опций для выбора (только названия сообществ)
  const options = communities?.map(c => c.name) || [];
  const selectedCommunity = communities?.find(c => c.name === selected);

  // Загружаем подписчиков при переходе на permission
  useEffect(() => {
    if (step === 'permission' && selectedCommunity) {
      setLoadingSubs(true);
      VKApi.getCommunityMembers(selectedCommunity.id)
        .then(setSubscribers)
        .finally(() => setLoadingSubs(false));
    }
  }, [step, selectedCommunity]);

  const handleSelectSubmit = () => {
    if (selectedCommunity) {
      setStep('permission');
    }
  };
  const handlePermissionAllow = async () => {
    if (selectedCommunity) {
      addCommunity(selectedCommunity.id);
      // Формируем карточку для БД
      const card = {
        id: selectedCommunity.id,
        name: selectedCommunity.name,
        nickname: selectedCommunity.nickname,
        membersCount: selectedCommunity.membersCount,
        raffleCount: selectedCommunity.raffleCount,
        adminType: selectedCommunity.adminType,
        avatarUrl: selectedCommunity.avatarUrl,
        status: selectedCommunity.status,
        buttonDesc: selectedCommunity.buttonDesc,
        stateText: selectedCommunity.status === 'green' ? 'Активен' : 'Неактивен'
      };
      try {
        await communitiesApi.createCardInDB(card);
      } catch (e: any) {
        if (e?.response?.status !== 400) {
          // 400 — карточка уже есть, остальные ошибки — показать/логировать
          console.error('Ошибка сохранения карточки:', e);
        }
      }
      setStep('success');
    }
  };
  const handleBackToSelect = () => setStep('select');
  const handleSuccessClose = () => {
    onClose();
    refetch(); // обновить список на главной
  };

  const modal = (
    <div className={styles.overlay} onClick={() => {
      onClose();
    }}>
      <div className={styles.cardWrapper} onClick={e => e.stopPropagation()}>
        {step === 'permission' && loadingSubs && <div style={{ padding: 24, textAlign: 'center' }}>Загрузка подписчиков...</div>}
        {loading && <div style={{ padding: 24, textAlign: 'center' }}>Загрузка...</div>}
        {error && <div style={{ color: 'red', padding: 24, textAlign: 'center' }}>{error}</div>}
        {!loadingSubs && !loading && !error && step === 'select' && (
          <CommunityModalCard
            type="select"
            options={options}
            value={selected}
            onChange={setSelected}
            onSubmit={handleSelectSubmit}
          />
        )}
        {!loadingSubs && !loading && !error && step === 'permission' && selectedCommunity && (
          <CommunityModalCard
            type="permission"
            communityName={selectedCommunity.name}
            communityAvatar={selectedCommunity.avatarUrl}
            subscribers={subscribers}
            userRole={selectedCommunity.adminType}
            onSubmit={handlePermissionAllow}
            onBack={handleBackToSelect}
          />
        )}
        {!loading && !error && step === 'success' && selectedCommunity && (
          <CommunityModalCard
            type="success"
            communityName={selectedCommunity.name}
            communityAvatar={selectedCommunity.avatarUrl}
            onClose={handleSuccessClose}
          />
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};

export default CommunityModalWrapper;
