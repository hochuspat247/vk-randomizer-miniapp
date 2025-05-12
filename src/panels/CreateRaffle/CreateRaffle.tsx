import React from 'react';
import {Panel, PanelHeader } from '@vkontakte/vkui';
import NotificationCard from '../../components/NotificationCard/NotificationCard';

interface CreateRaffleProps {
  id: string;
}

const CreateRaffle: React.FC<CreateRaffleProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Create Raffle</PanelHeader>
      <div style={{ padding: '16px', backgroundColor: "#0A0A0A", display: "flex", flexDirection: "column", gap: "16px" }}>
        <h2>Create a New Raffle</h2>
        <p>This is the panel for creating a new raffle.</p>
        <NotificationCard
          type="completed"
          raffleId={38289}
          participantsCount={5920}
          reasonEnd="Достигнут лимит по числу участников."
          winners={['593IF', 'REOOJ', 'DOXO']}
          // new={true}
        />

<NotificationCard
          type="completed"
          raffleId={38289}
          participantsCount={5920}
          reasonEnd="Достигнут лимит по числу участников."
          winners={['593IF', 'REOOJ', 'DOXO']}
          new={true}
        />

        <NotificationCard
          type="warning"
          warningTitle="Не удалось подключить виджет"
          warningDescription={[
            'Сообщество "Казань 24 – Новости"',
            'У пользователя недостаточно прав.',
            'Розыгрыш не запущен.'
          ]}
          new={true}
        />

        <NotificationCard
          type="error"
          errorTitle="Ошибка подключения сообщества"
          errorDescription="На сервере VK ведутся технические работы. Приносим извинения за доставленные неудобства!"
        />

      </div>
    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт