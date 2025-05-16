import React from 'react';
import {Panel, PanelHeader } from '@vkontakte/vkui';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import NotificationCardMocks from '../../mocks/NotificationCardMocks';
 import {CreateRaffleText_Panel} from "../../constants/Text"


interface CreateRaffleProps {
  id: string;
}

const CreateRaffle: React.FC<CreateRaffleProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>{CreateRaffleText_Panel}</PanelHeader>
      <div style={{ padding: '16px', backgroundColor: "#0A0A0A", display: "flex", flexDirection: "column", gap: "16px" }}>
        <p>This is the panel for creating a new raffle.</p>
        {NotificationCardMocks.map((item, idx) => (
          <NotificationCard key={idx} {...item} />
        ))}
      </div>
    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт