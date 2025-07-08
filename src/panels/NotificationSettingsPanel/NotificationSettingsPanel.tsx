// src/panels/NotificationSettingsPanel/NotificationSettingsPanel.tsx
import React, { useState, useMemo } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
} from '@vkontakte/vkui';
import { Icon24ChevronLeft } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { NotificationButton } from '@/components/NotificationButton/NotificationButton';
import { Swipers } from '@/components/Swipers/Swipers';
import {
  staticOptions1,
  staticOptions2,
} from '@/constants/Texts/Swipers';

import styles from './NotificationSettingsPanel.module.css';

export interface NotificationSettingsPanelProps {
  id: string;
}

const NotificationSettingsPanel: React.FC<NotificationSettingsPanelProps> = ({
  id,
}) => {
  const router = useRouteNavigator();

  // Собираем все id опций в один массив
  const allIds = useMemo(
    () => [...staticOptions1, ...staticOptions2].map((o) => o.id),
    []
  );

  // Состояние включённых/выключенных переключателей
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    () =>
      allIds.reduce((acc, id) => {
        acc[id] = true; // по умолчанию все true, можно поменять
        return acc;
      }, {} as Record<string, boolean>)
  );

  const handleChange = (id: string, checked: boolean) => {
    setToggles((prev) => ({ ...prev, [id]: checked }));
  };

  // Собираем опции для Swipers
  const options1 = staticOptions1.map((o) => ({
    ...o,
    checked: toggles[o.id],
    onChange: (val: boolean) => handleChange(o.id, val),
  }));
  const options2 = staticOptions2.map((o) => ({
    ...o,
    checked: toggles[o.id],
    onChange: (val: boolean) => handleChange(o.id, val),
  }));

  return (
    <Panel id={id} className={styles.panel}>
      <PanelHeader
        before={
           <Icon24ChevronLeft onClick={() => router.back()} fill="#D4F94E" />
        }
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
