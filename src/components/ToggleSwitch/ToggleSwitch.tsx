// src/components/ToggleSwitch/ToggleSwitch.tsx
import React from 'react';
import { Group, SegmentedControl } from '@vkontakte/vkui';
import './ToggleSwitch.css';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** "create" или "main" */
  variant?: 'create' | 'main';
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  variant = 'create',
  label,
}) => {
  const options =
    variant === 'main'
      ? [
          { label: 'Главная', value: 'on' },
          { label: 'Уведомления', value: 'off' },
        ]
      : [
          { label: 'По дате', value: 'on' },
          { label: 'По участникам', value: 'off' },
        ];

  return (
    <Group mode="plain">
      <div className="groupContent">
        <span className='label'>{label}</span>

        <SegmentedControl
          className={`segmentedControl ${variant}`}
          value={checked ? 'on' : 'off'}
          onChange={(v) => onChange(v === 'on')}
          options={options}
        />
      </div>
    </Group>
  );
};
