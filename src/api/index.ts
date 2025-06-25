// Экспорт API-функций

export { default as communitiesApi, communitiesApi as communities } from './community';
export { default as rafflesApi, rafflesApi as raffles } from './raffle';
export { default as notificationsApi, notificationsApi as notifications } from './notifications';
export { default as httpClient } from './httpClient';

// Экспорт хуков
export { 
  useCommunities, 
  useRaffles, 
  useNotifications 
} from './hooks';

// Экспорт утилит
export { 
  isNetworkError,
  isValidationError,
  isNotFoundError,
  delay,
  retry,
  formatErrorMessage,
  isEmpty,
  removeEmptyFields
} from './utils';

// Экспорт констант
export { 
  API_ENDPOINTS,
  HTTP_STATUS_CODES,
  API_ERROR_MESSAGES,
  DEFAULT_API_CONFIG
} from './constants';

// Экспорт типов
export type { 
  CommunityCard, 
  CommunityBanner, 
  CreateCommunityCardRequest, 
  UpdateCommunityCardRequest 
} from '../types/community';

export type { 
  RaffleCard, 
  CreateRaffleRequest, 
  UpdateRaffleRequest 
} from '../types/raffle';

export type { 
  NotificationCard, 
  CompletedNotification, 
  WarningNotification, 
  ErrorNotification,
  CreateNotificationRequest, 
  UpdateNotificationRequest 
} from '../types/notification';
