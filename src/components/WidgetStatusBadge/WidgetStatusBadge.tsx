 import React from 'react';
import styles from './WidgetStatusBadge.module.css';

import ArrowG from '../../assets/icons/ArrowG';
import ArrowY from '../../assets/icons/ArrowY';
import ArrowR from '../../assets/icons/ArrowR';
import { Icon16MinusCircleOutline } from '@vkontakte/icons';

interface StatusButtonProps {
  status: 'green' | 'yellow' | 'red' | undefined;
  text: string;
}

const WidgetStatusBadge: React.FC<StatusButtonProps> = ({ status, text }) => {
  const containerClasses = [
    styles.container,
    status === 'green' && styles.containerGreen,
    status === 'yellow' && styles.containerYellow,
    status === 'red' && styles.containerRed,
    status === undefined && styles.containerUndefined
  ].filter(Boolean).join(' ');

  const renderIcon = () => {
    switch (status) {
      case 'green':
        return <ArrowG width={16} height={16}/>;
      case 'yellow':
        return <ArrowY width={16} height={16}/>;
      case 'red':
        return <ArrowR width={16} height={16}/>;
      case undefined:
        return <Icon16MinusCircleOutline width={16} height={16}/>;
    }
  };

  return (
    <div className={containerClasses}>
      {renderIcon()}
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default WidgetStatusBadge;
