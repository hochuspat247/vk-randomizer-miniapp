// DeployableList.tsx
import React, { useState } from 'react';
import styles from './DeployableList.module.css';
import {Icon24ChevronUp } from '@vkontakte/icons';


interface DeployableListProps {
  /** Заголовок секции */
  title: string;
  /** Контент, появляющийся при разворачивании */
  text: string;
}

const DeployableList: React.FC<DeployableListProps> = ({
  title,
  text,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <div
        className={styles.header}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.button}>
          <Icon24ChevronUp fill='#D4F94E'/>
        </div>
      </div>
      {isOpen && (
        <div className={styles.content}>
          {text}
        </div>
      )}
    </div>
  );
};

export default DeployableList;
