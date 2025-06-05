import React from 'react';
import styles from './CustomCheckbox.module.css';
import { Icon24CheckBoxOff, Icon16HelpOutline , Icon24Info } from '@vkontakte/icons';
import CheckboxIcon from '@assets/icons/CheckboxIcon';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  showAdditionalIcon?: boolean; // Булево значение для дополнительной иконки
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  showAdditionalIcon = false
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div 
      className={`${styles.checkboxContainer} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
    >
      <div className={styles.iconContainer}>
        {checked ? <CheckboxIcon /> : <Icon24CheckBoxOff />}
      </div>
      
      <span className={styles.label}>
        {label}
      </span>
      
      {showAdditionalIcon && (
        <div className={styles.additionalIcon}>
          <Icon16HelpOutline  />
        </div>
      )}
    </div>
  );
};

export default CustomCheckbox;