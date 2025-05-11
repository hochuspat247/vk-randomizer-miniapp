import React from 'react';
import styles from './NotificationCard.module.css';

interface NotificationCardProps {
    type: 'warning' | 'completed' | 'error';  // Тип карточки
    raffleId?: number;
    participantsCount?: number;
    winners?: string[];
    reasonEnd?: string;
    new?: boolean;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
    type,
    raffleId,
    participantsCount,
    winners,
    reasonEnd,
    new
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.notificationCont}>
            </div>
        </div>
    );
};

export default NotificationCard;
