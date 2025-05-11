import React from 'react';
import styles from './WidgetStatusBadge.module.css';

import ArrowG from '../../assets/icons/ArrowG';
import ArrowY from '../../assets/icons/ArrowY';
import ArrowR from '../../assets/icons/ArrowR';

interface StatusButtonProps {
  status: 'green' | 'yellow' | 'red';
  text: string;
}

const WidgetStatusBadge: React.FC<StatusButtonProps> = ({ status, text }) => {

  const containerClasses = [
    styles.container,
    status === 'yellow' && styles.containerYellow,
    status === 'red' && styles.containerRed,
    status === 'green' && styles.containerGreen,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
        {status === 'green' && <ArrowG />} 
        {status === 'yellow' && <ArrowY />} 
        {status === 'red' && <ArrowR />} 
        <span className={styles.text}>{text}</span>
    </div>
  );
};

export default WidgetStatusBadge;
