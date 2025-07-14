import React, { createContext, useContext, ReactNode } from 'react';

// Определяем типы для платформы
type PlatformType = 'ios' | 'android' | 'web' | undefined;

// Создаем контекст
interface PlatformContextType {
  platform: PlatformType;
  userId?: string;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

// Создаем провайдер
interface PlatformProviderProps {
  platform: PlatformType;
  userId?: string;
  children: ReactNode;
}

export const PlatformProvider: React.FC<PlatformProviderProps> = ({ platform, userId, children }) => {
  return (
    <PlatformContext.Provider value={{ platform, userId }}>
      {children}
    </PlatformContext.Provider>
  );
};

// Хук для использования контекста
export const usePlatformContext = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatformContext must be used within a PlatformProvider');
  }
  return context;
};