// Запросы для работы с уведомлениями

import httpClient from './httpClient';
import { 
  NotificationCard, 
  CreateNotificationRequest, 
  UpdateNotificationRequest 
} from '../types/notification';

const NOTIFICATION_CARDS_API_BASE = '/api/v1/notification-cards';

export const notificationsApi = {
  // Получить список всех уведомлений
  async getNotifications(): Promise<NotificationCard[]> {
    const response = await httpClient.get<{ notifications: NotificationCard[] }>(`${NOTIFICATION_CARDS_API_BASE}/`);
    return response.notifications;
  },

  // Получить уведомление по ID
  async getNotificationById(notificationId: string): Promise<NotificationCard> {
    return httpClient.get<NotificationCard>(`${NOTIFICATION_CARDS_API_BASE}/${notificationId}`);
  },

  // Создать новое уведомление
  async createNotification(notificationData: CreateNotificationRequest): Promise<NotificationCard> {
    return httpClient.post<NotificationCard>(`${NOTIFICATION_CARDS_API_BASE}/`, notificationData);
  },

  // Полностью обновить уведомление
  async updateNotification(notificationId: string, notificationData: CreateNotificationRequest): Promise<NotificationCard> {
    return httpClient.put<NotificationCard>(`${NOTIFICATION_CARDS_API_BASE}/${notificationId}`, notificationData);
  },

  // Частично обновить уведомление
  async patchNotification(notificationId: string, notificationData: UpdateNotificationRequest): Promise<NotificationCard> {
    return httpClient.patch<NotificationCard>(`${NOTIFICATION_CARDS_API_BASE}/${notificationId}`, notificationData);
  },

  // Удалить уведомление
  async deleteNotification(notificationId: string): Promise<void> {
    return httpClient.delete<void>(`${NOTIFICATION_CARDS_API_BASE}/${notificationId}`);
  },

  // Получить новые уведомления
  async getNewNotifications(): Promise<NotificationCard[]> {
    const allNotifications = await this.getNotifications();
    return allNotifications.filter(notification => notification.new);
  },

  // Получить уведомления по типу
  async getNotificationsByType(type: 'completed' | 'warning' | 'error'): Promise<NotificationCard[]> {
    const allNotifications = await this.getNotifications();
    return allNotifications.filter(notification => notification.type === type);
  },

  // Отметить уведомление как прочитанное
  async markAsRead(notificationId: string): Promise<NotificationCard> {
    return this.patchNotification(notificationId, { new: false });
  },

  // Отметить все уведомления как прочитанные
  async markAllAsRead(): Promise<void> {
    const newNotifications = await this.getNewNotifications();
    const promises = newNotifications.map((notification, index) => 
      this.markAsRead(index.toString())
    );
    await Promise.all(promises);
  }
};

export default notificationsApi; 