// Запросы для работы с сообществами через VK API

import { VKApi } from './vkApi';
import { transformVKGroupsToCommunityCards, filterAdminGroups, getRoleDisplayName } from '@/utils/vkTransformers';
import { 
  CommunityCard, 
  CreateCommunityCardRequest, 
  UpdateCommunityCardRequest,
  CommunityBanner 
} from '../types/community';

export const communitiesApi = {
  // Получить список всех карточек сообществ из VK API (включая все роли)
  async getCards(): Promise<CommunityCard[]> {
    try {
      // Получаем все сообщества, где у пользователя есть права (админ, редактор, модератор, рекламодатель)
      const vkGroups = await VKApi.getUserGroupsWithRights();
      return transformVKGroupsToCommunityCards(vkGroups);
    } catch (error) {
      console.error('Ошибка получения сообществ из VK API:', error);
      throw error;
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

  // Получить карточку сообщества по ID из VK API
  async getCardById(cardId: string): Promise<CommunityCard> {
    try {
      const groupId = parseInt(cardId);
      if (isNaN(groupId)) {
        throw new Error('Неверный ID сообщества');
      }
      
      const vkGroup = await VKApi.getGroupInfo(groupId);
      const communityCards = transformVKGroupsToCommunityCards([vkGroup]);
      return communityCards[0];
    } catch (error) {
      console.error('Ошибка получения сообщества по ID:', error);
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
  }
};

export default communitiesApi;
