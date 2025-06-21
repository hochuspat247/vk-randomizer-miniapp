import { createHashRouter } from '@vkontakte/vk-mini-apps-router';

export const router = createHashRouter([
  {
    path: '/',
    panel: 'createRaffle',
    view: 'default',
  },
   {
    path: '/raffles',
    panel: 'raffles',
    view: 'default',
  },
  {
    path: '/notifications',
    panel: 'notifications',
    view: 'default',
  },
 {
    path: '/community',
    panel: 'community',
    view: 'default',
  },
  {
    path: '/testPanel',
    panel: 'testPanel',
    view: 'default',
  },
]);

export const DEFAULT_VIEW = 'default';
export const DEFAULT_ROOT = 'default_root';
export const PANELS = {
  CREATE_RAFFLE: 'createRaffle',
  NOTIFICATIONS: 'notifications',
  RAFFLES: 'raffles',
  COMMUNITY: 'community',
  TEST_PANEL: "testPanel",

};
