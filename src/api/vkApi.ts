import vkBridge from '@vkontakte/vk-bridge';
import { VK_APP_ID } from './constants';

// Типы для VK API
export interface VKGroup {
  id: number;
  name: string;
  screen_name: string;
  photo_50: string;
  photo_100: string;
  photo_200: string;
  members_count: number;
  type: string;
  is_admin: number;
  is_member: number;
  is_advertiser: number;
  activity?: string;
  verified?: number;
  description?: string;
  // Дополнительные поля для определения роли
  is_owner?: number;
  is_editor?: number;
  is_moderator?: number;
  role?: string;
  // Поле для отслеживания источника группы
  source?: 'admin' | 'editor' | 'moderator' | 'advertiser';
}

export interface VKGroupsResponse {
  count: number;
  items: VKGroup[];
}

export interface VKAuthToken {
  access_token: string;
  scope: string;
}

// Кэш для хранения результатов запросов
const cache = new Map<string, { data: VKGroup[], timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

export class VKApi {
  // Проверить актуальность кэша
  private static isCacheValid(key: string): boolean {
    const cached = cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < CACHE_DURATION;
  }

  // Получить данные из кэша или выполнить запрос
  private static async getCachedOrFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    if (this.isCacheValid(key)) {
      return cache.get(key)!.data as T;
    }
    
    const data = await fetchFn();
    cache.set(key, { data: data as any, timestamp: Date.now() });
    return data;
  }

  private static async getAuthToken(): Promise<string> {
    try {
      const result = await vkBridge.send('VKWebAppGetAuthToken', {
        app_id: VK_APP_ID,
        scope: 'groups'
      });
      return result.access_token;
    } catch (error) {
      console.error('Ошибка получения токена:', error);
      throw new Error('Не удалось получить токен доступа');
    }
  }

  private static async makeVKRequest(method: string, params: Record<string, any>, retryCount = 0): Promise<any> {
    const token = await this.getAuthToken();
    
    try {
      // Используем VK Bridge для выполнения запросов к VK API
      const result = await vkBridge.send('VKWebAppCallAPIMethod', {
        method: method,
        params: {
          ...params,
          access_token: token,
          v: '5.131'
        }
      });
      
      if (result.response) {
        return result.response;
      } else {
        throw new Error('Пустой ответ от VK API');
      }
    } catch (error: any) {
      console.error('Ошибка VK API запроса:', error);
      
      // Обработка ошибок VK API
      if (error.error_data) {
        const errorCode = error.error_data.error_code;
        const errorMsg = error.error_data.error_msg;
        
        // Обработка ошибки превышения лимитов (код 6)
        if (errorCode === 6 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 1000; // Экспоненциальная задержка: 1s, 2s, 4s
          console.log(`Превышен лимит VK API, повторная попытка через ${delay}ms (попытка ${retryCount + 1}/3)`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return this.makeVKRequest(method, params, retryCount + 1);
        }
        
        if (errorCode === 260) {
          throw new Error('Доступ к списку сообществ запрещен настройками приватности');
        } else if (errorCode === 717) {
          throw new Error('Список сообществ недоступен');
        } else if (errorCode === 6) {
          throw new Error('Превышен лимит запросов к VK API. Попробуйте позже.');
        } else {
          throw new Error(`VK API error ${errorCode}: ${errorMsg}`);
        }
      }
      
      throw new Error(`Ошибка VK API: ${error.message || 'Неизвестная ошибка'}`);
    }
  }

  // Получить все сообщества пользователя с правами (админ, редактор, модератор, рекламодатель)
  static async getUserGroupsWithRights(): Promise<VKGroup[]> {
    return this.getCachedOrFetch('user_groups_with_rights', async () => {
      try {
        // Получаем сообщества последовательно, чтобы избежать превышения лимитов VK API
        const allGroups: VKGroup[] = [];
        
        // Функция для добавления задержки между запросами
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        
        // Получаем администраторские группы
        try {
          const adminGroups = await this.getAdminGroups();
          allGroups.push(...adminGroups);
        } catch (error) {
          console.warn('Ошибка получения администраторских групп:', error);
        }
        
        // Задержка между запросами
        await delay(500);
        
        // Получаем редакторские группы
        try {
          const editorGroups = await this.getEditorGroups();
          allGroups.push(...editorGroups);
        } catch (error) {
          console.warn('Ошибка получения редакторских групп:', error);
        }
        
        // Задержка между запросами
        await delay(500);
        
        // Получаем модераторские группы
        try {
          const moderatorGroups = await this.getModeratorGroups();
          allGroups.push(...moderatorGroups);
        } catch (error) {
          console.warn('Ошибка получения модераторских групп:', error);
        }
        
        // Задержка между запросами
        await delay(500);
        
        // Получаем рекламодательские группы
        try {
          const advertiserGroups = await this.getAdvertiserGroups();
          allGroups.push(...advertiserGroups);
        } catch (error) {
          console.warn('Ошибка получения рекламодательских групп:', error);
        }

        // Объединяем все группы и убираем дубликаты
        const uniqueGroups = this.removeDuplicateGroups(allGroups);
        console.log(`VK API: получено ${uniqueGroups.length} уникальных сообществ с правами`);

        return uniqueGroups;
      } catch (error) {
        console.error('Ошибка получения сообществ с правами:', error);
        throw error;
      }
    });
  }

  // Удалить дубликаты групп по ID
  private static removeDuplicateGroups(groups: VKGroup[]): VKGroup[] {
    const seen = new Set();
    return groups.filter(group => {
      if (seen.has(group.id)) {
        return false;
      }
      seen.add(group.id);
      return true;
    });
  }

  // Получить сообщества пользователя, где он является администратором
  static async getAdminGroups(): Promise<VKGroup[]> {
    return this.getCachedOrFetch('admin_groups', async () => {
      try {
        const response = await this.makeVKRequest('groups.get', {
          extended: 1,
          filter: 'admin',
          fields: 'activity,verified,description,members_count,role'
        });

        // Помечаем группы как администраторские
        const groups = response.items || [];
        return groups.map((group: VKGroup) => ({ ...group, source: 'admin' as const }));
      } catch (error) {
        console.error('Ошибка получения администраторских сообществ:', error);
        return [];
      }
    });
  }

  // Получить сообщества пользователя, где он является редактором
  static async getEditorGroups(): Promise<VKGroup[]> {
    return this.getCachedOrFetch('editor_groups', async () => {
      try {
        const response = await this.makeVKRequest('groups.get', {
          extended: 1,
          filter: 'editor',
          fields: 'activity,verified,description,members_count,role'
        });

        // Помечаем группы как редакторские
        const groups = response.items || [];
        return groups.map((group: VKGroup) => ({ ...group, source: 'editor' as const }));
      } catch (error) {
        console.error('Ошибка получения редакторских сообществ:', error);
        return [];
      }
    });
  }

  // Получить сообщества пользователя, где он является модератором
  static async getModeratorGroups(): Promise<VKGroup[]> {
    return this.getCachedOrFetch('moderator_groups', async () => {
      try {
        const response = await this.makeVKRequest('groups.get', {
          extended: 1,
          filter: 'moderator',
          fields: 'activity,verified,description,members_count,role'
        });

        // Помечаем группы как модераторские
        const groups = response.items || [];
        return groups.map((group: VKGroup) => ({ ...group, source: 'moderator' as const }));
      } catch (error) {
        console.error('Ошибка получения модераторских сообществ:', error);
        return [];
      }
    });
  }

  // Получить сообщества пользователя, где он является рекламодателем
  static async getAdvertiserGroups(): Promise<VKGroup[]> {
    return this.getCachedOrFetch('advertiser_groups', async () => {
      try {
        const response = await this.makeVKRequest('groups.get', {
          extended: 1,
          filter: 'advertiser',
          fields: 'activity,verified,description,members_count,role'
        });

        // Помечаем группы как рекламодательские
        const groups = response.items || [];
        return groups.map((group: VKGroup) => ({ ...group, source: 'advertiser' as const }));
      } catch (error) {
        console.error('Ошибка получения рекламодательских сообществ:', error);
        return [];
      }
    });
  }

  // Получить сообщества пользователя, где он является администратором (для обратной совместимости)
  static async getUserAdminGroups(): Promise<VKGroup[]> {
    try {
      const response = await this.makeVKRequest('groups.get', {
        extended: 1,
        filter: 'admin',
        fields: 'activity,verified,description,members_count,role'
      });

      return response.items || [];
    } catch (error) {
      console.error('Ошибка получения сообществ:', error);
      throw error;
    }
  }

  // Получить все сообщества пользователя
  static async getUserGroups(): Promise<VKGroup[]> {
    try {
      const response = await this.makeVKRequest('groups.get', {
        extended: 1,
        fields: 'activity,verified,description,members_count,role'
      });

      return response.items || [];
    } catch (error) {
      console.error('Ошибка получения сообществ:', error);
      throw error;
    }
  }

  // Получить информацию о конкретном сообществе
  static async getGroupInfo(groupId: number): Promise<VKGroup> {
    try {
      const response = await this.makeVKRequest('groups.getById', {
        group_id: groupId,
        fields: 'activity,verified,description,members_count,role'
      });

      return response[0];
    } catch (error) {
      console.error('Ошибка получения информации о сообществе:', error);
      throw error;
    }
  }

  // Получить детальную информацию о роли пользователя в сообществе
  static async getUserRoleInGroup(groupId: number): Promise<{ role: string; permissions: string[] }> {
    try {
      const response = await this.makeVKRequest('groups.getLongPollServer', {
        group_id: groupId
      });

      // Если можем получить Long Poll сервер, значит у нас есть права администратора
      return {
        role: 'admin',
        permissions: ['manage_group']
      };
    } catch (error) {
      // Если не можем получить Long Poll сервер, проверяем другие права
      try {
        const response = await this.makeVKRequest('groups.getSettings', {
          group_id: groupId
        });
        
        return {
          role: 'editor',
          permissions: ['edit_group']
        };
      } catch (settingsError) {
        // Если не можем получить настройки, проверяем членство
        try {
          const response = await this.makeVKRequest('groups.isMember', {
            group_id: groupId
          });
          
          if (response.member) {
            return {
              role: 'member',
              permissions: ['view_group']
            };
          } else {
            return {
              role: 'none',
              permissions: []
            };
          }
        } catch (memberError) {
          return {
            role: 'unknown',
            permissions: []
          };
        }
      }
    }
  }

  // Очистить кэш (для принудительного обновления данных)
  static clearCache(): void {
    cache.clear();
  }

  // Очистить кэш для конкретного типа групп
  static clearCacheForType(type: 'admin' | 'editor' | 'moderator' | 'advertiser'): void {
    const key = `${type}_groups`;
    cache.delete(key);
    // Также очищаем комбинированный кэш
    cache.delete('user_groups_with_rights');
  }

  // Очистить кэш комбинированных данных
  static clearCombinedCache(): void {
    cache.delete('user_groups_with_rights');
  }

  // Получить подписчиков сообщества (до 100 штук)
  static async getCommunityMembers(groupId: string | number): Promise<{ name: string; avatar: string }[]> {
    try {
      const response = await this.makeVKRequest('groups.getMembers', {
        group_id: groupId,
        fields: 'photo_100,first_name,last_name',
        count: 8 // для примера, можно увеличить до 100
      });
      return (response.items || []).map((user: any) => ({
        name: `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`,
        avatar: user.photo_100
      }));
    } catch (error) {
      console.error('Ошибка получения подписчиков:', error);
      return [];
    }
  }
} 