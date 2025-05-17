 import React from 'react';
import styles from './NestedCommunityCard.module.css';

import { Icon20DiamondOutline, Icon48Linked, Icon16PenOutline, Icon16InfoOutline } from '@vkontakte/icons';
import Crown from '../../assets/icons/Crown';
import ErrorNested from '../../assets/icons/ErrorNested';

import WidgetStatusBadge from '../WidgetStatusBadge/WidgetStatusBadge';
import BadgeIcon from '../BadgeIcon/BadgeIcon';

import {
  OWNER,
  ADMIN_Nested,
  FOLOWERS_Nested,
  ERROR_Nested,
} from '../../constants/Texts/NestedCommunityCardText';

interface NestedCommunityCardProps {
  name: string;
  status: 'green' | 'yellow' | 'red' | 'undefined'; // поддержка всех статусов
  statusText: string;
  nickname: string;
  membersCount: string;
  adminType: 'admin' | 'owner'; // строго ограничен
}

const NestedCommunityCard: React.FC<NestedCommunityCardProps> = ({
  name,
  nickname,
  status,
  statusText,
  membersCount,
  adminType,
}) => {
  const statusClassMap: Record<NestedCommunityCardProps['status'], string> = {
    green: styles.badgeGreen,
    yellow: styles.badgeYellow,
    red: styles.badgeRed,
    undefined: styles.badgeUndefined,
  };

  const adminClass = statusClassMap[status] || '';

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.avatarInfo}>
          <span className={styles.name}>{name}</span>
          <span className={styles.nickname}>{nickname}</span>
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
                {adminType === 'admin' ? (
                  <>
                    <Crown width={10} height={10}/>
                    <span className={styles.text}>{ADMIN_Nested}</span>
                  </>
                ) : (
                  <>
                    <Icon20DiamondOutline width={10} height={10}/>
                    <span className={styles.text}>{OWNER}</span>
                  </>
                )}
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
