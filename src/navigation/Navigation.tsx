import React from 'react';
import { View } from '@vkontakte/vkui';
import { RouterProvider, useRouteNavigator, useRouteResolver } from '@vkontakte/vk-mini-apps-router';
import { router, DEFAULT_VIEW, PANELS } from '../routes';
import CreateRaffle from '../panels/CreateRaffle/CreateRaffle';
import Notifications from '../panels/Notifications/Notifications';

const Navigation: React.FC = () => {
  const routeNavigator = useRouteNavigator();
  const routeResolver = useRouteResolver();

  return (
    <RouterProvider router={router} navigator={routeNavigator} resolver={routeResolver}>
      <View activePanel={routeResolver.activePanel} nav={DEFAULT_VIEW}>
        <CreateRaffle id={PANELS.CREATE_RAFFLE} />
        <Notifications id={PANELS.NOTIFICATIONS} />
      </View>
    </RouterProvider>
  );
};

export default Navigation;
