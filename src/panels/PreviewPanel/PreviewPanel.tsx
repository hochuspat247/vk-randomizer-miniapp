// src/components/PreviewPanel/PreviewPanel.tsx
import React from 'react';
import styles from './PreviewPanel.module.css';
import { Panel } from '@vkontakte/vkui';
import PreviewRaffle from '@/components/PreviewRaffle/PreviewRaffle';
import { PreviewRaffleMocks } from '@/mocks/PreviewRaffleMocks';

export interface PreviewPanelProps {
  id: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ id }) => {
  return (
    <Panel id={id}>
      {/* Вставляем ваш компонент с использованием моков */}
      <div className={styles.panelWrapper}>
        <PreviewRaffle
          imageSrc={PreviewRaffleMocks.imageSrc}
          raffleItem={PreviewRaffleMocks.raffleItem}
          channelAvatarSrc={PreviewRaffleMocks.channelAvatarSrc}
          channelName={PreviewRaffleMocks.channelName}
          description={PreviewRaffleMocks.description}
          endTime={PreviewRaffleMocks.endTime}
        />
      </div>
    </Panel>
  );
};

export default PreviewPanel;
