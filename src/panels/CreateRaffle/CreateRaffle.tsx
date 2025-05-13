import React from 'react';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import CommunityCard from "../../components/CommunityCard/CommunityCard"
import avatar from '../../assets/images/Picture.png';

import styles from "./CreateRaffle.web.module.css"
import WidgetStatusBadge from '../../components/WidgetStatusBadge/WidgetStatusBadge';

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
          <CommunityCard
            membersCount="592 582" 
            raffleCount="52" 
            adminType="admin" 
            status="green"
            avatarUrl={avatar}
            name='Москва 24 – Новости'
            nickname='@mosnews24'
            buttonDesc='Последнее изменение: 14.10 21:31 – Администратор'
          />
        </div>
      </div>
    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт