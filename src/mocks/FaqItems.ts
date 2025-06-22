// src/mocks/faqItems.ts
export interface FaqItem {
  id: string;
  category: 'intro' | 'community';
  title: string;
  text: string;
}

export const faqItems: FaqItem[] = [
  // Введение (intro)
  { id: 'q1', category: 'intro', title: 'Что такое RaffleApp?', text: '' },
  { id: 'q2', category: 'intro', title: 'Что можно разыгрывать', text: '' },
  { id: 'q3', category: 'intro', title: 'Могу ли я принять участие в чужом розыгрыше?', text: '' },
  { id: 'q4', category: 'intro', title: 'Как создать розыгрыш', text: '' },

  // Сообщество (community)
  { id: 'q5', category: 'communities', title: 'Как добавить сообщество', text: '' },
  { id: 'q6', category: 'communities', title: 'Сколько у меня может быть максимально сообществ', text: '' },
  { id: 'q7', category: 'communities', title: 'Обязательно ли подключать сообщество и виджет?', text: '' },
  { id: 'q8', category: 'communities', title: 'Ошибка! Что делать?', text: '' },
  { id: 'q9', category: 'communities', title: 'Как работает виджет?', text: '' },

  // Виджет (widget)
  { id: 'q10', category: 'widgets', title: 'Почему виджет не подключается?', text: '' },
  { id: 'q11', category: 'widgets', title: 'Что делать, если я не админ сообщества?', text: '' },
  { id: 'q12', category: 'widgets', title: 'Можно ли удалить виджет?', text: '' },
  { id: 'q13', category: 'widgets', title: 'Как переустановить виджет?', text: '' },
  { id: 'q14', category: 'widgets', title: 'Какой статус считается нормальным?', text: '' },

  // Прочее (other)
  { id: 'q15', category: 'other', title: 'Где посмотреть итоги розыгрыша?', text: '' },
  { id: 'q16', category: 'other', title: 'Можно ли изменить сообщество после создания розыгрыша?', text: '' },
  { id: 'q17', category: 'other', title: 'Как переключиться между своими сообществами?', text: '' },
];

