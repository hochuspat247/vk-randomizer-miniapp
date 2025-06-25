import { useEffect, useState } from 'react';
import { raffleCardsApi, RaffleCard } from '@/api/raffleCards';

export function useRaffleCards() {
  const [data, setData] = useState<RaffleCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    raffleCardsApi.getRaffleCards()
      .then(setData)
      .catch(e => setError(e.message || 'Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
} 