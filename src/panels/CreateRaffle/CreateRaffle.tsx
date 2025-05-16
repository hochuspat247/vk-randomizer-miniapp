import React from 'react';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import CommunityCard from "../../components/CommunityCard/CommunityCard"

import styles from "./CreateRaffle.web.module.css"
import CommunityCardMocks from '../../mocks/CommunityCardMocks';

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
        <div className={styles.container} style={{display: "flex", flexDirection: "column"}}>
        {CommunityCardMocks.map((community) => (
          <CommunityCard
            key={community.id}
            name={community.name}
            nickname={community.nickname}
            membersCount={community.membersCount}
            raffleCount={community.raffleCount}
            adminType={community.adminType}
            avatarUrl={community.avatarUrl}
            status={community.status}
            buttonDesc={community.buttonDesc}
            stateText={community.stateText}
          />
        ))}
        </div>
      </div>
    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт