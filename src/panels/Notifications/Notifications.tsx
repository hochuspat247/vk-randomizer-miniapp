import React from 'react';
import { Panel, PanelHeader } from '@vkontakte/vkui';

interface NotificationsProps {
  id: string;
}

const Notifications: React.FC<NotificationsProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Notifications</PanelHeader>
      <div style={{ padding: '16px' }}>
        <h2>Your Notifications</h2>
        <p>This is the notifications panel.</p>
      </div>
    </Panel>
  );
};

export default Notifications; // Дефолтный экспорт