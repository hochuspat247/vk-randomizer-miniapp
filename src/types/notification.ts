// Типы для уведомлений

export interface CompletedNotification {
  type: 'completed';
  raffleId: number;
  participantsCount: number;
  winners: string[];
  reasonEnd: string;
  new: boolean;
}

export interface WarningNotification {
  type: 'warning';
  warningTitle: string;
  warningDescription: string[];
  new: boolean;
}

export interface ErrorNotification {
  type: 'error';
  errorTitle: string;
  errorDescription: string;
  new: boolean;
}

export type NotificationCard = CompletedNotification | WarningNotification | ErrorNotification;

export interface CreateNotificationRequest {
  type: 'completed' | 'warning' | 'error';
  raffleId?: number;
  participantsCount?: number;
  winners?: string[];
  reasonEnd?: string;
  warningTitle?: string;
  warningDescription?: string[];
  errorTitle?: string;
  errorDescription?: string;
  new: boolean;
}

export interface UpdateNotificationRequest {
  type?: 'completed' | 'warning' | 'error';
  raffleId?: number;
  participantsCount?: number;
  winners?: string[];
  reasonEnd?: string;
  warningTitle?: string;
  warningDescription?: string[];
  errorTitle?: string;
  errorDescription?: string;
  new?: boolean;
}
