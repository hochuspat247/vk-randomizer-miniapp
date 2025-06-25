// Хуки для работы с API

import { useState, useEffect, useCallback } from 'react';
import { communitiesApi } from './community';
import { rafflesApi } from './raffle';
import { notificationsApi } from './notifications';
import { formatErrorMessage } from './utils';
import { CommunityCard } from '../types/community';
import { VKApi } from './vkApi';

// Общий интерфейс для состояния загрузки
interface LoadingState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Хук для работы с сообществами
export function useCommunities() {
  const [state, setState] = useState<{
    data: CommunityCard[] | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchCommunities = useCallback(async (forceRefresh = false) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Если требуется принудительное обновление, очищаем кэш
      if (forceRefresh) {
        VKApi.clearCache();
      }
      
      const data = await communitiesApi.getCards();
      setState({ data, loading: false, error: null });
    } catch (error: any) {
      const errorMessage = error.message || 'Ошибка загрузки сообществ';
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage 
      }));
    }
  }, []);

  const refetch = useCallback(() => fetchCommunities(false), [fetchCommunities]);
  const refresh = useCallback(() => fetchCommunities(true), [fetchCommunities]);

  const createCommunity = useCallback(async (communityData: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const newCommunity = await communitiesApi.createCard(communityData);
      setState(prev => ({ 
        data: prev.data ? [...prev.data, newCommunity] : [newCommunity], 
        loading: false, 
        error: null 
      }));
      return newCommunity;
    } catch (error: any) {
      const errorMessage = error.message || 'Ошибка создания сообщества';
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage 
      }));
      throw error;
    }
  }, []);

  const updateCommunity = useCallback(async (id: string, communityData: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const updatedCommunity = await communitiesApi.updateCard(id, communityData);
      setState(prev => ({ 
        data: prev.data?.map(item => 
          item.id === id ? updatedCommunity : item
        ) || null, 
        loading: false, 
        error: null 
      }));
      return updatedCommunity;
    } catch (error: any) {
      const errorMessage = error.message || 'Ошибка обновления сообщества';
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage 
      }));
      throw error;
    }
  }, []);

  const deleteCommunity = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await communitiesApi.deleteCard(id);
      setState(prev => ({ 
        data: prev.data?.filter(item => item.id !== id) || null, 
        loading: false, 
        error: null 
      }));
    } catch (error: any) {
      const errorMessage = error.message || 'Ошибка удаления сообщества';
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage 
      }));
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  return {
    ...state,
    refetch,
    refresh,
    createCommunity,
    updateCommunity,
    deleteCommunity,
  };
}

// Хук для работы с розыгрышами
export function useRaffles() {
  const [state, setState] = useState<LoadingState<any[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchRaffles = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await rafflesApi.getRaffles();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: formatErrorMessage(error) 
      });
    }
  }, []);

  const createRaffle = useCallback(async (raffleData: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const newRaffle = await rafflesApi.createRaffle(raffleData);
      setState(prev => ({ 
        data: prev.data ? [...prev.data, newRaffle] : [newRaffle], 
        loading: false, 
        error: null 
      }));
      return newRaffle;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: formatErrorMessage(error) 
      }));
      throw error;
    }
  }, []);

  const updateRaffle = useCallback(async (id: string, raffleData: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const updatedRaffle = await rafflesApi.updateRaffle(id, raffleData);
      setState(prev => ({ 
        data: prev.data?.map(item => 
          item.raffleId === id ? updatedRaffle : item
        ) || null, 
        loading: false, 
        error: null 
      }));
      return updatedRaffle;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: formatErrorMessage(error) 
      }));
      throw error;
    }
  }, []);

  const deleteRaffle = useCallback(async (id: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await rafflesApi.deleteRaffle(id);
      setState(prev => ({ 
        data: prev.data?.filter(item => item.raffleId !== id) || null, 
        loading: false, 
        error: null 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: formatErrorMessage(error) 
      }));
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchRaffles();
  }, [fetchRaffles]);

  return {
    ...state,
    refetch: fetchRaffles,
    createRaffle,
    updateRaffle,
    deleteRaffle,
  };
}

// Хук для работы с уведомлениями
export function useNotifications() {
  const [state, setState] = useState<LoadingState<any[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchNotifications = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await notificationsApi.getNotifications();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: formatErrorMessage(error) 
      });
    }
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationsApi.markAsRead(id);
      setState(prev => ({ 
        data: prev.data?.map(item => 
          item.id === id ? { ...item, new: false } : item
        ) || null, 
        loading: false, 
        error: null 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: formatErrorMessage(error) 
      }));
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsApi.markAllAsRead();
      setState(prev => ({ 
        data: prev.data?.map(item => ({ ...item, new: false })) || null, 
        loading: false, 
        error: null 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: formatErrorMessage(error) 
      }));
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    ...state,
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
} 