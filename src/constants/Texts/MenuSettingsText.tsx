import { Icon16InfoOutline, Icon24LifebuoyOutline, Icon24Replay, Icon28BlockOutline, Icon28CalendarOutline, Icon28DocumentTextOutline, Icon28GlobeOutline, Icon28HelpOutline, Icon28Notifications } from "@vkontakte/icons";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  to?: string;
}

export const items: MenuItem[] = [
  {
    icon: <Icon28Notifications width={28} height={28} />,
    label: 'Уведомления приложения',
    to: '/notificationsettingspanel',
  },
  {
    icon: <Icon28BlockOutline width={28} height={28} />,
    label: 'Режим «Не беспокоить»',
    to: '/dontdisturb',
  },
  {
    icon: <Icon28GlobeOutline width={28} height={28} />,
    label: 'Язык и локализация',
    to: '',
  },
  {
    icon: <Icon28CalendarOutline width={28} height={28} />,
    label: 'Формат даты и времени',
    to: '',
  },
  {
    icon: <Icon16InfoOutline width={28} height={28} />,
    label: 'О приложении',
    to: '/',
  },
  {
    icon: <Icon24Replay width={28} height={28} />,
    label: 'Сбросить настройки',
    to: '',
  },
  {
    icon: <Icon28DocumentTextOutline width={28} height={28} />,
    label: 'Пользовательское соглашение',
    to: '',
  },
  {
    icon: <Icon24LifebuoyOutline width={28} height={28} />,
    label: 'Помощь',
    to: '',
  },
  {
    icon: <Icon28HelpOutline width={28} height={28} />,
    label: 'Перейти в FAQ',
    to: '',
  },
];
