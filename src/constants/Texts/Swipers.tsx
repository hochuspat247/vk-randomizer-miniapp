// src/constants/Texts/Swipers.ts
import React from 'react';
import { SwiperOption } from '@/components/Swipers/Swipers';

export const staticOptions1: Omit<SwiperOption, 'checked' | 'onChange'>[] = [
  {
    id: 'win',
    label: 'О победе в розыгрыше',
    subtitle: (
      <>
        Получайте оповещение, если вы <br/>
        стали победителем конкурса.
      </>
    )
  },
  {
    id: 'start',
    label: 'О старте розыгрыша',
    subtitle: (
      <>
        Напомним, когда начнётся ваш <br/>
        собственный розыгрыш.
      </>
    )
  },
  {
    id: 'complete',
    label: 'О завершении розыгрыша',
    subtitle: (
      <>
        Узнайте, когда конкурс завершился <br/>
        и пора подвести итоги.
      </>
    )
  },
  {
    id: 'error',
    label: 'О сбоях виджета',
    subtitle: (
      <>
        Мгновенно узнавайте о сбоях и проблемах <br/>
        в подключённых сообществах.
      </>
    )
  }
];

export const staticOptions2: Omit<SwiperOption, 'checked' | 'onChange'>[] = [
  {
    id: 'banner',
    label: 'Баннер',
    subtitle: (
      <>
        Push-уведомления не будут отправляться,<br/>
        пока приложение открыто
      </>
    )
  },
  {
    id: 'sound',
    label: 'Звуки и вибрация',
    subtitle: <>Для push и баннеров</>
  }
];
