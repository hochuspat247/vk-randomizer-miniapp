import { VKApi } from './vkApi';
import { transformVKGroupsToCommunityCards, filterAdminGroups, getRoleDisplayName } from '@/utils/vkTransformers';
import httpClient from './httpClient';

export interface NestedCommunityCard {
  status: 'green' | 'yellow' | 'red' | null;
  statusText: string;
  name: string;
  nickname: string;
  adminType: 'owner' | 'admin' | 'editor' | 'moderator' | 'member' | 'advertiser';
  membersCount: string;
  avatarUrl?: string;
}

// Интерфейс для данных с бэкенда
export interface BackendRaffle {
  raffleId: string;
  nickname: string;
  statusNestedCard: 'green' | 'yellow' | 'red';
  statusNestedText: string;
  membersCountNested: string;
  adminType: 'admin' | 'owner';
}

export const nestedCommunityApi = {
  async getCards(): Promise<NestedCommunityCard[]> {
    try {
      // Сначала пытаемся получить все сообщества с правами
      let vkGroups;
      try {
        vkGroups = await VKApi.getUserGroupsWithRights();
        console.log('Успешно получены все сообщества с правами');
      } catch (error) {
        console.warn('Ошибка получения сообществ с правами, используем fallback:', error);
        // Fallback: получаем только администраторские группы
        try {
          vkGroups = await VKApi.getUserAdminGroups();
          console.log('Получены администраторские группы как fallback');
        } catch (fallbackError) {
          console.error('Ошибка получения администраторских групп:', fallbackError);
          throw new Error('Не удалось получить данные о сообществах');
        }
      }
      
      const communityCards = transformVKGroupsToCommunityCards(vkGroups);
      
      // Преобразуем в формат NestedCommunityCard
      const result = communityCards.map((card, index) => {
        const mappedCard = {
          status: card.status as 'green' | 'yellow' | 'red' | null, // явное приведение типа
          statusText: card.stateText,
          name: card.name,
          nickname: card.nickname,
          adminType: card.adminType,
          membersCount: card.membersCount,
          avatarUrl: card.avatarUrl
        };
        return mappedCard;
      });
      
      return result;
    } catch (error) {
      console.error('Ошибка получения вложенных сообществ:', error);
      throw error;
    }
  },

  // Получить конкретное сообщество по nickname
  async getCommunityByNickname(nickname: string): Promise<NestedCommunityCard | null> {
    try {
      // Убираем @ из nickname если есть
      const cleanNickname = nickname.replace(/^@/, '');
      
      // Получаем все сообщества
      const allCards = await this.getCards();
      
      // Ищем нужное сообщество
      const found = allCards.find(card => card.nickname === cleanNickname);
      
      return found || null;
    } catch (error) {
      console.error('Ошибка получения сообщества по nickname:', error);
      return null;
    }
  },

  // Получить вложенные сообщества из данных бэкенда и обогатить их VK данными
  async getNestedCommunitiesFromBackend(): Promise<NestedCommunityCard[]> {
    try {
      // Получаем данные с бэкенда
      const response = await httpClient.get<{ raffles: BackendRaffle[] }>('/api/v1/raffle-cards/');
      const backendRaffles = response.raffles;
      
      // Получаем все сообщества из VK
      let vkGroups;
      try {
        vkGroups = await VKApi.getUserGroupsWithRights();
      } catch (error) {
        console.warn('Ошибка получения сообществ с правами, используем fallback:', error);
        try {
          vkGroups = await VKApi.getUserAdminGroups();
        } catch (fallbackError) {
          console.error('Ошибка получения администраторских групп:', fallbackError);
          throw new Error('Не удалось получить данные о сообществах');
        }
      }
      
      const communityCards = transformVKGroupsToCommunityCards(vkGroups);
      
      // Для каждого raffle с бэкенда ищем соответствующее сообщество в VK
      const result: NestedCommunityCard[] = [];
      
      for (const raffle of backendRaffles) {
        const cleanNickname = raffle.nickname.replace(/^@/, '');
        const vkCommunity = communityCards.find(card => card.nickname === cleanNickname);
        
        if (vkCommunity) {
          // Используем данные из VK, но статус из бэкенда
          result.push({
            status: raffle.statusNestedCard,
            statusText: raffle.statusNestedText,
            name: vkCommunity.name,
            nickname: vkCommunity.nickname,
            adminType: vkCommunity.adminType,
            membersCount: vkCommunity.membersCount,
            avatarUrl: vkCommunity.avatarUrl
          });
        } else {
          // Если сообщество не найдено в VK, создаем карточку с данными из бэкенда
          result.push({
            status: raffle.statusNestedCard,
            statusText: raffle.statusNestedText,
            name: raffle.nickname,
            nickname: cleanNickname,
            adminType: raffle.adminType,
            membersCount: raffle.membersCountNested,
            avatarUrl: undefined
          });
        }
      }
      
      return result;
    } catch (error) {
      console.error('Ошибка получения вложенных сообществ из бэкенда:', error);
      throw error;
    }
  }
};

export default nestedCommunityApi; 