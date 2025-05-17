import avatar from '../assets/images/Picture (1).png';

export const communityModalMocks = [
  {
    id: 'selectMock',
    type: 'select',
    placeholder: 'Выберите сообщество',
    options: ['Казань 24 – Новости', 'Москва Life', 'Краснодар Online'],
  },
  {
    id: 'permissionMock',
    type: 'permission',
    communityName: 'Казань 24 – Новости',
    communityAvatar: avatar,
    subscribers: [
      { name: 'Андрей', avatar: avatar },
      { name: 'София', avatar: avatar },
      { name: 'Мария', avatar: '' }, // Без аватара
      { name: 'Николай', avatar: avatar }
    ],
  },
  {
    id: 'successMock',
    type: 'success',
    communityName: 'Казань 24 – Новости',
    communityAvatar: avatar,
  }
];
