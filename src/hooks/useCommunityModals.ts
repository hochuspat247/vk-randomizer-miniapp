import { useEffect, useState } from 'react';
import { communityModalsApi, CommunityModal } from '@/api/communityModals';

export function useCommunityModals() {
  const [data, setData] = useState<CommunityModal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    communityModalsApi.getModals()
      .then(setData)
      .catch(e => setError(e.message || 'Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
} 