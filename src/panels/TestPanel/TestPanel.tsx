import React from 'react';
import { Panel, PanelHeader, PanelHeaderContent } from '@vkontakte/vkui';
import styles from "./TestPanel.module.css"

interface TestPanelProps {
  id: string;
}

const TestPanel: React.FC<TestPanelProps> = ({ id }) => {
  return (
    <Panel id={id}>
        <PanelHeader>
            <PanelHeaderContent>Test Panel</PanelHeaderContent>
        </PanelHeader>

        <div className={styles.container}>


        </div>
    </Panel>
  );
};


export default TestPanel;
