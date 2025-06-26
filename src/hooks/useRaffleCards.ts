import { useEffect, useState } from 'react';
import { raffleCardsApi, RaffleCard } from '@/api/raffleCards';
import { VKApi } from '@/api/vkApi';

// Расширенный интерфейс с VK статусом
export interface EnrichedRaffleCard extends RaffleCard {
  vkStatus?: 'connected' | 'notConfig' | 'error';
  vkGroup?: {
    id: number;
    name: string;
    screen_name: string;
    photo_200?: string;
    members_count: number;
  };
}

export function useRaffleCards() {
  const [data, setData] = useState<EnrichedRaffleCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Получаем данные с бэкенда
        const backendRaffles = await raffleCardsApi.getRaffleCards();
        console.log('Backend raffles loaded:', backendRaffles.length);

        // Получаем VK группы для определения статусов
        let vkGroups: any[] = [];
        try {
          vkGroups = await VKApi.getUserGroupsWithRights();
          console.log('VK groups loaded:', vkGroups.length);
        } catch (vkError) {
          console.warn('Failed to load VK groups for status enrichment:', vkError);
          // Продолжаем без VK данных
        }

        // Обогащаем данные VK статусами
        const enrichedRaffles: EnrichedRaffleCard[] = backendRaffles.map(raffle => {
          const cleanNickname = raffle.nickname.replace(/^@/, '');
          const vkGroup = vkGroups.find(group => 
            group.screen_name === cleanNickname || 
            group.screen_name === raffle.nickname
          );

          if (vkGroup) {
            return {
              ...raffle,
              vkStatus: 'connected' as const,
              vkGroup: {
                id: vkGroup.id,
                name: vkGroup.name,
                screen_name: vkGroup.screen_name,
                photo_200: vkGroup.photo_200,
                members_count: vkGroup.members_count
              }
            };
          } else {
            return {
              ...raffle,
              vkStatus: 'notConfig' as const
            };
          }
        });

        console.log('Enriched raffles with VK status:', enrichedRaffles.length);
        setData(enrichedRaffles);
      } catch (e: any) {
        console.error('Error loading raffle cards:', e);
        setError(e.message || 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
} 