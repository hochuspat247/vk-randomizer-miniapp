import React from 'react';
import styles from './MainHeader.module.css';
import { Icon16InfoOutline, Icon20GearOutline } from '@vkontakte/icons';
import AppLogoIcon from '@/assets/icons/AppLogoIcon';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

interface MainHeaderProps {
  /** Название приложения */
  title?: string;
  /** Обработчики клика по иконкам */
  onInfoClick?: () => void;
  onSettingsClick?: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  title = 'RaffleApp',
  onInfoClick,
  onSettingsClick,
}) => {

    const router = useRouteNavigator(); 

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <AppLogoIcon /> {/* или ваш SVG-компонент-лого */}
        </div>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.iconButton}
          onClick={() => {router.push("/faqpanel")}}
          aria-label="Информация"
        >
          <Icon16InfoOutline fill='#D4F94E' width={24} height={24}/>
        </button>
        <button
          className={styles.iconButton}
          onClick={onSettingsClick}
          aria-label="Настройки"
        >
          <Icon20GearOutline fill='#D4F94E' width={24} height={24}/>
        </button>
      </div>
    </header>
  );
};

export default MainHeader;
