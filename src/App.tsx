import React from 'react';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { PlatformProvider } from './contexts/PlatformContext';
import Navigation from './navigation/Navigation';
import '@vkontakte/vkui/dist/vkui.css';
import './assets/styles/global.css';
import { Fonts } from './constants/Fonts';

import "./assets/styles/global.css"

import { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge';

interface AppProps {
  platform: 'ios' | 'android' | 'web' | undefined;
}

const App: React.FC<AppProps> = ({ platform }) => {
  const { vk_user_id } = parseURLSearchParamsForGetLaunchParams(window.location.search);
  const userId = vk_user_id !== undefined ? String(vk_user_id) : undefined;

  if (!userId) {
    return (
      <div style={{ padding: 32, textAlign: 'center', fontSize: 18 }}>
        Не удалось получить VK user ID.<br />
        Пожалуйста, откройте приложение через VK Mini Apps.
      </div>
    );
  }

  return (
    <PlatformProvider platform={platform} userId={userId}>
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <Fonts />
            <Navigation />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </PlatformProvider>
  );
};

export default App;