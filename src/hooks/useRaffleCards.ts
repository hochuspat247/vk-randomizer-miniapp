import { useEffect, useState, useCallback } from 'react';
import { raffleCardsApi, RaffleCard, BackendRaffle } from '@/api/raffleCards';
import { VKApi } from '@/api/vkApi';
import { usePlatformContext } from '@/contexts/PlatformContext';
import { useCommunities } from '@/api/hooks';
import { communitiesApi } from '@/api/community';

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
  const { userId } = usePlatformContext();
  const { data: communities } = useCommunities();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Получаем все данные с бэкенда без пагинации
      const backendRaffles = await raffleCardsApi.getAllRaffles({ vk_user_id: userId });
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

      // Обогащаем raffle данными о сообществе
      const enrichedRaffles: EnrichedRaffleCard[] = await Promise.all(backendRaffles.map(async (raffle: BackendRaffle) => {
        const communityId = raffle.community_id;
        let community = communities?.find(c => String(c.id) === String(communityId));
        if (!community) {
          console.warn('Не найдено сообщество для raffle:', raffle.name, 'community_id:', communityId);
        }

        // Определяем статус карточки на основе status с бэкенда
        let statusNestedCard: 'green' | 'yellow' | 'red' | undefined = 'green';
        if (raffle.status === 'draft') statusNestedCard = 'yellow';
        else if (raffle.status === 'completed' || raffle.status === 'cancelled') statusNestedCard = 'red';

        // Определяем режим розыгрыша
        let mode: 'time' | 'members' | 'both' = 'time';
        if (raffle.max_participants && raffle.end_date) mode = 'both';
        else if (raffle.max_participants) mode = 'members';

        // enrichment VK статусами
        const cleanNickname = (community?.nickname || '').replace(/^@/, '');
        const vkGroup = vkGroups.find(group => 
          group.screen_name === cleanNickname || 
          group.screen_name === community?.nickname
        );

        // Вычисляем время до окончания
        const endDate = new Date(raffle.end_date);
        const now = new Date();
        const timeLeft = endDate > now 
          ? Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) + ' дн.'
          : 'Завершен';

        return {
          raffleId: raffle.id,
          name: raffle.name || 'Без названия',
          textRaffleState: raffle.status === 'draft' ? 'Черновик' : 
                          raffle.status === 'active' ? 'Активно' : 
                          raffle.status === 'completed' ? 'Завершен' : 'Неизвестно',
          winnersCount: raffle.winners_count,
          mode,
          memberCount: raffle.max_participants ? String(raffle.max_participants) : '',
          timeLeft,
          progress: raffle.participants_count > 0 ? Math.min((raffle.participants_count / (raffle.max_participants || 1)) * 100, 100) : 0,
          lastModified: new Date(raffle.updated_at).toLocaleString('ru-RU'),
          modifiedBy: 'Администратор',
          statusСommunity: vkGroup ? 'connected' : 'notConfig',
          statusNestedCard,
          statusNestedText: raffle.status === 'draft' ? 'Черновик' : 
                           raffle.status === 'active' ? 'Активно' : 
                           raffle.status === 'completed' ? 'Завершен' : 'Неизвестно',
          nickname: community?.nickname || '',
          membersCountNested: community?.membersCount || '0',
          adminType: 'admin' as const,
          vkStatus: vkGroup ? 'connected' : 'notConfig',
          vkGroup: vkGroup
            ? {
                id: vkGroup.id,
                name: vkGroup.name,
                screen_name: vkGroup.screen_name,
                photo_200: vkGroup.photo_200,
                members_count: vkGroup.members_count
              }
            : undefined
        };
      }));

      console.log('Enriched raffles with VK status and community info:', enrichedRaffles.length);
      setData(enrichedRaffles);
    } catch (e: any) {
      console.error('Error loading raffle cards:', e);
      setError(e.message || 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }, [userId, communities]);

  // Функция для принудительного обновления данных
  const refresh = useCallback(() => {
    console.log('Refreshing raffle cards...');
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh };
} 