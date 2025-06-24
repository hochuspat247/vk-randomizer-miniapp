// Запросы для работы с сообществами

import { 
  CommunityCard, 
  CreateCommunityCardRequest, 
  UpdateCommunityCardRequest,
  ApiResponse,
  ApiError 
} from '../types/community';
import { API_BASE_URL } from './config';

// Базовые функции для HTTP запросов
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({ detail: [] }));
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.detail?.[0]?.msg || 'Unknown error'}`);
  }
  return response.json();
};

const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  return handleResponse<T>(response);
};

// API функции для сообществ

/**
 * Получить список всех карточек сообществ
 */
export const getCommunityCards = async (): Promise<CommunityCard[]> => {
  return apiRequest<CommunityCard[]>('/communities/cards');
};

/**
 * Создать новую карточку сообщества
 */
export const createCommunityCard = async (
  card: CreateCommunityCardRequest
): Promise<CommunityCard> => {
  return apiRequest<CommunityCard>('/communities/cards', {
    method: 'POST',
    body: JSON.stringify(card),
  });
};

/**
 * Получить карточку сообщества по ID
 */
export const getCommunityCardById = async (cardId: string): Promise<CommunityCard> => {
  return apiRequest<CommunityCard>(`/communities/cards/${cardId}`);
};

/**
 * Обновить карточку сообщества (полное обновление)
 */
export const updateCommunityCard = async (
  cardId: string, 
  card: CreateCommunityCardRequest
): Promise<CommunityCard> => {
  return apiRequest<CommunityCard>(`/communities/cards/${cardId}`, {
    method: 'PUT',
    body: JSON.stringify(card),
  });
};

/**
 * Частично обновить карточку сообщества
 */
export const patchCommunityCard = async (
  cardId: string, 
  card: UpdateCommunityCardRequest
): Promise<CommunityCard> => {
  return apiRequest<CommunityCard>(`/communities/cards/${cardId}`, {
    method: 'PATCH',
    body: JSON.stringify(card),
  });
};

/**
 * Удалить карточку сообщества
 */
export const deleteCommunityCard = async (cardId: string): Promise<void> => {
  return apiRequest<void>(`/communities/cards/${cardId}`, {
    method: 'DELETE',
  });
};
