import React, { useState } from 'react';
import styles from './Select.module.css';
import { Icon24ChevronDown } from '@vkontakte/icons';

interface CommunitySelectProps {
  placeholder: string;
  options: string[];
  onChange?: (value: string) => void;
}

const Select: React.FC<CommunitySelectProps> = ({
  placeholder,
  options,
  onChange
}) => {
  const [selected, setSelected] = useState('');

  const handleChange = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  const isDisabled = options.length === 0;

  return (
    <div className={styles.selectWrapper}>
      <select
        className={styles.select}
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isDisabled}
      >
        {isDisabled ? (
          <option value="">{'Нет доступных сообществ'}</option>
        ) : (
          <>
            <option value="" disabled>{placeholder}</option>
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </>
        )}
      </select>
      {!isDisabled && <Icon24ChevronDown className={styles.icon} />}
    </div>
  );
};

export default Select;
