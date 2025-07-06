// src/hooks/useAutoSaveRaffle.ts
import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { rafflesApi } from '@/api/raffle';
import { CreateRaffleRequest, UpdateRaffleRequest } from '@/types/raffle';
import { FormData } from '../types';
import { RaffleCard } from '@/types/raffle'; // убедитесь что импортируете RaffleCard

export function useAutoSaveRaffle(
  formData: FormData,
  debounceMs = 1000
): string | undefined {
  const [draftId, setDraftId] = useState<string>();

  // 1. При монтировании создаём черновик
  useEffect(() => {
    const createDraft = async () => {
      const now = new Date().toLocaleString('ru-RU', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      const payload: CreateRaffleRequest = {
        raffleId:         String(Date.now()),
        name:             '',
        textRaffleState:  'Активно',
        winnersCount:     0,
        mode:             'time',
        memberCount:      undefined,
        timeLeft:         undefined,
        progress:         0,
        lastModified:     now,
        modifiedBy:       'Администратор',
        statusСommunity:  'connected',
        statusNestedCard: 'green',
        statusNestedText: '',
        nickname:         '',
        membersCountNested: '',
        adminType:        'admin',
      };

      try {
    const response = await rafflesApi.createRaffleCard(payload) as { raffle: RaffleCard };
    setDraftId(response.raffle.raffleId);
    console.log('Черновик создан, ID =', response.raffle.raffleId);
    } catch (err) {
    console.error('Не удалось создать черновик:', err);
    } 
    };

    createDraft();
  }, []); // пустой deps → вызывается один раз

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