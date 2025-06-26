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
  async getRaffleById(raffleId: string): Promise<{raffle: RaffleCard}> {
    return httpClient.get<{raffle: RaffleCard}>(`${RAFFLES_API_BASE}/${raffleId}`);
  },

  // Создать новый розыгрыш
  async createRaffle(raffleData: CreateRaffleRequest): Promise<RaffleCard> {
    return httpClient.post<RaffleCard>(`${RAFFLES_API_BASE}/cards`, raffleData);
  },

  // Полностью обновить розыгрыш
  async updateRaffle(raffleId: string, raffleData: CreateRaffleRequest): Promise<RaffleCard> {
    return httpClient.put<RaffleCard>(`${RAFFLES_API_BASE}/cards/${raffleId}`, raffleData);
  },

  // Частично обновить розыгрыш
  async patchRaffle(raffleId: string, raffleData: UpdateRaffleRequest): Promise<RaffleCard> {
    return httpClient.patch<RaffleCard>(`${RAFFLES_API_BASE}/cards/${raffleId}`, raffleData);
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
};

export default rafflesApi;
