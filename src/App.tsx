import React from 'react';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { PlatformProvider } from './contexts/PlatformContext';
import { usePlatform } from './hooks/usePlatform';
import Navigation from './navigation/Navigation';
import '@vkontakte/vkui/dist/vkui.css';

const App: React.FC = () => {
  const platform = usePlatform();

  return (
    <PlatformProvider platform={platform}>
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <Navigation />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </PlatformProvider>
  );
};

export default App;
