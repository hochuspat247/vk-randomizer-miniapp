import { Icon16InfoOutline, Icon24LifebuoyOutline, Icon24Replay, Icon28BlockOutline, Icon28CalendarOutline, Icon28DocumentTextOutline, Icon28GlobeOutline, Icon28HelpOutline, Icon28Notifications } from "@vkontakte/icons";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export const items: MenuItem[] = [
    { icon: <Icon28Notifications width={28} height={28} />, label: 'Уведомления приложения' },
    { icon: <Icon28BlockOutline width={28} height={28} />, label: 'Режим «Не беспокоить»' },
    { icon: <Icon28GlobeOutline width={28} height={28} />, label: 'Язык и локализация' },
    { icon: <Icon28CalendarOutline width={28} height={28} />, label: 'Формат даты и времени' },
    { icon: <Icon16InfoOutline width={28} height={28} />, label: 'О приложении' },
    { icon: <Icon24Replay width={28} height={28} />, label: 'Сбросить настройки' },
    { icon: <Icon28DocumentTextOutline width={28} height={28} />, label: 'Пользовательское соглашение' },
    { icon: <Icon24LifebuoyOutline width={28} height={28} />, label: 'Помощь' },
    { icon: <Icon28HelpOutline width={28} height={28} />, label: 'Перейти в FAQ' },
  ];
