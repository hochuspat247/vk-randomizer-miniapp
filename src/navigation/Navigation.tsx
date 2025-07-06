import React from 'react';
import { View, Epic, Tabbar, TabbarItem, ConfigProvider } from '@vkontakte/vkui';
import { RouterProvider, useRouteNavigator, useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Icon28AddCircleOutline, Icon28NewsfeedOutline, Icon28Notifications, Icon28UsersOutline } from '@vkontakte/icons';
import { router, DEFAULT_VIEW, PANELS } from '../routes';
import CreateRaffle from '@/panels/CreateRaffle/CreateRaffle';
import Notifications from '@/panels/Notifications/Notifications';

import Raffles from '@panels/Raffles/Raffles';
import Community from '@panels/Community/Community';
import TestPanel from '@panels/TestPanel/TestPanel';
import MainPanel from '@/panels/MainPanel/MainPanel';
import FAQPanel from '@/panels/FAQPanel/FAQPanel';
import EditRaffle from '@/panels/EditRaffle/EditRaffle';
import PreviewPanel from '@/panels/PreviewPanel/PreviewPanel';
import { DontDisturbPanelPanel } from '@/panels/DontDisturbPanel/DontDisturbPanel';
import SettingsPanel from '@/panels/SettingsPanel/SettingsPanel';
import NotificationSettingsPanel from '@/panels/NotificationSettingsPanel/NotificationSettingsPanel';

const Navigation: React.FC = () => {
  const routeNavigator = useRouteNavigator();
  const { panel: activePanel } = useActiveVkuiLocation();

  return (
    <RouterProvider router={router}>
      <ConfigProvider colorScheme="dark">
        <Epic
          activeStory={DEFAULT_VIEW}
        >
          <View activePanel={activePanel || PANELS.CREATE_RAFFLE} nav={DEFAULT_VIEW}>
            <CreateRaffle id={PANELS.CREATE_RAFFLE} />
            <Raffles id={PANELS.RAFFLES} />
            <Community id={PANELS.COMMUNITY} />
            <TestPanel id={PANELS.TEST_PANEL} />
            <MainPanel id={PANELS.MAIN_PANEL}/>
            <FAQPanel id={PANELS.FAQ_PANEL} />
            <EditRaffle id={PANELS.EDIT_RAFFLE_PANEL} />
            <PreviewPanel id={PANELS.PREVIEW_PANEL} />
            <DontDisturbPanelPanel id={PANELS.DONT_DISTURB} />
            <SettingsPanel id={PANELS.SETTINGS_PANEL} />
            <NotificationSettingsPanel id={PANELS.NOTIFICATION_SETTINGS_PANEL} />
          </View>
        </Epic>
      </ConfigProvider>
    </RouterProvider>
  );
};

export default Navigation;