import React from 'react';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { PlatformProvider } from './contexts/PlatformContext';
import Navigation from './navigation/Navigation';
import '@vkontakte/vkui/dist/vkui.css';

import { Fonts } from './constants/Fonts';


interface AppProps {
  platform: 'ios' | 'android' | 'web' | undefined;
}

const App: React.FC<AppProps> = ({ platform }) => {
  return (
    <PlatformProvider platform={platform}>
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <Fonts/>
            <Navigation />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </PlatformProvider>
  );
};

export default App;