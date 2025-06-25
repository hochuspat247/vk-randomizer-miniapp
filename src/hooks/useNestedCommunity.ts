import { useEffect, useState } from 'react';
import { nestedCommunityApi, NestedCommunityCard } from '@/api/nestedCommunity';

export function useNestedCommunityCards() {
  const [data, setData] = useState<NestedCommunityCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    nestedCommunityApi.getCards()
      .then(setData)
      .catch(e => setError(e.message || 'Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
} 