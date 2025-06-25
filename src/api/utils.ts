// Утилиты для API

import { API_ERROR_MESSAGES } from './constants';

/**
 * Проверяет, является ли ошибка сетевой ошибкой
 */
export function isNetworkError(error: any): boolean {
  return error instanceof TypeError && error.message.includes('fetch');
}

/**
 * Проверяет, является ли ошибка ошибкой валидации
 */
export function isValidationError(error: any): boolean {
  return error.message.includes('Ошибка валидации');
}

/**
 * Проверяет, является ли ошибка ошибкой "не найдено"
 */
export function isNotFoundError(error: any): boolean {
  return error.message.includes(API_ERROR_MESSAGES.NOT_FOUND);
}

/**
 * Создает задержку
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Повторяет функцию с задержкой
 */
export async function retry<T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) {
      throw error;
    }
    
    await delay(delayMs);
    return retry(fn, attempts - 1, delayMs);
  }
}

/**
 * Форматирует ошибку для отображения пользователю
 */
export function formatErrorMessage(error: any): string {
  if (isNetworkError(error)) {
    return API_ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  if (isValidationError(error)) {
    return API_ERROR_MESSAGES.VALIDATION_ERROR;
  }
  
  if (isNotFoundError(error)) {
    return API_ERROR_MESSAGES.NOT_FOUND;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return API_ERROR_MESSAGES.UNKNOWN_ERROR;
}

/**
 * Проверяет, является ли объект пустым
 */
export function isEmpty(obj: any): boolean {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  if (obj instanceof Map || obj instanceof Set) return obj.size === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
}

/**
 * Удаляет пустые поля из объекта
 */
export function removeEmptyFields<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (!isEmpty(value)) {
      result[key as keyof T] = value;
    }
  }
  
  return result;
} 