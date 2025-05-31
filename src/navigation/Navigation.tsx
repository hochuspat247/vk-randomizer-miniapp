import React from 'react';
import { View } from '@vkontakte/vkui';
import { RouterProvider, useRouteNavigator, useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { router, DEFAULT_VIEW, PANELS } from '../routes';
import CreateRaffle from '../panels/CreateRaffle/CreateRaffle';
import Notifications from '../panels/Notifications/Notifications';
import Raffles from '../panels/Raffles/Raffles';

const Navigation: React.FC = () => {
  const routeNavigator = useRouteNavigator();
  const { panel: activePanel } = useActiveVkuiLocation(); // Получаем активную панель

  return (
    <RouterProvider router={router} navigator={routeNavigator}>
      <View activePanel={activePanel || PANELS.CREATE_RAFFLE} nav={DEFAULT_VIEW}>
        <CreateRaffle id={PANELS.CREATE_RAFFLE} />
        <Notifications id={PANELS.NOTIFICATIONS} />
        <Raffles id={PANELS.RAFFLES} />
      </View>
    </RouterProvider>
  );
};

export default Navigation;