// src/mocks/CommunityBannerMocks.ts
import { CommunityBannerProps } from '@/components/CommunityBanner/CommunityBanner';

const CommunityBannerMocks: CommunityBannerProps[] = [
  {
    avatarUrl: 'https://via.placeholder.com/48/FF0000/FFFFFF?text=A',
    name: 'Москва 24 – Новости',
    adminType: 'Владелец',
  },
  {
    avatarUrl: 'https://via.placeholder.com/48/00FF00/000000?text=B',
    name: 'Санкт-Петербург Онлайн',
    adminType: 'Администратор',
  },
  {
    // нет avatarUrl → отобразится DefaultAvatar
    name: 'Новосибирск PRO',
    adminType: 'Владелец',
  },
  {
    avatarUrl: 'https://via.placeholder.com/48/0000FF/FFFFFF?text=D',
    name: 'Краснодар Live',
    adminType: 'Администратор',
  },
  {
    avatarUrl: 'https://via.placeholder.com/48/FFFF00/000000?text=E',
    name: 'Казань Сегодня',
    adminType: 'Владелец',
  },
  {
    avatarUrl: 'https://invalid.url/img.png', // битая ссылка → DefaultAvatar
    name: 'Нижний Новгород – Новости',
    adminType: 'Администратор',
  },
  {
    avatarUrl: 'https://via.placeholder.com/48/FF00FF/FFFFFF?text=G',
    name: 'Волгоград Live',
    adminType: 'Владелец',
  },
];

export default CommunityBannerMocks;
