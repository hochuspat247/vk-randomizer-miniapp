import React from 'react';
import styles from './RaffleState.module.css';

import ActiveIcon from "../../assets/icons/ActiveIcon"
import PendingIcon from "../../assets/icons/PendingIcon"
import { Icon16CancelCircleOutline, Icon16PenOutline } from '@vkontakte/icons';

interface RaffleStateProps {
  status: 'active' | 'pending' | "results" | "resultsWhite" | 'deleted' | "draft";
  text: string;
}

const RaffleState: React.FC<RaffleStateProps> = ({ status, text }) => {

  const badgeClass = `${styles.badge} ${styles[status]}`;
  const textClassName = [
    styles.text,
    status === "results" && styles.textResult,
    status === "deleted" && styles.textDeleted,
    status === "draft" && styles.textDraft
  ].filter(Boolean).join(' ');

  const iconMap: Record<string, JSX.Element> = {
    active: <ActiveIcon />,
    pending: <PendingIcon />,
    deleted: <Icon16CancelCircleOutline />,
    draft: <Icon16PenOutline />
  };
  const icon = iconMap[status];

  return (
    <div className={badgeClass}>
        {icon}
        <span className={textClassName}>{text}</span>
    </div>
  );
};

export default RaffleState;
