import { createHashRouter } from '@vkontakte/vk-mini-apps-router';

export const router = createHashRouter([
  {
    path: '/createRaffle',
    panel: 'createRaffle',
    view: 'default',
  },
  {
    path: '/',
    panel: 'mainpanel',
    view: 'default',
  },
  {
    path: '/previewpanel',
    panel: 'previewpanel',
    view: 'default',
  },
  {
    path: '/previewpanel/:id',
    panel: 'previewpanel',
    view: 'default',
  },
   {
    path: '/faqpanel',
    panel: 'faqpanel',
    view: 'default',
  },
  {
    path: '/editrafflepanel',
    panel: 'editrafflepanel',
    view: 'default',
  },
  {
    path: '/editraffle/:id',
    panel: 'editrafflepanel',
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
  {
    path: '/dontdisturb',
    panel: 'dontdisturb',
    view: 'default',
  },
  {
    path: '/settingspanel',
    panel: 'settingspanel',
    view: 'default',
  },
  {
    path: '/notificationsettingspanel',
    panel: 'notificationsettingspanel',
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
  MAIN_PANEL: 'mainpanel',
  FAQ_PANEL: 'faqpanel',
  EDIT_RAFFLE_PANEL: 'editrafflepanel',
  PREVIEW_PANEL: 'previewpanel',
  DONT_DISTURB: 'dontdisturb',
  SETTINGS_PANEL: 'settingspanel',
  NOTIFICATION_SETTINGS_PANEL: 'notificationsettingspanel',
};
