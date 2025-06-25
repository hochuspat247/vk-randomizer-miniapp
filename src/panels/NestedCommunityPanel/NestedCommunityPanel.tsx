import React from 'react';
import { Panel, PanelHeader, Spinner } from '@vkontakte/vkui';
import { useNestedCommunityCards } from '@/hooks/useNestedCommunity';
import NestedCommunityCard from '@/components/NestedCommunityCard/NestedCommunityCard';

interface NestedCommunityPanelProps {
  id: string;
}

const NestedCommunityPanel: React.FC<NestedCommunityPanelProps> = ({ id }) => {
  const { data: cards, loading, error } = useNestedCommunityCards();

  return (
    <Panel id={id}>
      <PanelHeader>Вложенные сообщества</PanelHeader>
      <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
            <Spinner size="m" />
          </div>
        )}
        {error && (
          <div style={{ color: 'red', textAlign: 'center', padding: 24 }}>{error}</div>
        )}
        {!loading && !error && cards && cards.length === 0 && (
          <div style={{ textAlign: 'center', padding: 24 }}>Нет вложенных карточек</div>
        )}
        {!loading && !error && cards && cards.map((card, idx) => (
          <NestedCommunityCard
            key={card.nickname || idx}
            {...card}
            status={card.status === null ? 'undefined' : card.status}
          />
        ))}
      </div>
    </Panel>
  );
};

export default NestedCommunityPanel; 