// src/hooks/useAutoSaveRaffle.ts
import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { rafflesApi } from '@/api/raffle';
import { CreateRaffleRequest, UpdateRaffleRequest } from '@/types/raffle';
import { FormData } from '../types';
import { RaffleCard } from '@/types/raffle'; // убедитесь что импортируете RaffleCard
import { usePlatformContext } from '@/contexts/PlatformContext';

export function useAutoSaveRaffle(
  formData: FormData,
  debounceMs = 1000
): string | undefined {
  const [draftId, setDraftId] = useState<string>();
  const { userId } = usePlatformContext();

  // 1. При монтировании создаём черновик
  useEffect(() => {
    const createDraft = async () => {
      const now = new Date().toISOString();

      if (!userId) {
        console.error('vk_user_id отсутствует! Черновик не будет создан.');
        return;
      }

      // Формируем payload ровно по новому примеру пользователя
      const payload = {
        vk_user_id: userId,
        name: 'Название розыгрыша',
        community_id: '213206326',
        contest_text: 'Описание конкурса',
        photos: [],
        require_community_subscription: true,
        require_telegram_subscription: false,
        telegram_channel: null,
        required_communities: [],
        partner_tags: [],
        winners_count: 1,
        blacklist_participants: [],
        start_date: '2025-07-09T14:33:00',
        end_date: '2025-08-09T11:33:00',
        max_participants: null,
        publish_results: true,
        hide_participants_count: false,
        exclude_me: false,
        exclude_admins: false,
      };

      console.log('[AUTO-SAVE] Payload отправки черновика на бэк:', payload);

      try {
        const response = await rafflesApi.createRaffleCard(payload);
        setDraftId(response.raffleId || response.id);
        console.log('Черновик создан, ID =', response.raffleId || response.id);
      } catch (err) {
        console.error('Не удалось создать черновик:', err);
      }
    };

    createDraft();
  }, [userId]);

  // 2. Подготовка дебаунс-функции для patch
  const debouncedUpdate = useRef(
    debounce(async (id: string, data: CreateRaffleRequest) => {
      console.log('⏳ PUT updateRaffle', id, data);
      try {
        const { raffle } = await rafflesApi.updateRaffle(id, data);
        console.log('✅ Update successful', raffle);
      } catch (err) {
        console.error('❌ Update error', err);
      }
    }, debounceMs)
  ).current;

  // 3) при любом изменении formData шлём полный PUT (требует весь CreateRaffleRequest)
  useEffect(() => {
    if (!draftId) return;
    console.log('📝 formData изменился:', formData);

    const now = new Date().toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    const payload: CreateRaffleRequest = {
      raffleId:         draftId,
      name:             formData.giveawayName,
      textRaffleState:  'Активно',
      winnersCount:     Number(formData.numberWinners) || 0,
      mode:             formData.endByParticipants ? 'members' : 'time',
      memberCount:      formData.memberMax || '',
      timeLeft:         '',
      progress:         0,  // можно подставить своё вычисление
      lastModified:     now,
      modifiedBy:       'Администратор',
      statusСommunity:  'connected',
      statusNestedCard: 'green',
      statusNestedText: '',
      nickname:         '',  // при желании поставить `@${…}`
      membersCountNested:'',
      adminType:        'admin',
    };

    debouncedUpdate(draftId, payload);
  }, [draftId, formData, debouncedUpdate]);

  // 4) при размонтировании — «сливаем» последний вызов
  useEffect(() => {
    return () => {
      debouncedUpdate.flush();
    };
  }, [debouncedUpdate]);

  return draftId;
}