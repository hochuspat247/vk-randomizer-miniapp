import { useEffect, useState, useCallback } from 'react';
import { nestedCommunityApi, NestedCommunityCard } from '@/api/nestedCommunity';
import { VKApi } from '@/api/vkApi';

export function useNestedCommunityCards() {
  const [data, setData] = useState<NestedCommunityCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (clearCache = false) => {
    setLoading(true);
    setError(null);
    try {
      // Очищаем кэш если требуется
      if (clearCache) {
        VKApi.clearCache();
      }
      const result = await nestedCommunityApi.getNestedCommunitiesFromBackend();
      setData(result);
    } catch (e: any) {
      setError(e.message || 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData(true); // Очищаем кэш при принудительном обновлении
  }, [fetchData]);

  return { data, loading, error, refetch };
} 