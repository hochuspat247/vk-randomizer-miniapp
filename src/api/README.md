# API Documentation

Эта папка содержит все API функции для работы с сервером.

## Структура

```
src/api/
├── index.ts              # Главный файл экспорта
├── httpClient.ts         # Базовый HTTP клиент
├── community.ts          # API для работы с сообществами
├── raffle.ts            # API для работы с розыгрышами
├── notifications.ts     # API для работы с уведомлениями
├── hooks.ts             # React хуки для работы с API
├── utils.ts             # Утилиты для API
├── constants.ts         # Константы API
└── README.md           # Эта документация
```

## Использование

### Импорт API функций

```typescript
import { 
  communitiesApi, 
  rafflesApi, 
  notificationsApi,
  useCommunities,
  useRaffles,
  useNotifications
} from '@/api';
```

### Работа с сообществами

```typescript
// Получить все сообщества
const communities = await communitiesApi.getCards();

// Создать новое сообщество
const newCommunity = await communitiesApi.createCard({
  id: "1",
  name: "Техно-сообщество",
  nickname: "@techclub",
  membersCount: "12 500",
  raffleCount: "8",
  adminType: "owner",
  avatarUrl: "https://example.com/avatar.jpg",
  status: "green",
  buttonDesc: "Последнее изменение: 14.10 21:31 – Администратор",
  stateText: "Активен"
});

// Обновить сообщество
const updatedCommunity = await communitiesApi.updateCard("1", {
  // ... данные для обновления
});

// Удалить сообщество
await communitiesApi.deleteCard("1");
```

### Работа с розыгрышами

```typescript
// Получить все розыгрыши
const raffles = await rafflesApi.getRaffles();

// Получить активные розыгрыши
const activeRaffles = await rafflesApi.getActiveRaffles();

// Создать новый розыгрыш
const newRaffle = await rafflesApi.createRaffle({
  raffleId: "492850",
  name: "Казань 24 – Новости",
  textRaffleState: "Активно",
  winnersCount: 5,
  mode: "both",
  memberCount: "27",
  timeLeft: "2Д 9Ч 21М",
  progress: 99,
  lastModified: "14.10.2025 21:31",
  modifiedBy: "Администратор",
  statusСommunity: "error",
  statusNestedCard: "green",
  statusNestedText: "Недостаточно прав",
  nickname: "@mosnews24",
  membersCountNested: "522K",
  adminType: "admin"
});
```

### Работа с уведомлениями

```typescript
// Получить все уведомления
const notifications = await notificationsApi.getNotifications();

// Получить новые уведомления
const newNotifications = await notificationsApi.getNewNotifications();

// Отметить уведомление как прочитанное
await notificationsApi.markAsRead("1");

// Отметить все уведомления как прочитанные
await notificationsApi.markAllAsRead();
```

### Использование React хуков

```typescript
function CommunitiesList() {
  const { data: communities, loading, error, refetch } = useCommunities();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      {communities?.map(community => (
        <div key={community.id}>{community.name}</div>
      ))}
    </div>
  );
}
```

## Конфигурация

### Переменные окружения

Создайте файл `.env` в корне проекта:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### Настройка HTTP клиента

HTTP клиент автоматически обрабатывает:
- Ошибки сети
- Ошибки валидации (422)
- Ошибки "не найдено" (404)
- Серверные ошибки (5xx)

## Типы данных

Все типы данных определены в папке `src/types/`:

- `CommunityCard` - карточка сообщества
- `RaffleCard` - карточка розыгрыша
- `NotificationCard` - карточка уведомления

## Обработка ошибок

```typescript
import { formatErrorMessage, isNetworkError } from '@/api';

try {
  const data = await communitiesApi.getCards();
} catch (error) {
  if (isNetworkError(error)) {
    console.log('Ошибка сети');
  } else {
    console.log('Ошибка:', formatErrorMessage(error));
  }
}
```

## Утилиты

```typescript
import { retry, delay, removeEmptyFields } from '@/api';

// Повторить запрос с задержкой
const data = await retry(() => communitiesApi.getCards(), 3, 1000);

// Создать задержку
await delay(1000);

// Удалить пустые поля из объекта
const cleanData = removeEmptyFields({ name: "test", empty: "" });
// Результат: { name: "test" }
```

# VK API Integration для сообществ

## Описание

Этот модуль обеспечивает интеграцию с VK API для загрузки сообществ пользователя с отображением реальных ролей пользователя в каждом сообществе.

## Основные компоненты

### 1. VKApi (`vkApi.ts`)
Класс для работы с VK API через VK Bridge:
- `getUserGroupsWithRights()` - получение всех сообществ с правами пользователя
- `getUserAdminGroups()` - получение сообществ, где пользователь является администратором
- `getUserGroups()` - получение всех сообществ пользователя
- `getGroupInfo(groupId)` - получение информации о конкретном сообществе
- `getUserRoleInGroup(groupId)` - получение детальной информации о роли пользователя

