import httpClient from './httpClient';

export interface RaffleCard {
  raffleId: string;
  name: string;
  textRaffleState: string;
  winnersCount: number;
  mode: 'time' | 'members' | 'both';
  memberCount: string;
  timeLeft: string;
  progress: number;
  lastModified: string;
  modifiedBy: string;
  statusСommunity: 'connected' | 'notConfig' | 'error';
  statusNestedCard: 'green' | 'yellow' | 'red' | undefined;
  statusNestedText: string;
  nickname: string;
  membersCountNested: string;
  adminType: 'admin' | 'owner';
}

// Интерфейс для данных с бэкенда
export interface BackendRaffle {
  id: string;
  vk_user_id: string;
  name: string;
  community_id: string;
  contest_text: string;
  photos: string[];
  require_community_subscription: boolean;
  require_telegram_subscription: boolean;
  telegram_channel: string | null;
  required_communities: string[];
  partner_tags: string[];
  winners_count: number;
  blacklist_participants: string[];
  start_date: string;
  end_date: string;
  max_participants: number | null;
  publish_results: boolean;
  hide_participants_count: boolean;
  exclude_me: boolean;
  exclude_admins: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  participants_count: number;
}

export const raffleCardsApi = {
  // Получить все розыгрыши без пагинации
  async getAllRaffles(params?: {
    vk_user_id?: string;
  }): Promise<BackendRaffle[]> {
    const query = new URLSearchParams();
    if (params?.vk_user_id) query.append('vk_user_id', params.vk_user_id);
    
    const url = '/api/v1/raffles/all' + (query.toString() ? `?${query.toString()}` : '');
    console.log('Loading all raffles from:', url);
    
    const response = await httpClient.get<BackendRaffle[]>(url);
    console.log(`Loaded ${response.length} raffles (all)`);
    
    return response;
  },

  // Получить розыгрыши с пагинацией (для обратной совместимости)
  async getRaffleCards(params?: {
    vk_user_id?: string;
    page?: number;
    per_page?: number;
    status?: string;
    community_id?: string;
  }): Promise<BackendRaffle[]> {
    // Если не указан per_page, загружаем все розыгрыши (100 элементов)
    const perPage = params?.per_page || 100;
    
    // Формируем query string
    const query = new URLSearchParams();
    if (params?.vk_user_id) query.append('vk_user_id', params.vk_user_id);
    if (params?.page) query.append('page', String(params.page));
    query.append('per_page', String(perPage));
    if (params?.status) query.append('status', params.status);
    if (params?.community_id) query.append('community_id', params.community_id);
    
    const url = '/api/v1/raffles/' + (query.toString() ? `?${query.toString()}` : '');
    console.log('Loading raffles from:', url);
    
    const response = await httpClient.get<{ raffles: BackendRaffle[]; total: number; page: number; per_page: number }>(url);
    
    console.log(`Loaded ${response.raffles.length} raffles out of ${response.total} total`);
    
    // Если есть еще страницы и мы загрузили меньше чем total, загружаем остальные
    if (response.total > response.raffles.length && response.total > perPage) {
      console.log(`Need to load more pages. Total: ${response.total}, loaded: ${response.raffles.length}`);
      
      const allRaffles = [...response.raffles];
      let currentPage = (params?.page || 1) + 1;
      
      while (allRaffles.length < response.total) {
        const nextQuery = new URLSearchParams();
        if (params?.vk_user_id) nextQuery.append('vk_user_id', params.vk_user_id);
        nextQuery.append('page', String(currentPage));
        nextQuery.append('per_page', String(perPage));
        if (params?.status) nextQuery.append('status', params.status);
        if (params?.community_id) nextQuery.append('community_id', params.community_id);
        
        const nextUrl = '/api/v1/raffles/' + (nextQuery.toString() ? `?${nextQuery.toString()}` : '');
        console.log(`Loading page ${currentPage} from:`, nextUrl);
        
        try {
          const nextResponse = await httpClient.get<{ raffles: BackendRaffle[]; total: number; page: number; per_page: number }>(nextUrl);
          allRaffles.push(...nextResponse.raffles);
          console.log(`Loaded ${nextResponse.raffles.length} more raffles from page ${currentPage}`);
          
          if (nextResponse.raffles.length === 0) break; // Больше страниц нет
          currentPage++;
        } catch (error) {
          console.error(`Error loading page ${currentPage}:`, error);
          break;
        }
      }
      
      console.log(`Total raffles loaded: ${allRaffles.length}`);
      return allRaffles;
    }
    
    return response.raffles;
  }
};

export default raffleCardsApi; 