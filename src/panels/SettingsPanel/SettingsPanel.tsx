// src/panels/SettingsPanel/SettingsPanel.tsx
import React, { useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
  Spinner,
} from '@vkontakte/vkui';
import { Icon24ChevronLeft } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { VKApi } from '@/api/vkApi';
import { usePlatformContext } from '@/contexts/PlatformContext';

import styles from './SettingsPanel.module.css';
import { HeaderSettings } from '@/components/HeaderSettings/HeaderSettings';
import { MenuSettings } from '@/components/MenuSettings/MenuSettings';

export interface SettingsPanelProps {
  id: string;
  avatarUrl?: string;
  name?: string;
  vkId?: string;
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  photo_200?: string;
  photo_100?: string;
  photo_50?: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  id,
  avatarUrl: propAvatarUrl,
  name: propName,
  vkId: propVkId,
}) => {
  const router = useRouteNavigator();
  const { userId } = usePlatformContext();
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Загружаем данные пользователя
  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) {
        console.log('No userId available, using fallback data');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        console.log('Loading user data for ID:', userId);
        const userInfo = await VKApi.getUserInfo(Number(userId));
        console.log('User data loaded:', userInfo);
        
        setUserData(userInfo);
      } catch (err) {
        console.error('Error loading user data:', err);
        // Не показываем ошибку, если VK API недоступен - используем fallback данные
        console.log('Using fallback user data');
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  // Определяем данные для отображения
  const displayAvatarUrl = userData?.photo_200 || userData?.photo_100 || userData?.photo_50 || propAvatarUrl;
  const displayName = userData ? `${userData.first_name} ${userData.last_name}` : propName || 'Пользователь VK';
  const displayVkId = userData?.id?.toString() || propVkId || userId || 'Неизвестно';

  // Показываем спиннер во время загрузки
  if (loading) {
    return (
      <Panel id={id} className={styles.panel}>
        <PanelHeader
          before={
            <Icon24ChevronLeft onClick={() => router.back()} fill="#D4F94E" />
          }
          className={styles.header}
        >
          <PanelHeaderContent className={styles.headerContent}>
            Настройки
          </PanelHeaderContent>
        </PanelHeader>
        <div className={styles.body}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <Spinner size="m" />
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <Panel id={id} className={styles.panel}>
      <PanelHeader
        before={
          <Icon24ChevronLeft onClick={() => router.back()} fill="#D4F94E" />
        }
        className={styles.header}
      >
        <PanelHeaderContent className={styles.headerContent}>
          Настройки
        </PanelHeaderContent>
      </PanelHeader>

      <div className={styles.body}>
        {/* Блок с аватаром, именем и ID */}
        <HeaderSettings
          avatarUrl={displayAvatarUrl}
          name={displayName}
          vkId={displayVkId}
        />

        {/* Меню настроек */}
        <MenuSettings />
      </div>
    </Panel>
  );
};

export default SettingsPanel;
