import { createHashRouter } from '@vkontakte/vk-mini-apps-router';

export const router = createHashRouter([
  {
    path: '/createRaffle',
    panel: 'createRaffle',
    view: 'default',
  },
   {
    path: '/',
    panel: 'raffles',
    view: 'default',
  },
  {
    path: '/notifications',
    panel: 'notifications',
    view: 'default',
  },
]);

export const DEFAULT_VIEW = 'default';
export const DEFAULT_ROOT = 'default_root';
export const PANELS = {
  CREATE_RAFFLE: 'createRaffle',
  NOTIFICATIONS: 'notifications',
  RAFFLES: 'raffles',
};
