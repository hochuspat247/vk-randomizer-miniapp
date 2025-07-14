// Запросы для работы с розыгрышами

import httpClient from './httpClient';
import { 
  RaffleCard, 
  CreateRaffleRequest, 
  UpdateRaffleRequest 
} from '../types/raffle';

const RAFFLES_API_BASE = '/api/v1/raffle-cards';

export const rafflesApi = {
  // Получить список всех розыгрышей
  async getRaffles(): Promise<RaffleCard[]> {
    return httpClient.get<RaffleCard[]>(`${RAFFLES_API_BASE}/cards`);
  },

  // Получить розыгрыш по ID
  async getRaffleById(raffleId: string, vk_user_id?: string): Promise<any> {
    try {
      // Используем эндпоинт /all с фильтрацией по vk_user_id
      const query = new URLSearchParams();
      if (vk_user_id) query.append('vk_user_id', vk_user_id);
      
      const url = '/api/v1/raffles/all' + (query.toString() ? `?${query.toString()}` : '');
      const allRaffles = await httpClient.get<any[]>(url);
      console.log('All raffles from /all endpoint:', allRaffles);
      
      // Ищем розыгрыш по ID
      const raffle = allRaffles.find(r => r.id === raffleId);
      console.log('Found raffle by ID:', raffle);
      
      if (!raffle) {
        throw new Error(`Розыгрыш с ID ${raffleId} не найден`);
      }
      
      return raffle; // Возвращаем сам объект, а не обертку
    } catch (error) {
      console.error('Error in getRaffleById:', error);
      throw error;
    }
  },

  // Создать новый розыгрыш
  async createRaffle(raffleData: CreateRaffleRequest): Promise<RaffleCard> {
    return httpClient.post<RaffleCard>(`${RAFFLES_API_BASE}/`, raffleData);
  },

  // Полностью обновить розыгрыш через правильный API
  async updateRaffleById(raffleId: string, raffleData: any): Promise<any> {
    return httpClient.put<any>(`/api/v1/raffles/${raffleId}`, raffleData);
  },

  // Полностью обновить розыгрыш
  async updateRaffle(raffleId: string, raffleData: CreateRaffleRequest): Promise<RaffleCard> {
    return httpClient.put<RaffleCard>(`${RAFFLES_API_BASE}/${raffleId}`, raffleData);
  },

  // Частично обновить розыгрыш
  async patchRaffle(raffleId: string, raffleData: UpdateRaffleRequest): Promise<RaffleCard> {
    return httpClient.patch<RaffleCard>(`${RAFFLES_API_BASE}/${raffleId}`, raffleData);
  },

  // Удалить розыгрыш
  async deleteRaffle(raffleId: string): Promise<void> {
    return httpClient.delete<void>(`${RAFFLES_API_BASE}/cards/${raffleId}`);
  },

  // Получить активные розыгрыши
  async getActiveRaffles(): Promise<RaffleCard[]> {
    const allRaffles = await this.getRaffles();
    return allRaffles.filter(raffle => raffle.textRaffleState === 'Активно');
  },

  // Получить завершенные розыгрыши
  async getCompletedRaffles(): Promise<RaffleCard[]> {
    const allRaffles = await this.getRaffles();
    return allRaffles.filter(raffle => raffle.textRaffleState === 'Завершен');
  },

  // Получить неактивные розыгрыши
  async getInactiveRaffles(): Promise<RaffleCard[]> {
    const allRaffles = await this.getRaffles();
    return allRaffles.filter(raffle => raffle.textRaffleState === 'Неактивен');
  },

  async createRaffleCard(raffle: RaffleCard) {
    return httpClient.post(`${RAFFLES_API_BASE}/`, raffle);
  },

  // Загрузить фото для розыгрыша
  async uploadRafflePhoto(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return httpClient.postFormData<{ url: string }>('/api/v1/raffle-cards/upload-photo/', formData);
  },
};

export default rafflesApi;
