const NotificationCardMocks = [
  {
    type: 'completed',
    raffleId: 38289,
    participantsCount: 5920,
    winners: ['593IF', 'REOOJ', 'DOXO'],
    reasonEnd: 'Достигнут лимит по числу участников.',
    new: true,
  },
  {
    type: 'completed',
    raffleId: 38941,
    participantsCount: 4780,
    winners: ['XZ13B', 'LK9FD'],
    reasonEnd: 'Истекло время проведения розыгрыша.',
    new: false,
  },
  {
    type: 'warning',
    warningTitle: 'Не удалось подключить виджет',
    warningDescription: [
      'Сообщество "Казань 24 – Новости"',
      'У пользователя недостаточно прав.',
      'Розыгрыш не запущен.'
    ],
    new: true,
  },
  {
    type: 'error',
    errorTitle: 'Ошибка подключения сообщества',
    errorDescription:
      'На сервере VK ведутся технические работы. Приносим извинения за доставленные неудобства!',
    new: false,
  }
];

export default NotificationCardMocks;
