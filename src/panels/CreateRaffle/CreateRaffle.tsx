 import React from 'react';
import {Panel, PanelHeader } from '@vkontakte/vkui';
import {CreateRaffleText_Panel} from "../../constants/Texts/CreateRaffleText"
import styles from "./CreateRaffle.web.module.css"

interface CreateRaffleProps {
  id: string;
}

const CreateRaffle: React.FC<CreateRaffleProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>{CreateRaffleText_Panel}</PanelHeader>
      <div className={styles.Container}>
        <p>This is the panel for creating a new raffle.</p>
        
      </div>
    </Panel>
  );
};

export default CreateRaffle; // Дефолтный экспорт
