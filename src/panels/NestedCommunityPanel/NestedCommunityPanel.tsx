import React from 'react';
import { Panel, PanelHeader, Spinner, Button } from '@vkontakte/vkui';
import { Icon24Refresh } from '@vkontakte/icons';
import { useNestedCommunityCards } from '@/hooks/useNestedCommunity';
import NestedCommunityCard from '@/components/NestedCommunityCard/NestedCommunityCard';

interface NestedCommunityPanelProps {
  id: string;
}

const NestedCommunityPanel: React.FC<NestedCommunityPanelProps> = ({ id }) => {
  const { data: cards, loading, error, refetch } = useNestedCommunityCards();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Panel id={id}>
      <PanelHeader>
        Вложенные сообщества
      </PanelHeader>
      <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <Button 
            mode="tertiary" 
            onClick={handleRefresh} 
            disabled={loading}
            before={<Icon24Refresh />}
          >
            Обновить
          </Button>
        </div>
        
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
            <Spinner size="m" />
          </div>
        )}
        {error && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>
            <Button onClick={handleRefresh} disabled={loading}>
              Попробовать снова
            </Button>
          </div>
        )}
        {!loading && !error && cards && cards.length === 0 && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ marginBottom: 16 }}>Нет вложенных сообществ</div>
            <Button onClick={handleRefresh} disabled={loading}>
              Обновить
            </Button>
          </div>
        )}
        
        {!loading && !error && cards && cards.map((card, idx) => (
          <NestedCommunityCard
            key={card.nickname || idx}
            {...card}
            status={card.status === null || card.status === undefined ? undefined : card.status}
          />
        ))}
      </div>
    </Panel>
  );
};

export default NestedCommunityPanel; 