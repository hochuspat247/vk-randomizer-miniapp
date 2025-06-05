import React from 'react';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import NotificationCard from '@components/NotificationCard/NotificationCard';
import './Notifications.css'; // Подключаем стили

interface NotificationsProps {
  id: string;
}

const Notifications: React.FC<NotificationsProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Уведомления</PanelHeader>

      <div className="notificationList">
        <NotificationCard
          type="warning"
          new={true}
          warningTitle="Подключите сообщество"
          warningDescription={[
            'Розыгрыш не может быть опубликован без выбранного сообщества.',
            'Перейдите в настройки и выберите сообщество.',
          ]}
        />

        <NotificationCard
          type="completed"
          raffleId={12345}
          participantsCount={284}
          winners={['klecke', 'natalia88']}
          reasonEnd="Розыгрыш завершён по дате окончания"
          new={false}
        />

        <NotificationCard
          type="error"
          errorTitle="Ошибка публикации"
          errorDescription="Не удалось отправить данные. Проверьте соединение."
          new={false}
        />
      </div>
    </Panel>
  );
};

export default Notifications;
