import React, { useEffect, useState } from 'react';
import { Panel, PanelHeader, Spinner } from '@vkontakte/vkui';
import NotificationCard from '@components/NotificationCard/NotificationCard';
import { notificationsApi } from '@/api/notifications';
import { NotificationCard as NotificationCardType } from '@/types/notification';
import './Notifications.css'; // Подключаем стили

interface NotificationsProps {
  id: string;
}

const Notifications: React.FC<NotificationsProps> = ({ id }) => {
  const [notifications, setNotifications] = useState<NotificationCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    notificationsApi.getNotifications()
      .then(setNotifications)
      .catch((e) => setError(e.message || 'Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>Уведомления</PanelHeader>
      <div className="notificationList">
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
            <Spinner size="m" />
          </div>
        )}
        {error && (
          <div style={{ color: 'red', textAlign: 'center', padding: 24 }}>{error}</div>
        )}
        {!loading && !error && notifications.length === 0 && (
          <div style={{ textAlign: 'center', padding: 24 }}>Нет уведомлений</div>
        )}
        {!loading && !error && notifications.map((n, idx) => (
          <NotificationCard key={idx} {...n} />
        ))}
      </div>
    </Panel>
  );
};

export default Notifications;
