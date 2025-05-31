import React from 'react';
import styles from './Select.module.css';
import { Icon24ChevronDown, Icon16Cancel, Icon16Done } from '@vkontakte/icons';

interface CommunitySelectProps {
  title?: string;
  placeholder: string;
  options: string[];
  value: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  allowInput?: boolean; // Новый пропс для возможности ввода текста
}

const Select: React.FC<CommunitySelectProps> = ({
  title,
  placeholder,
  options,
  value = [],
  onChange,
  multiple = false,
  allowInput = false // Значение по умолчанию
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const selectRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(option)
        ? currentValue.filter(item => item !== option)
        : [...currentValue, option];
      onChange?.(newValue);
    } else {
      onChange?.(option);
      setIsOpen(false);
    }
  };

  const handleRemove = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value)) {
      onChange?.(value.filter(item => item !== option));
    } else {
      onChange?.('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newValue = multiple 
        ? [...(Array.isArray(value) ? value : []), inputValue.trim()]
        : inputValue.trim();
      
      onChange?.(newValue);
      setInputValue('');
      
      if (!multiple) {
        setIsOpen(false);
      }
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDisabled = options.length === 0;
  const displayValue = multiple 
    ? (Array.isArray(value) ? value : [])
    : (typeof value === 'string' ? [value] : []);

  return (
    <div className={styles.selectContainer} ref={selectRef}>
      {title && <div className={styles.selectTitle}>{title}</div>}
      
      <div 
        className={`${styles.selectWrapper} ${isOpen ? styles.open : ''}`}
        onClick={!isDisabled ? handleToggle : undefined}
      >
        <div className={styles.selectedTagsCont}>
          {value.length === 0 ? (
            <span className={styles.placeholder}>{placeholder}</span>
          ) : (
            <div className={styles.selectedTags}>
              {displayValue.map(tag => (
                <span key={tag} className={`${styles.tag} ${!multiple ? styles.singleTag : ''}`}>
                  {tag}
                  {multiple && (
                    <Icon16Cancel 
                      className={styles.tagRemove} 
                      onClick={(e) => handleRemove(tag, e)}
                    />
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {!isDisabled && <Icon24ChevronDown className={styles.icon} />}
      </div>

      {isOpen && !isDisabled && (
        <div className={styles.dropdownCont}>
        <div className={styles.dropdown}>
          {allowInput && (
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Введите значение и нажмите Enter"
                className={styles.textInput}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          {options.map(option => (
            <div
              key={option}
              className={`${styles.option} ${
                (multiple 
                  ? Array.isArray(value) && value.includes(option)
                  : value === option
                ) ? (multiple ? styles.multipleSelected : styles.singleSelected) : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
              {(multiple 
                ? Array.isArray(value) && value.includes(option)
                : value === option
              ) && (
                <span className={styles.checkmark}>
                  <Icon16Done className={styles.checkIcon} />
                </span>
              )}
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default Select;