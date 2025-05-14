import React from 'react';
import {Panel, PanelHeader } from '@vkontakte/vkui';
import RaffleCarouselCard from '../../components/RaffleCarouselCard/RaffleCarouselCard';

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

        <RaffleCarouselCard
      raffleId="492850"
      name="Москва 24 — Новости"
      status="active"
      stateText="Активно"
      members="490 / 500"
      endDate="15 МАЯ 23:59"
      updatedAt="14.10 21:31"
/>
      </div>

    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт