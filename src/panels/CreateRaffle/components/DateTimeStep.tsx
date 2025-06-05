import React from 'react';
import { FormItem, CustomSelect, FormLayoutGroup } from '@vkontakte/vkui';
import { ToggleSwitch } from '@components/ToggleSwitch/ToggleSwitch';
import { DateTimePicker } from '@components/DateTimePicker/DateTimePicker';
import { START_OPTIONS, END_OPTIONS } from '../constants';
import styles from './DateTimeStep.module.css';

interface DateTimeStepProps {
  autoSelectWinners: boolean;
  setAutoSelectWinners: (value: boolean) => void;
  startDateTime: string;
  setStartDateTime: (value: string) => void;
  endDateTime: string;
  setEndDateTime: (value: string) => void;
  isStartCustom: boolean;
  setIsStartCustom: (value: boolean) => void;
  isEndCustom: boolean;
  setIsEndCustom: (value: boolean) => void;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({
  autoSelectWinners,
  setAutoSelectWinners,
  startDateTime,
  setStartDateTime,
  endDateTime,
  setEndDateTime,
  isStartCustom,
  setIsStartCustom,
  isEndCustom,
  setIsEndCustom,
}) => {
  const startOptions = START_OPTIONS.map(option => ({
    label: option,
    value: option
  }));

  const endOptions = END_OPTIONS.map(option => ({
    label: option,
    value: option
  }));

  const handleStartOptionChange = (value: string) => {
    setIsStartCustom(value === 'custom');
    if (value !== 'custom') {
      setStartDateTime(value);
    }
  };

  const handleEndOptionChange = (value: string) => {
    setIsEndCustom(value === 'custom');
    if (value !== 'custom') {
      setEndDateTime(value);
    }
  };

  return (
    <FormLayoutGroup mode="vertical">
      <FormItem top="Начало розыгрыша">
        <CustomSelect
          value={isStartCustom ? 'custom' : startDateTime}
          onChange={(e) => handleStartOptionChange(e.target.value)}
          options={startOptions}
          placeholder="Выберите дату и время"
        />
        {isStartCustom && (
          <div className={styles.dateTimePickerContainer}>
            <DateTimePicker
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        )}
      </FormItem>

      <FormItem top="Окончание розыгрыша">
        <CustomSelect
          value={isEndCustom ? 'custom' : endDateTime}
          onChange={(e) => handleEndOptionChange(e.target.value)}
          options={endOptions}
          placeholder="Выберите дату и время"
        />
        {isEndCustom && (
          <div className={styles.dateTimePickerContainer}>
            <DateTimePicker
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              min={startDateTime}
            />
          </div>
        )}
      </FormItem>

      <FormItem>
        <ToggleSwitch
          checked={autoSelectWinners}
          onChange={setAutoSelectWinners}
          label="Автоматический выбор победителей"
        />
      </FormItem>
    </FormLayoutGroup>
  );
}; 