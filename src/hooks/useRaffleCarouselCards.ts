import { useEffect, useState } from 'react';
import { raffleCarouselCardsApi, RaffleCarouselCard } from '@/api/raffleCarouselCards';

export function useRaffleCarouselCards() {
  const [data, setData] = useState<RaffleCarouselCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    raffleCarouselCardsApi.getRaffleCarouselCards()
      .then(setData)
      .catch(e => setError(e.message || 'Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
} 