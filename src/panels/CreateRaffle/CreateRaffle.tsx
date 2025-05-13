import React from 'react';
import {Panel, PanelHeader } from '@vkontakte/vkui';
import NestedCommunityCard from '../../components/NestedCommunityCard/NestedCommunityCard';

interface CreateRaffleProps {
  id: string;
}

const CreateRaffle: React.FC<CreateRaffleProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Create Raffle</PanelHeader>
      <div style={{ padding: '16px' , display: "flex", flexDirection: "column", gap: "16px"}}>
        <h2>Create a New Raffle</h2>
        <p>This is the panel for creating a new raffle.</p>

        <NestedCommunityCard 
          status='undefined'
          statusText='Виджет настроен' 
          name='Москва 24 – Новости' 
          nickname='@mosnews24'
          adminType='admin'
          membersCount="592K"
        />
         <NestedCommunityCard 
          status='green'
          statusText='Виджет настроен' 
          name='Москва 24 – Новости' 
          nickname='@mosnews24'
          adminType='admin'
          membersCount="592K"
        />
         <NestedCommunityCard 
          status='red'
          statusText='Виджет настроен' 
          name='Москва 24 – Новости' 
          nickname='@mosnews24'
          adminType='admin'
          membersCount="592K"
        />

<NestedCommunityCard 
          status='yellow'
          statusText='Виджет настроен' 
          name='Москва 24 – Новости' 
          nickname='@mosnews24'
          adminType='admin'
          membersCount="592K"
        />
      </div>
    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт