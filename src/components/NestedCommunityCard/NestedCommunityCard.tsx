import React from 'react';
import styles from './NestedCommunityCard.module.css';

import { Icon20DiamondOutline, Icon48Linked, Icon16PenOutline, Icon16InfoOutline, Icon20PinOutline, Icon20HelpOutline, Icon20MegaphoneOutline } from '@vkontakte/icons';
import Crown from '@assets/icons/Crown';
import ErrorNested from '@assets/icons/ErrorNested';
import { getRoleDisplayName } from '@/utils/vkTransformers';

import WidgetStatusBadge from '../WidgetStatusBadge/WidgetStatusBadge';
import BadgeIcon from '../BadgeIcon/BadgeIcon';

import {
  OWNER,
  ADMIN_Nested,
  FOLOWERS_Nested,
  ERROR_Nested,
} from '@constants/Texts/NestedCommunityCardText';

interface NestedCommunityCardProps {
  name: string;
  status: 'green' | 'yellow' | 'red' | undefined; // поддержка всех статусов
  statusText: string;
  nickname: string;
  membersCount: string;
  adminType: 'owner' | 'admin' | 'editor' | 'moderator' | 'member' | 'advertiser'; // обновленные роли
  avatarUrl?: string; // добавлено поле для аватара
}

// Функция для получения иконки роли
function getRoleIcon(role: 'owner' | 'admin' | 'editor' | 'moderator' | 'member' | 'advertiser') {
  switch (role) {
    case 'owner':
      return <Icon20DiamondOutline width={10} height={10}/>;
    case 'admin':
      return <Crown width={10} height={10}/>;
    case 'editor':
      return <Icon20PinOutline width={10} height={10}/>;
    case 'moderator':
      return <Icon20HelpOutline width={10} height={10}/>;
    case 'advertiser':
      return <Icon20MegaphoneOutline width={10} height={10}/>;
    case 'member':
      return <Icon20DiamondOutline width={10} height={10}/>;
    default:
      return <Icon20DiamondOutline width={10} height={10}/>;
  }
}

const NestedCommunityCard: React.FC<NestedCommunityCardProps> = ({
  name,
  nickname,
  status,
  statusText,
  membersCount,
  adminType,
  avatarUrl,
}) => {
  const statusClassMap: Record<'green' | 'yellow' | 'red', string> = {
    green: styles.badgeGreen,
    yellow: styles.badgeYellow,
    red: styles.badgeRed,
  };

  const adminClass = status ? statusClassMap[status] : styles.badgeUndefined;

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.avatarInfo}>
          {avatarUrl && (
            <img src={avatarUrl} alt={name} className={styles.avatar} width={36} height={36} style={{ borderRadius: 8, marginRight: 8 }} />
          )}
          <span className={styles.name}>{name}</span>
          <span 
            className={styles.nickname} 
            onClick={() => window.open(`https://vk.com/${nickname}`, '_blank')}
          >
            {nickname}
          </span>
        </div>

        <div className={styles.badges}>
          {/* Кол-во участников */}
          <div className={styles.badge}>
            <span className={styles.text}>{membersCount}</span>
            <span className={styles.text}>{FOLOWERS_Nested}</span>
          </div>

          {/* Роль и статус */}
          <div className={`${styles.badge} ${adminClass}`}>
            {status === 'yellow' ? (
              <>
                <ErrorNested width={10} height={10}/>
                <span className={styles.errorText}>{ERROR_Nested}</span>
              </>
            ) : (
              <>
                {getRoleIcon(adminType)}
                <span className={styles.text}>{getRoleDisplayName(adminType)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.cardBottom}>
        <WidgetStatusBadge status={status} text={statusText} />
        <div className={styles.BadgeIcons}>
          <BadgeIcon icon={<Icon48Linked />} />
          <BadgeIcon icon={<Icon16PenOutline />} />
          <BadgeIcon icon={<Icon16InfoOutline />} />
        </div>
      </div>
    </div>
  );
};

export default NestedCommunityCard;
