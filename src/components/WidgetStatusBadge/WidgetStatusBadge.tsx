import React from 'react';
import styles from './WidgetStatusBadge.module.css';

import arrowG from "../../assets/icons/check_outline_16.svg"
import arrowY from "../../assets/icons/warning_triangle_outline_16.svg"
import arrowR from "../../assets/icons/error_circle_outline_16.svg"

interface StatusButtonProps {
  status: 'green' | 'yellow' | 'red';
  text: string;
}

const WidgetStatusBadge: React.FC<StatusButtonProps> = ({ status, text }) => {
  

  return (
    <div className={`${styles.container} ${
        status === 'yellow'
          ? styles.containerYellow
          : status === 'red'
          ? styles.containerRed
          : styles.containerGreen
    }`}>
        {status === 'green' && <img src={arrowG}/>}
        {status === 'yellow' && <img src={arrowY} />}
        {status === 'red' && <img src={arrowR} />}
        <span className={styles.text}>{text}</span>
    </div>
  );
};

export default WidgetStatusBadge;
