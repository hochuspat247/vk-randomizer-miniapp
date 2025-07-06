// src/panels/SettingsPanel/SettingsPanel.tsx
import React from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderContent,
} from '@vkontakte/vkui';
import { Icon24ChevronLeft } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';


import styles from './SettingsPanel.module.css';
import { HeaderSettings } from '@/components/HeaderSettings/HeaderSettings';
import { MenuSettings } from '@/components/MenuSettings/MenuSettings';

export interface SettingsPanelProps {
  id: string;
  avatarUrl?: string;
  name?: string;
  vkId?: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  id,
  avatarUrl,
  name='Mikhail Likhachyov',
  vkId='6395832',
}) => {
  const router = useRouteNavigator();

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
          avatarUrl={avatarUrl}
          name={name}
          vkId={vkId}
        />

        {/* Меню настроек */}
        <MenuSettings />
      </div>
    </Panel>
  );
};

export default SettingsPanel;