### 2. Transformers (`vkTransformers.ts`)
Утилиты для преобразования данных VK API в формат приложения:
- `transformVKGroupToCommunityCard()` - преобразование VK группы в карточку сообщества
- `transformVKGroupsToCommunityCards()` - преобразование массива групп
- `filterAdminGroups()` - фильтрация только административных групп
- `getRoleDisplayName()` - получение человекочитаемого названия роли

### 3. Community API (`community.ts`)
Обновленный API для работы с сообществами через VK API:
- `getCards()` - получение карточек сообществ из VK API (все роли)
- `getAdminGroups()` - получение только административных сообществ
- `getAllUserGroups()` - получение всех сообществ пользователя
- `getCardById()` - получение конкретного сообщества по ID

## Роли пользователя

Система поддерживает следующие роли пользователя в сообществах:

### 1. **Владелец** (`owner`)
- Полные права на управление сообществом
- Может изменять настройки, добавлять/удалять администраторов
- Иконка: 💎 (бриллиант)

### 2. **Администратор** (`admin`)
- Права на управление сообществом
- Может модерировать контент, управлять участниками
- Иконка: 👑 (корона)

### 3. **Редактор** (`editor`)
- Права на редактирование контента
- Может публиковать и редактировать записи
- Иконка: 📌 (булавка)

### 4. **Модератор** (`moderator`)
- Права на модерацию контента
- Может удалять комментарии, блокировать пользователей
- Иконка: ❓ (знак вопроса)

### 5. **Рекламодатель** (`advertiser`)
- Права на размещение рекламы
- Может размещать рекламные записи от имени сообщества
- Иконка: 📢 (мегафон)

### 6. **Участник** (`member`)
- Обычный участник сообщества
- Только просмотр контента
- Иконка: 👥 (пользователи)

## Настройка

### 1. ID приложения
ID приложения настраивается в файле `constants.ts`:
```typescript
export const VK_APP_ID = 53488132; // Замените на ваш ID приложения
```

### 2. Разрешения
Приложение запрашивает разрешение `groups` для доступа к сообществам пользователя.

### 3. VK Bridge
Все запросы к VK API выполняются через VK Bridge методом `VKWebAppCallAPIMethod`, что решает проблемы с CORS.

### 4. Обработка ошибок
Реализована обработка основных ошибок VK API:
- `260` - Доступ к списку сообществ запрещен настройками приватности
- `717` - Список сообществ недоступен
- Ошибки токена доступа

## Использование

### В компонентах
```typescript
import { useCommunities } from '@/api/hooks';

const { data: communities, loading, error, refetch } = useCommunities();
```

### Прямое использование VK API
```typescript
import { VKApi } from '@/api/vkApi';

// Получить все сообщества с правами
const groups = await VKApi.getUserGroupsWithRights();

// Получить только административные сообщества
const adminGroups = await VKApi.getUserAdminGroups();
```

### Получение названия роли
```typescript
import { getRoleDisplayName } from '@/utils/vkTransformers';

const roleName = getRoleDisplayName('admin'); // "Администратор"
const advertiserName = getRoleDisplayName('advertiser'); // "Рекламодатель"
```

## Особенности

1. **VK Bridge интеграция**: Все запросы выполняются через VK Bridge, что решает проблемы с CORS
2. **Реальные роли**: Отображение реальных ролей пользователя в каждом сообществе
3. **Все права**: Загружаются сообщества где у пользователя есть любые права (не только админ)
4. **Форматирование данных**: Автоматическое форматирование количества участников (K, M)
5. **Определение статуса**: Статус сообщества определяется на основе количества участников
6. **Обработка ошибок**: Детальная обработка ошибок VK API с понятными сообщениями

## Требования

- VK Bridge должен быть инициализирован
- Пользователь должен предоставить разрешение на доступ к сообществам
- Приложение должно быть настроено в VK Developer Portal

## Технические детали

### VK Bridge методы
- `VKWebAppGetAuthToken` - получение токена доступа
- `VKWebAppCallAPIMethod` - выполнение запросов к VK API

### Параметры запросов
- `extended: 1` - получение полной информации о группах
- `fields: 'activity,verified,description,members_count,role'` - дополнительные поля включая роль

### Определение ролей
Роли определяются на основе:
1. Поля `role` из VK API (если доступно)
2. Поля `is_advertiser` для рекламодателей
3. Поля `is_admin` и `type` группы
4. Поля `is_member` для обычных участников

### Фильтрация сообществ
Метод `getUserGroupsWithRights()` возвращает сообщества где пользователь имеет:
- Права администратора (`is_admin === 1`)
- Права рекламодателя (`is_advertiser === 1`)
- Роль редактора (`role === 'editor'`)
- Роль модератора (`role === 'moderator'`)
- Роль администратора (`role === 'admin'`)
- Роль владельца (`role === 'owner'`) 