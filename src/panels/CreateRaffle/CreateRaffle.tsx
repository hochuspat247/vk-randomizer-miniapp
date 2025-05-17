import React from 'react';
import {Panel, PanelHeader } from '@vkontakte/vkui';
import NestedCommunityCard from '../../components/NestedCommunityCard/NestedCommunityCard';
import NestedCommunityCardMocks from '../../mocks/NestedCommunityCardMocks';


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

        {NestedCommunityCardMocks.map((community, index) => (
  <NestedCommunityCard
    key={index}
    name={community.name}
    nickname={community.nickname}
    status={community.status}
    statusText={community.statusText}
    membersCount={community.membersCount}
    adminType={community.adminType}
  />
))}
      </div>
    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт