// src/components/Toggle/Toggle.tsx
import React from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  return (
    <div
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      className={`${styles.track} ${checked ? styles.on : styles.off}`}
      onClick={() => onChange(!checked)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange(!checked);
        }
      }}
    >
      <div
        className={`${styles.thumb} ${checked ? styles.on : styles.off}`}
      />
    </div>
  );
};
