import React from 'react';
import FilterIcon from '@assets/icons/FilterIcon';
import styles from '../Raffles.module.css';

interface FilterButtonProps {
  onClick: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return (
    <button type='button' className={styles.filterButton} onClick={onClick}>
      <FilterIcon />
      <span className={styles.filterText}>Фильтр</span>
    </button>
  );
}; 