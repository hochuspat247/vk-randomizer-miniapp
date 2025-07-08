// src/panels/DoNotDisturbPanel/DoNotDisturbPanel.tsx
import React from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  PanelHeaderContent,
} from '@vkontakte/vkui';
import { Icon24ChevronLeft, Icon20Check } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import styles from './DontDisturbPanel.module.css';
import { DndOption, DoNotDisturb } from '@/components/DoNotDisturb/DoNotDisturb';

export interface DoNotDisturbPanelProps {
  /** Идентификатор панели (передаётся навигатору) */
  id: string;
  /** Опции «Не беспокоить» */
  options?: DndOption[];
  /** Callback при изменении режима DnD */
  onChange?: (selectedId: string, time?: string) => void;
}

export const DontDisturbPanelPanel: React.FC<DoNotDisturbPanelProps> = ({
  id,
  options,
  onChange,
}) => {
  const router = useRouteNavigator();

  const handleBack = () => {
    router.back();
  };
  const handleDone = () => {
    router.back();
  };

  return (
    <Panel id={id}>
      <PanelHeader
        className={styles.panelHeader}
        before={
          <div onClick={handleBack} className={styles.backIcon}>
            <Icon24ChevronLeft fill="#D4F94E" />    
          </div>
        }
        after={
          <PanelHeaderButton onClick={handleDone}>
        <Icon20Check fill="#D4F94E" />
      </PanelHeaderButton>
        }
      >
        <PanelHeaderContent className={styles.headerContent}>
          <span className={styles.headerText}>Не беспокоить</span>
        </PanelHeaderContent>
      </PanelHeader>

      <div className={styles.content}>
        <DoNotDisturb options={options} onChange={onChange} />
      </div>
    </Panel>
  );
};

export default DontDisturbPanelPanel;
