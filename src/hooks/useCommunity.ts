// Хук для работы с сообществами

import { useState, useEffect, useCallback } from 'react';
import { 
  getCommunityCards, 
  createCommunityCard, 
  getCommunityCardById,
  updateCommunityCard,
  patchCommunityCard,
  deleteCommunityCard 
} from '../api/community';
import { 
  CommunityCard, 
  CreateCommunityCardRequest, 
  UpdateCommunityCardRequest 
} from '../types/community';

interface UseCommunityReturn {
  communities: CommunityCard[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createCommunity: (card: CreateCommunityCardRequest) => Promise<CommunityCard>;
  updateCommunity: (id: string, card: UpdateCommunityCardRequest) => Promise<CommunityCard>;
  deleteCommunity: (id: string) => Promise<void>;
  getCommunityById: (id: string) => Promise<CommunityCard>;
}

export const useCommunity = (): UseCommunityReturn => {
  const [communities, setCommunities] = useState<CommunityCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCommunityCards();
      setCommunities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке сообществ');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCommunity = useCallback(async (card: CreateCommunityCardRequest): Promise<CommunityCard> => {
    setError(null);
    try {
      const newCommunity = await createCommunityCard(card);
      setCommunities(prev => [...prev, newCommunity]);
      return newCommunity;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при создании сообщества';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const updateCommunity = useCallback(async (id: string, card: UpdateCommunityCardRequest): Promise<CommunityCard> => {
    setError(null);
    try {
      const updatedCommunity = await patchCommunityCard(id, card);
      setCommunities(prev => 
        prev.map(community => 
          community.id === id ? updatedCommunity : community
        )
      );
      return updatedCommunity;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при обновлении сообщества';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const deleteCommunity = useCallback(async (id: string): Promise<void> => {
    setError(null);
    try {
      await deleteCommunityCard(id);
      setCommunities(prev => prev.filter(community => community.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при удалении сообщества';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const getCommunityById = useCallback(async (id: string): Promise<CommunityCard> => {
    setError(null);
    try {
      return await getCommunityCardById(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при получении сообщества';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  return {
    communities,
    loading,
    error,
    refetch: fetchCommunities,
    createCommunity,
    updateCommunity,
    deleteCommunity,
    getCommunityById,
  };
};
