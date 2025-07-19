// src/api/notificationApi.ts

import httpClient from './httpClient';

export interface NotificationSettings {
  win_notify: boolean;
  start_notify: boolean;
  finish_notify: boolean;
  widget_notify: boolean;
  banner: boolean;
  sound: boolean;
  dnd_until?: string;
}

const BASE = '/api/v1/notification-settings';

export const notificationApi = {
  // GET /api/v1/notification-settings/{user_id}
  getSettings(userId: string): Promise<NotificationSettings> {
    return httpClient.get<NotificationSettings>(`${BASE}/${userId}`);
  },

//   PUT /api/v1/notification-settings/{user_id}
  updateSettings(
    userId: string,
    payload: Partial<NotificationSettings>
  ): Promise<NotificationSettings> {
    return httpClient.put<NotificationSettings>(`${BASE}/${userId}`, payload);
  },
};
