import React from 'react';
import { ConfigProvider, Group, SegmentedControl } from '@vkontakte/vkui';
import './ToggleSwitch.css';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label }) => {
  return (
    <Group mode="plain">
      <div className="groupContent">
        <div className="selectTitle">{label}</div>
        <ConfigProvider colorScheme="dark">
          <SegmentedControl
            value={checked ? 'on' : 'off'}
            className='segmentedControl'
            onChange={(value) => onChange(value === 'on')}
            options={[
              { label: 'По дате', value: 'on' },
              { label: 'По участникам', value: 'off' },
            ]}
          />
        </ConfigProvider>
      </div>
    </Group>
  );
};
