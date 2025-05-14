import React from 'react';
import {Panel, PanelHeader } from '@vkontakte/vkui';
import RaffleCard from '../../components/RaffleCard/RaffleCard';
import RaffleState from '../../components/RaffleState/RaffleState';

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

        <RaffleCard
          raffleId="492850"
          name="Казань 24 – Новости"
          status='active'
          textRaffleState='Активно'
          winnersCount={5}
          mode="both"
          memberCount="27"
          timeLeft="2Д 9Ч 21М"
          progress={99}
          lastModified="14.10.2025 21:31" 
          modifiedBy="Администратор"
          statusСommunity="connected"
          nickname="@mosnews24"
          statusNestedCard='green'
          statusNestedText='Недостаточно прав'
          membersCountNested='522K'
          adminType='admin'
        />
      </div>
    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт