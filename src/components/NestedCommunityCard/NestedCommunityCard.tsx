import React from 'react';
import styles from './NestedCommunityCard.module.css'; // Пусть стили будут в отдельном файле

import { Icon20DiamondOutline, Icon20Users3Outline, Icon28CheckCircleOutline, Icon28ErrorOutline, Icon28LinkOutline } from '@vkontakte/icons';
import Crown from '../../assets/icons/Crown';
import { OWNER, ADMIN_Nested, FOLOWERS_Nested} from "../../constants/Text"
import WidgetStatusBadge from '../WidgetStatusBadge/WidgetStatusBadge';
import BadgeIcon from '../BadgeIcon/BadgeIcon';
import { Icon48Linked } from '@vkontakte/icons';
import { Icon16PenOutline } from '@vkontakte/icons';
import { Icon16InfoOutline } from '@vkontakte/icons';

interface NestedCommunityCardProps {
    name: string;
    status: 'green' | 'yellow' | 'red' | 'undefined'; // Зеленый - успешно, Желтый - нужно право, Красный - ошибка, Undefined - неизвестно
    statusText: string;
    nickname: string;
    membersCount: string;
    adminType: string,
}

const NestedCommunityCard: React.FC<NestedCommunityCardProps> = ({
  name,
  nickname,
  status,
  statusText,
  membersCount,
  adminType
}) => {
  return (
    <div className={styles.card}>
        <div className={styles.cardTop}>
            <div className={styles.avatarInfo}>
                <span className={styles.name}>{name}</span>
                <span className={styles.nickname}>{nickname}</span>
            </div>
            <div className={styles.badges}>
                <div className={styles.badge}> 
                    <span className={styles.text}>{membersCount}</span>
                    <span className={styles.text}>{FOLOWERS_Nested}</span>
                </div>
                    {/* ADMIN / OWNER */}
                <div className={styles.badge}>
                    {adminType === 'admin' ? (
                        <> <Crown /> {/* Иконка админа */} </>
                    ) : (
                        <> <Icon20DiamondOutline className={styles.icon} /> {/* Иконка владельца */} </>
                    )}
                    <span className={styles.text}>
                        {adminType === 'admin' ? ADMIN_Nested : OWNER}
                    </span>
                </div>
            </div>
        </div>
        <div className={styles.cardBottom}>
            <WidgetStatusBadge status={status} text={statusText}  />
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
