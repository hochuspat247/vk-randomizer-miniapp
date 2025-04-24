import React from 'react';
import { Panel, PanelHeader } from '@vkontakte/vkui';

interface CreateRaffleProps {
  id: string;
}

const CreateRaffle: React.FC<CreateRaffleProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Create Raffle</PanelHeader>
      <div style={{ padding: '16px' }}>
        <h2>Create a New Raffle</h2>
        <p>This is the panel for creating a new raffle.</p>
      </div>
    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт