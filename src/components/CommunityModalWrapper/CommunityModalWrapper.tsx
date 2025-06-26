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
  const { data: communities, refresh, loading, error } = useCommunities();
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
      
      // Маппинг ролей для бэкенда (принимает только 'owner' или 'admin')
      const mapAdminType = (role: string): 'owner' | 'admin' => {
        if (role === 'owner') return 'owner';
        // Все остальные роли (admin, editor, moderator, advertiser) -> admin
        return 'admin';
      };
      
      // Формируем карточку для БД
      const card = {
        id: selectedCommunity.id,
        name: selectedCommunity.name,
        nickname: selectedCommunity.nickname,
        membersCount: selectedCommunity.membersCount,
        raffleCount: selectedCommunity.raffleCount,
        adminType: mapAdminType(selectedCommunity.adminType),
        avatarUrl: selectedCommunity.avatarUrl,
        status: selectedCommunity.status,
        buttonDesc: selectedCommunity.buttonDesc,
        stateText: selectedCommunity.status === 'green' ? 'Активен' : 'Неактивен'
      };
      
      try {
        await communitiesApi.createCardInDB(card);
        console.log('Карточка успешно сохранена в БД');
      } catch (e: any) {
        // Игнорируем ошибки 400 (карточка уже существует) и 422 (валидация)
        if (e?.response?.status === 400 || e?.response?.status === 422) {
          console.log('Карточка уже существует или ошибка валидации, продолжаем...');
        } else {
          // Логируем только критические ошибки
          console.error('Критическая ошибка сохранения карточки:', e);
        }
      }
      
      // Переходим к успеху независимо от результата сохранения в БД
      setStep('success');
    }
  };
  const handleBackToSelect = () => setStep('select');
  const handleSuccessClose = () => {
    // Закрываем модальное окно - обновление данных происходит в родительском компоненте
    onClose();
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
