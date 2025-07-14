// src/components/CommunityModalCard/CommunityModalWrapper.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useCommunities, useActiveCommunities } from '@/api/hooks';
import { VKApi } from '@/api/vkApi';
import styles from './CommunityModalWrapper.module.css';
import CommunityModalCard from '../CommunityModalCard/CommunityModalCard';
import { communitiesApi } from '@/api/community';
import { transformVKGroupsToCommunityCards } from '@/utils/vkTransformers';
import { usePlatformContext } from '@/contexts/PlatformContext';

interface Props {
  onClose: () => void;
}

const CommunityModalWrapper: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState<'select' | 'permission' | 'success'>('select');
  const [selected, setSelected] = useState('');
  const { data: communities, refresh, loading, error } = useCommunities(); // сохранённые на бэке
  const { addCommunity } = useActiveCommunities();
  const [subscribers, setSubscribers] = useState<{ name: string; avatar: string }[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  // Новый стейт для всех VK сообществ с правами
  const [vkCommunities, setVkCommunities] = useState<import('@/types/community').CommunityCard[]>([]);
  const [vkLoading, setVkLoading] = useState(true);
  const [vkError, setVkError] = useState<string | null>(null);

  const { userId: vk_user_id } = usePlatformContext();

  // Получаем все сообщества пользователя с правами из VK API
  useEffect(() => {
    setVkLoading(true);
    setVkError(null);
    VKApi.getUserGroupsWithRights()
      .then(groups => {
        setVkCommunities(transformVKGroupsToCommunityCards(groups));
      })
      .catch(e => setVkError(e.message || 'Ошибка загрузки сообществ VK'))
      .finally(() => setVkLoading(false));
  }, []);

  // Фильтруем: показываем только те, которых ещё нет на бэке
  const availableCommunities = vkCommunities.filter(
    vkComm => !communities?.some(saved => saved.id === vkComm.id)
  );

  // Получаем список опций для выбора (только названия сообществ)
  const options = availableCommunities.map(c => c.name);
  const selectedCommunity = availableCommunities.find(c => c.name === selected);

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
    if (selectedCommunity && vk_user_id) {
      addCommunity(selectedCommunity.id);
      
      // Формируем nickname с @
      const nickname = selectedCommunity.nickname.startsWith('@')
        ? selectedCommunity.nickname
        : '@' + selectedCommunity.nickname;
      // Формируем buttonDesc
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const dateStr = `${pad(now.getDate())}.${pad(now.getMonth() + 1)} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
      const buttonDesc = `Последнее изменение: ${dateStr} – ${vk_user_id}`;
      // Формируем карточку для БД
      const card = {
        id: selectedCommunity.id,
        vk_user_id,
        name: selectedCommunity.name,
        nickname,
        membersCount: selectedCommunity.membersCount,
        raffleCount: selectedCommunity.raffleCount,
        adminType: selectedCommunity.adminType,
        avatarUrl: selectedCommunity.avatarUrl,
        status: selectedCommunity.status,
        buttonDesc,
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
        {vkLoading && <div style={{ padding: 24, textAlign: 'center' }}>Загрузка сообществ VK...</div>}
        {vkError && <div style={{ color: 'red', padding: 24, textAlign: 'center' }}>{vkError}</div>}
        {!loadingSubs && !vkLoading && !vkError && step === 'select' && (
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
