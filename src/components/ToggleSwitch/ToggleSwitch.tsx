import React from 'react';
import { Group, SegmentedControl } from '@vkontakte/vkui';
import './ToggleSwitch.css';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label }) => {
  return (
    <Group>
      <div className="groupContent">
        <div className="selectTitle">{label}</div>
        <SegmentedControl
          value={checked ? 'on' : 'off'}
          onChange={(value) => onChange(value === 'on')}
          options={[
            { label: 'Включено', value: 'on' },
            { label: 'Выключено', value: 'off' },
          ]}
        />
      </div>
    </Group>
  );
};
