import React from 'react';
import { View, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import { RouterProvider, useRouteNavigator, useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Icon28AddCircleOutline, Icon28NewsfeedOutline, Icon28Notifications, Icon28UsersOutline } from '@vkontakte/icons';
import { router, DEFAULT_VIEW, PANELS } from '../routes';
// import Notifications from '@panels/Notifications/Notifications';
// import Raffles from '@panels/Raffles/Raffles';
// import Community from '@panels/Community/Community';
// import TestPanel from '@/panels/TestPanel/TestPanel';
import { CreateRaffle, Notifications } from '@panels';

import Raffles from '@panels/Raffles/Raffles';
import Community from '@panels/Community/Community';
import TestPanel from '@panels/TestPanel/TestPanel';
import FAQPanel from '@/panels/FAQPanel/FAQPanel';
import EditRaffle from '@/panels/EditRaffle/EditRaffle';

const Navigation: React.FC = () => {
  const routeNavigator = useRouteNavigator();
  const { panel: activePanel } = useActiveVkuiLocation();

  return (
    <RouterProvider router={router} navigator={routeNavigator}>
      <Epic
        activeStory={DEFAULT_VIEW}
        tabbar={
          <Tabbar>
            <TabbarItem
              selected={activePanel === PANELS.CREATE_RAFFLE}
              onClick={() => routeNavigator.push('/')}
              text="Создать"
            >
              <Icon28AddCircleOutline />
            </TabbarItem>
            <TabbarItem
              selected={activePanel === PANELS.RAFFLES}
              onClick={() => routeNavigator.push('/raffles')}
              text="Розыгрыши"
            >
              <Icon28NewsfeedOutline />
            </TabbarItem>
            <TabbarItem
              selected={activePanel === PANELS.NOTIFICATIONS}
              onClick={() => routeNavigator.push('/notifications')}
              text="Уведомления"
            >
              <Icon28Notifications />
            </TabbarItem>
            <TabbarItem
              selected={activePanel === PANELS.COMMUNITY}
              onClick={() => routeNavigator.push('/community')}
              text="Сообщество"
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
          <FAQPanel id={PANELS.FAQ_PANEL} />
          <EditRaffle id={PANELS.EDIT_RAFFLE_PANEL} />
        </View>
      </Epic>
    </RouterProvider>
  );
};

export default Navigation;