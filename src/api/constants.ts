// Константы для API

export const VK_APP_ID = 53488132; // ID приложения из vk-hosting-config.json

export const API_ENDPOINTS = {
  // Базовые пути
  COMMUNITIES: '/api/v1/communities',
  RAFFLES: '/api/v1/raffles',
  NOTIFICATIONS: '/api/v1/notifications',
  
  // Подпути для карточек
  CARDS: '/cards',
} as const;

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const API_ERROR_MESSAGES = {
  NOT_FOUND: 'Ресурс не найден',
  VALIDATION_ERROR: 'Ошибка валидации',
  SERVER_ERROR: 'Ошибка сервера',
  UNKNOWN_ERROR: 'Неизвестная ошибка',
  NETWORK_ERROR: 'Ошибка сети',
} as const;

export const DEFAULT_API_CONFIG = {
  TIMEOUT: 30000, // 30 секунд
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 секунда
} as const; 