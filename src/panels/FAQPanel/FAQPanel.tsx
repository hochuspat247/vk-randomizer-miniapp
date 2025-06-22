// src/panels/FAQPanel/FAQPanel.tsx
import React, { useState, useMemo } from 'react';
import { Panel, PanelHeader, PanelHeaderContent } from '@vkontakte/vkui';

import FaqFilter          from '@/components/FaqFilter/FaqFilter';
import DeployableList     from '@/components/DeployableList/DeployableList';
import { options }        from '@/constants/Texts/FaqFilter';

import styles from './FAQPanel.module.css';
import { faqItems } from '@/mocks/FaqItems';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Icon24ChevronLeft } from '@vkontakte/icons';
import SupportCard from '@/components/SupportCard/SupportCard';

interface FAQPanelProps {
id: string;
}

const FAQPanel: React.FC<FAQPanelProps> = ({ id }) => {
const [selected, setSelected] = useState<string>('all');

/** Фильтруем вопросы */
const filtered = useMemo(() => {
    if (selected === 'all') return faqItems;
    return faqItems.filter(item => item.category === selected);
}, [selected]);

const router = useRouteNavigator(); 

return (
    <Panel id={id}>
        <div className={styles.Panel}>
            <PanelHeader
                before={
                <div onClick={() => router.back()} className={styles.backIcon}>
                    <Icon24ChevronLeft fill=' #D4F94E'/>
                </div>}
            >
                <PanelHeaderContent>
                    <span className={styles.headerText}>RaffleFAQ</span>
                </PanelHeaderContent>
            </PanelHeader>

            {/* Фильтр */}
            <FaqFilter defaultValue="all" onSelect={setSelected} />

            {/* Список вопросов */}
            <div className={styles.list}>
                {filtered.map(item => (
                    <DeployableList
                        key={item.id}
                        title={item.title}
                        text={item.text}
                    />
                ))}

                <div className={styles.stickySection}>
                    <SupportCard variant="support" />
                </div>
            </div>
        </div>
    </Panel>
);
};

export default FAQPanel;
