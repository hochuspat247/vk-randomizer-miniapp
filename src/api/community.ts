// Запросы для работы с сообществами через VK API

import { VKApi } from './vkApi';
import { transformVKGroupsToCommunityCards, filterAdminGroups, getRoleDisplayName } from '@/utils/vkTransformers';
import { 
  CommunityCard, 
  CreateCommunityCardRequest, 
  UpdateCommunityCardRequest,
  CommunityBanner 
} from '../types/community';
import httpClient from './httpClient';

export const communitiesApi = {
  // Получить список всех карточек сообществ из VK API (включая все роли) или с бэкенда по userId
  async getCards(userId?: string): Promise<CommunityCard[]> {
    if (userId) {
      try {
        // Получаем список карточек с бэкенда
        const backendCards = await httpClient.get(`/api/v1/communities/cards?vk_user_id=${userId}`) as any[];
        // Для каждого id подтягиваем данные из VK только для enrichment
        const enriched = await Promise.all(
          backendCards.map(async (card: any) => {
            try {
              const vkGroup = await VKApi.getGroupInfo(Number(card.id));
              return {
                ...card, // основа — данные с бэка!
                avatarUrl: vkGroup?.photo_200 || card.avatarUrl,
                membersCount: vkGroup?.members_count?.toLocaleString('ru-RU') || card.membersCount,
                // adminType и остальные поля — только из card!
              };
            } catch (e) {
              return card;
            }
          })
        );
        return enriched;
      } catch (error) {
        console.error('Ошибка получения сообществ с бэкенда:', error);
        throw error;
      }
    } else {
      // Старое поведение — только VK API
      try {
        const vkGroups = await VKApi.getUserGroupsWithRights();
        return transformVKGroupsToCommunityCards(vkGroups);
      } catch (error) {
        console.error('Ошибка получения сообществ из VK API:', error);
        throw error;
      }
    }
  },

  // Получить только сообщества где пользователь администратор (для обратной совместимости)
  async getAdminGroups(): Promise<CommunityCard[]> {
    try {
      const vkGroups = await VKApi.getUserAdminGroups();
      return transformVKGroupsToCommunityCards(vkGroups);
    } catch (error) {
      console.error('Ошибка получения административных сообществ:', error);
      throw error;
    }
  },

  // Получить все сообщества пользователя (включая те, где он не администратор)
  async getAllUserGroups(): Promise<CommunityCard[]> {
    try {
      const vkGroups = await VKApi.getUserGroups();
      const adminGroups = filterAdminGroups(vkGroups);
      return transformVKGroupsToCommunityCards(adminGroups);
    } catch (error) {
      console.error('Ошибка получения всех сообществ пользователя:', error);
      throw error;
    }
  },

  // Создать новую карточку сообщества (заглушка, так как создание через VK API не поддерживается)
  async createCard(cardData: CreateCommunityCardRequest): Promise<CommunityCard> {
    throw new Error('Создание сообществ через VK API не поддерживается');
  },

  // Полностью обновить карточку сообщества (заглушка)
  async updateCard(cardId: string, cardData: CreateCommunityCardRequest): Promise<CommunityCard> {
    throw new Error('Обновление сообществ через VK API не поддерживается');
  },

  // Частично обновить карточку сообщества (заглушка)
  async patchCard(cardId: string, cardData: UpdateCommunityCardRequest): Promise<CommunityCard> {
    throw new Error('Обновление сообществ через VK API не поддерживается');
  },

  // Удалить карточку сообщества (заглушка)
  async deleteCard(cardId: string): Promise<void> {
    throw new Error('Удаление сообществ через VK API не поддерживается');
  },

  // Получить баннеры сообществ
  async getBanners(): Promise<CommunityBanner[]> {
    try {
      const vkGroups = await VKApi.getUserGroupsWithRights();
      const communityCards = transformVKGroupsToCommunityCards(vkGroups);
      
      return communityCards.map(card => ({
        avatarUrl: card.avatarUrl,
        name: card.name,
        adminType: getRoleDisplayName(card.adminType)
      }));
    } catch (error) {
      console.error('Ошибка получения баннеров сообществ:', error);
      throw error;
    }
  },

  // Получить карточку сообщества по ID с бэка
  async getCardById(cardId: string): Promise<CommunityCard | null> {
    try {
      const card = await httpClient.get(`/api/v1/communities/cards/${cardId}`);
      const c: any = card;
      // Проверяем, что card содержит все обязательные поля
      if (!c || !c.id || !c.name || !c.nickname || !c.membersCount) return null;
      return c as CommunityCard;
    } catch (error) {
      console.error('Ошибка получения сообщества по ID с бэка:', error);
      return null;
    }
  },

  async createCardInDB(card: CommunityCard) {
    const response = await httpClient.post('/api/v1/communities/cards', card);
    return response;
  }
};

export default communitiesApi;
