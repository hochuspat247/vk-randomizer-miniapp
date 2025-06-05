import React from 'react';
import { Icon20LifebuoyOutline } from '@vkontakte/icons';
import spiral from '@assets/images/261.png';
import styles from '../Raffles.module.css';

export const SupportCard: React.FC = () => {
  return (
    <div className={styles.supportCard}>
      <div className={styles.supportCardTop}>
        <div className={styles.supportCardText}>
          <span className={styles.supportCardTitle}>Возникли трудности?</span>
          <span className={styles.supportCardtext}>
            Напишите в службу поддержки — <br/>
            поможем разобраться, подскажем <br/>
            и быстро решим ваш вопрос.
          </span>
        </div>
        <img className={styles.spiral} src={spiral} alt='gold spiral'/>
      </div>
      <button className={styles.supportButton}>
        <Icon20LifebuoyOutline fill='#D4F94E'/>
        <span className={styles.supportButtonText}>Служба поддержки</span>
      </button>
    </div>
  );
}; 