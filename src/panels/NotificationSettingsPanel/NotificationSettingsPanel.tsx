// src/panels/NotificationSettingsPanel/NotificationSettingsPanel.tsx
import React, { useState, useMemo, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderContent,
  Spinner,
} from '@vkontakte/vkui';
import { Icon24ChevronLeft } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { usePlatformContext } from '@/contexts/PlatformContext';

import { NotificationButton } from '@/components/NotificationButton/NotificationButton';
import { Swipers } from '@/components/Swipers/Swipers';
import { staticOptions1, staticOptions2 } from '@/constants/Texts/Swipers';

import styles from './NotificationSettingsPanel.module.css';
import { notificationApi, NotificationSettings } from '@/api/notificationSettings';

export interface NotificationSettingsPanelProps {
  id: string;
}

const NotificationSettingsPanel: React.FC<NotificationSettingsPanelProps> = ({
  id,
}) => {
  const router = useRouteNavigator();
  const { userId } = usePlatformContext();

  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // 1) Загрузка настроек через notificationApi
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    notificationApi
      .getSettings(userId)
      .then(setSettings)
      .catch(() => setSettings(null))
      .finally(() => setLoading(false));
  }, [userId]);

  // 2) Собираем все id опций
  const allIds = useMemo(
    () => [...staticOptions1, ...staticOptions2].map(o => o.id),
    []
  );

  // 3) Стейт переключателей, инициализируется из settings
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  useEffect(() => {
    if (loading) return;
    const initial: Record<string, boolean> = {};
    allIds.forEach(id => {
      initial[id] = settings ? Boolean((settings as any)[id]) : true;
    });
    setToggles(initial);
  }, [loading, settings, allIds]);

  // 4) Обработка изменения: обновляем локально и на сервере
  const handleChange = (id: string, checked: boolean) => {
  if (!settings || !userId) {
    // если settings ещё не загрузились — просто меняем локальный toggles
    setToggles(prev => ({ ...prev, [id]: checked }));
    return;
  }

  // 1) новый полный объект настроек
  const newSettings: NotificationSettings = {
    ...settings,
    [id]: checked
  };

  // 2) оптимистично обновляем UI
  setToggles(prev => ({ ...prev, [id]: checked }));

  // 3) отправляем полный объект на сервер
  notificationApi
    .updateSettings(userId, newSettings)
    .then(serverSettings => {
      // 4) сохраняем то, что вернул сервер
      setSettings(serverSettings);
      // и синхронизируем toggles на случай, если сервер подправил что-то ещё
      const synced: Record<string, boolean> = {};
      allIds.forEach(key => {
        synced[key] = Boolean((serverSettings as any)[key]);
      });
      setToggles(synced);
    })
    .catch(err => {
      console.error(err);
      // на ошибке можно откатить UI в прежнее состояние:
      setToggles(prev => ({ ...prev, [id]: !checked }));
    });
};


  // 5) Формируем опции для Swipers
  const options1 = staticOptions1.map(o => ({
    ...o,
    checked: Boolean(toggles[o.id]),
    onChange: (val: boolean) => handleChange(o.id, val),
  }));
  const options2 = staticOptions2.map(o => ({
    ...o,
    checked: Boolean(toggles[o.id]),
    onChange: (val: boolean) => handleChange(o.id, val),
  }));

  if (loading) {
    return (
      <Panel id={id} className={styles.panel}>
        <PanelHeader
          before={<Icon24ChevronLeft onClick={() => router.back()} fill="#D4F94E" />}
          className={styles.header}
        >
          <PanelHeaderContent className={styles.headerContent}>
            Уведомления
          </PanelHeaderContent>
        </PanelHeader>
        <div className={styles.body}>
          <Spinner size="l" />
        </div>
      </Panel>
    );
  }

  return (
    <Panel id={id} className={styles.panel}>
      <PanelHeader
        before={<Icon24ChevronLeft onClick={() => router.back()} fill="#D4F94E" />}
        className={styles.header}
      >
        <PanelHeaderContent className={styles.headerContent}>
          Уведомления
        </PanelHeaderContent>
      </PanelHeader>

      <div className={styles.body}>
        {/* Кнопка «Временно отключить» */}
        <NotificationButton
          title="Временно отключить"
          onClick={() => router.push('/dontdisturb')}
        />

        {/* Раздел с event-notification toggles */}
        <Swipers title="Уведомления по событиям" options={options1} />

        <div className={styles.divider} />

        {/* Раздел с системными настройками */}
        <Swipers title="Системные настройки" options={options2} />
      </div>
    </Panel>
  );
};

export default NotificationSettingsPanel;
