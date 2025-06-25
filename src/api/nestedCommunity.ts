import { VKApi } from './vkApi';
import { transformVKGroupsToCommunityCards, filterAdminGroups, getRoleDisplayName } from '@/utils/vkTransformers';

export interface NestedCommunityCard {
  status: 'green' | 'yellow' | 'red' | null;
  statusText: string;
  name: string;
  nickname: string;
  adminType: 'owner' | 'admin' | 'editor' | 'moderator' | 'member' | 'advertiser';
  membersCount: string;
}

export const nestedCommunityApi = {
  async getCards(): Promise<NestedCommunityCard[]> {
    try {
      // Получаем все сообщества пользователя с правами
      const vkGroups = await VKApi.getUserGroupsWithRights();
      const communityCards = transformVKGroupsToCommunityCards(vkGroups);
      
      // Преобразуем в формат NestedCommunityCard
      return communityCards.map(card => ({
        status: card.status,
        statusText: card.stateText,
        name: card.name,
        nickname: card.nickname,
        adminType: card.adminType,
        membersCount: card.membersCount
      }));
    } catch (error) {
      console.error('Ошибка получения вложенных сообществ:', error);
      throw error;
    }
  }
};

export default nestedCommunityApi; 