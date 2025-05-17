import React from 'react';
import styles from './RaffleState.module.css';

import ActiveIcon from "../../assets/icons/ActiveIcon"
import PendingIcon from "../../assets/icons/PendingIcon"
import { Icon16CancelCircleOutline, Icon16PenOutline, Icon16Flag  } from '@vkontakte/icons';

interface RaffleStateProps {
  status: 'active' | 'pending' | "results" | "resultsWhite" | 'deleted' | "draft" | "completed";
  text: string;
}

const RaffleState: React.FC<RaffleStateProps> = ({ status, text }) => {

  const badgeClass = `${styles.badge} ${styles[status]}`;
  const textClassName = [
    styles.text,
    status === "results" && styles.textResult,
    status === "deleted" && styles.textDeleted,
    status === "draft" && styles.textDraft,
    status === "completed" && styles.textCompleted
  ].filter(Boolean).join(' ');

  const iconMap: Record<string, JSX.Element> = {
    active: <ActiveIcon />,
    pending: <PendingIcon />,
    deleted: <Icon16CancelCircleOutline />,
    draft: <Icon16PenOutline />,
    completed: <Icon16Flag />
  };
  const icon = iconMap[status];

  return (
    <div className={badgeClass}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <span className={textClassName}>{text}</span>
    </div>
  );
};

export default RaffleState;
