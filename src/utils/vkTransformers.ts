import { VKGroup } from '@/api/vkApi';
import { CommunityCard } from '@/types/community';

// Функция для форматирования числа участников
function formatMembersCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

// Функция для определения типа роли на основе реальных данных VK
function getAdminType(group: VKGroup): 'owner' | 'admin' | 'editor' | 'moderator' | 'member' | 'advertiser' {
  // Если есть поле source, используем его для точного определения роли
  if (group.source) {
    switch (group.source) {
      case 'admin':
        // Для администраторов определяем тип
        if (group.type === 'page') {
          return 'owner';
        } else if (group.is_owner === 1) {
          return 'owner';
        }
        return 'admin';
      case 'editor':
        return 'editor';
      case 'moderator':
        return 'moderator';
      case 'advertiser':
        return 'advertiser';
    }
  }

  // Если source нет, используем старую логику как fallback
  // Сначала проверяем поле role, если оно есть
  if (group.role) {
    switch (group.role.toLowerCase()) {
      case 'owner':
      case 'creator':
        return 'owner';
      case 'admin':
      case 'administrator':
        return 'admin';
      case 'editor':
        return 'editor';
      case 'moderator':
        return 'moderator';
      case 'member':
        return 'member';
      default:
        break;
    }
  }

  // Если role не определен, используем логику на основе полей is_admin и is_advertiser
  // Приоритет: рекламодатель > администратор > участник
  
  // Проверяем рекламодателя (это отдельный фильтр)
  if (group.is_advertiser === 1) {
    return 'advertiser';
  }

  // Если пользователь администратор, определяем тип администратора
  if (group.is_admin === 1) {
    // Проверяем тип группы для определения владельца
    if (group.type === 'page') {
      // Для страниц (pages) обычно владелец
      return 'owner';
    } else if (group.type === 'group') {
      // Для групп проверяем дополнительные поля
      if (group.is_owner === 1) {
        return 'owner';
      }
      // Если нет дополнительной информации, считаем администратором
      return 'admin';
    }
    // Для других типов тоже считаем администратором
    return 'admin';
  }

  // Если пользователь не администратор, но является участником
  if (group.is_member === 1) {
    return 'member';
  }

  // По умолчанию считаем участником
  return 'member';
}

// Функция для определения статуса сообщества
function getCommunityStatus(group: VKGroup): 'green' | 'yellow' | 'red' {
  // Логика определения статуса может быть настроена под ваши требования
  // Например, на основе количества участников, активности и т.д.
  
  if (group.members_count > 10000) {
    return 'green';
  } else if (group.members_count > 1000) {
    return 'yellow';
  } else {
    return 'red';
  }
}

// Функция для получения описания кнопки на основе роли
function getButtonDescription(role: 'owner' | 'admin' | 'editor' | 'moderator' | 'member' | 'advertiser'): string {
  switch (role) {
    case 'owner':
      return 'Управлять';
    case 'admin':
      return 'Настроить';
    case 'editor':
      return 'Редактировать';
    case 'moderator':
      return 'Модерировать';
    case 'advertiser':
      return 'Рекламировать';
    case 'member':
      return 'Просмотреть';
    default:
      return 'Открыть';
  }
}

// Функция для получения текста состояния
function getStateText(status: 'green' | 'yellow' | 'red'): string {
  switch (status) {
    case 'green':
      return 'Активно';
    case 'yellow':
      return 'Требует внимания';
    case 'red':
      return 'Неактивно';
    default:
      return 'Неизвестно';
  }
}

// Основная функция преобразования VK группы в CommunityCard
export function transformVKGroupToCommunityCard(group: VKGroup): CommunityCard {
  const role = getAdminType(group);
  const status = getCommunityStatus(group);
  
  return {
    id: group.id.toString(),
    name: group.name,
    nickname: group.screen_name || `club${group.id}`,
    membersCount: formatMembersCount(group.members_count),
    raffleCount: '0', // По умолчанию 0, может быть получено из другого API
    adminType: role, // Теперь используем реальную роль
    avatarUrl: group.photo_200 || group.photo_100 || group.photo_50,
    status,
    buttonDesc: getButtonDescription(role),
    stateText: getStateText(status)
  };
}

// Функция для преобразования массива VK групп
export function transformVKGroupsToCommunityCards(groups: VKGroup[]): CommunityCard[] {
  return groups.map(transformVKGroupToCommunityCard);
}

// Функция для фильтрации только административных групп
export function filterAdminGroups(groups: VKGroup[]): VKGroup[] {
  return groups.filter(group => group.is_admin === 1);
}

// Функция для получения отображаемого названия роли
export function getRoleDisplayName(role: 'owner' | 'admin' | 'editor' | 'moderator' | 'member' | 'advertiser'): string {
  switch (role) {
    case 'owner':
      return 'Владелец';
    case 'admin':
      return 'Администратор';
    case 'editor':
      return 'Редактор';
    case 'moderator':
      return 'Модератор';
    case 'advertiser':
      return 'Рекламодатель';
    case 'member':
      return 'Участник';
    default:
      return 'Неизвестно';
  }
} 