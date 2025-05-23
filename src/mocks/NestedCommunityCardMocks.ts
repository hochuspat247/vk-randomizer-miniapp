import { NestedCommunityCardProps } from '../components/NestedCommunityCard/NestedCommunityCard';

const NestedCommunityCardMocks: NestedCommunityCardProps[] = [
  {
    status: undefined,
    statusText: 'Статус неизвестен',
    name: 'Москва 24 – Новости',
    nickname: '@mosnews24',
    adminType: 'admin',
    membersCount: '592K',
  },
  {
    status: 'green',
    statusText: 'Виджет настроен',
    name: 'Питер Онлайн',
    nickname: '@spbonline',
    adminType: 'owner',
    membersCount: '1.2M',
  },
  {
    status: 'red',
    statusText: 'Ошибка подключения',
    name: 'Казань 24',
    nickname: '@kazan24',
    adminType: 'admin',
    membersCount: '804K',
  },
  {
    status: 'yellow',
    statusText: 'Требуется разрешение',
    name: 'Новосибирск – Главное',
    nickname: '@nsknews',
    adminType: 'owner',
    membersCount: '325K',
  },
];

export default NestedCommunityCardMocks;
