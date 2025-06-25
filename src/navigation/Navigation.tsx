import React from 'react';
import { View, Epic, Tabbar, TabbarItem, ConfigProvider } from '@vkontakte/vkui';
import { RouterProvider, useRouteNavigator, useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Icon28AddCircleOutline, Icon28NewsfeedOutline, Icon28Notifications, Icon28UsersOutline } from '@vkontakte/icons';
import { router, DEFAULT_VIEW, PANELS } from '../routes';
// import Notifications from '@panels/Notifications/Notifications';
// import Raffles from '@panels/Raffles/Raffles';
// import Community from '@panels/Community/Community';
// import TestPanel from '@/panels/TestPanel/TestPanel';
import CreateRaffle from '@/panels/CreateRaffle/CreateRaffle';
import Notifications from '@/panels/Notifications/Notifications';

import Raffles from '@panels/Raffles/Raffles';
import Community from '@panels/Community/Community';
import TestPanel from '@panels/TestPanel/TestPanel';
import MainPanel from '@/panels/MainPanel/MainPanel';
import FAQPanel from '@/panels/FAQPanel/FAQPanel';
import EditRaffle from '@/panels/EditRaffle/EditRaffle';
import PreviewPanel from '@/panels/PreviewPanel/PreviewPanel';

const Navigation: React.FC = () => {
  const routeNavigator = useRouteNavigator();
  const { panel: activePanel } = useActiveVkuiLocation();

  return (
    <RouterProvider router={router}>
      <ConfigProvider colorScheme="dark">
        <Epic
          activeStory={DEFAULT_VIEW}
          tabbar={
            <Tabbar>
              <TabbarItem
                selected={activePanel === PANELS.CREATE_RAFFLE}
                onClick={() => routeNavigator.push('/')}
                aria-label="Создать розыгрыш"
              >
                <Icon28AddCircleOutline />
              </TabbarItem>
              <TabbarItem
                selected={activePanel === PANELS.RAFFLES}
                onClick={() => routeNavigator.push('/raffles')}
                aria-label="Просмотр розыгрышей"
              >
                <Icon28NewsfeedOutline />
              </TabbarItem>
              <TabbarItem
                selected={activePanel === PANELS.NOTIFICATIONS}
                onClick={() => routeNavigator.push('/notifications')}
                aria-label="Просмотр уведомлений"
              >
                <Icon28Notifications />
              </TabbarItem>
              <TabbarItem
                selected={activePanel === PANELS.COMMUNITY}
                onClick={() => routeNavigator.push('/community')}
                aria-label="Управление сообществом"
              >
                <Icon28UsersOutline />
              </TabbarItem>
            </Tabbar>
          }
        >
          <View activePanel={activePanel || PANELS.CREATE_RAFFLE} nav={DEFAULT_VIEW}>
            <CreateRaffle id={PANELS.CREATE_RAFFLE} />
            <Notifications id={PANELS.NOTIFICATIONS} />
            <Raffles id={PANELS.RAFFLES} />
            <Community id={PANELS.COMMUNITY} />
            <TestPanel id={PANELS.TEST_PANEL} />
            <MainPanel id={PANELS.MAIN_PANEL}/>
            <FAQPanel id={PANELS.FAQ_PANEL} />
            <EditRaffle id={PANELS.EDIT_RAFFLE_PANEL} />
            <PreviewPanel id={PANELS.PREVIEW_PANEL} />
          </View>
        </Epic>
      </ConfigProvider>
    </RouterProvider>
  );
};

export default Navigation;