import React from 'react';
import {Panel, PanelHeader} from '@vkontakte/vkui';

// import styles from "./CreateRaffle.web.module.css"
import CommunityModalCard from '../../components/CommunityModalCard/CommunityModalCard';

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


        <CommunityModalCard
        type='select'
          placeholder="Выберите сообщество"
          options={['Мемы', 'VK Fest', 'Новости']}
        />

        {/* <CommunityModalCard
          type="permission"
          communityName="Спортивная Москва"
          communityAvatar={CommunityAvatar}
          subscribers={[
            { name: 'Анна', avatar: CommunityAvatar},
            { name: 'Маргарита', avatar: CommunityAvatar },
            { name: 'Елизавета', avatar: CommunityAvatar },
            { name: 'Иван', avatar: CommunityAvatar },
            { name: 'Алексей', avatar: CommunityAvatar },
          ]}
        /> */}

        {/* <CommunityModalCard
          type="success"
          communityName="Спортивная Москва"
          communityAvatar={CommunityAvatar}
        /> */}


      </div>
    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт