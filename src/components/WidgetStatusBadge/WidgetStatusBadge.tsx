import React from 'react';
import styles from './WidgetStatusBadge.module.css';

import ArrowG from '../../assets/icons/ArrowG';
import ArrowY from '../../assets/icons/ArrowY';
import ArrowR from '../../assets/icons/ArrowR';
import { Icon16MinusCircleOutline } from '@vkontakte/icons';


interface StatusButtonProps {
  status: 'green' | 'yellow' | 'red' | "undefined";
  text: string;
}

const WidgetStatusBadge: React.FC<StatusButtonProps> = ({ status, text }) => {

  const containerClasses = [
    styles.container,
    status === 'yellow' && styles.containerYellow,
    status === 'red' && styles.containerRed,
    status === 'green' && styles.containerGreen,
    status === "undefined" && styles.containerUndefined
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
        {status === 'green' && <ArrowG />} 
        {status === 'yellow' && <ArrowY />} 
        {status === 'red' && <ArrowR />} 
        {status === 'undefined' && <Icon16MinusCircleOutline />} 
        <span className={styles.text}>{text}</span>
    </div>
  );
};

export default WidgetStatusBadge;
