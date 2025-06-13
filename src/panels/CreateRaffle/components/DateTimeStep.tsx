import React, { useState, useEffect } from 'react';
import { FormItem, FormLayoutGroup } from '@vkontakte/vkui';
import Select from '@/components/Select/Select';
import { DateTimePicker } from '@/components/DateTimePicker/DateTimePicker';
import Input from '@/components/Input/Input';
import { ToggleSwitch } from '@/components/ToggleSwitch/ToggleSwitch';
import { getDateTimeFromOption } from '../utils/dateTimeUtils';
import dayjs from 'dayjs';
import styles from './DateTimeStep.module.css';

const START_OPTIONS = [
  { label: 'Сейчас',           value: 'now'    },
  { label: 'Через 1 час',      value: '1hour'  },
  { label: 'Через 6 часов',    value: '6hours' },
  { label: 'Моя дата и время', value: 'custom' }
];

const END_OPTIONS = [
  { label: 'Через 24 часа',    value: '24hours' },
  { label: 'Через 7 дней',     value: '7days'   },
  { label: 'Через 14 дней',    value: '14days'  },
  { label: 'Через месяц',      value: '1month'  },
  { label: 'Моя дата и время', value: 'custom'  }
];

interface DateTimeStepProps {
  endByParticipants: boolean ;
  setEndByParticipants: (v: boolean) => void;
  startDateTime: string;
  setStartDateTime: (v: string) => void;
  endDateTime: string;
  setEndDateTime: (v: string) => void;
  memberMax: string;
  setMemberMax: (v: string) => void;

  isSelectedStartTime: string;
  setIsSelectedStartTime: (v: string) => void;
  isSelectedEndTime: string;
  setIsSelectedEndTime: (v: string) => void;

  startDateLabel: string;
  setStartDateLabel: (v: string) => void;

  endDateLabel: string;
  setEndDateLabel: (v: string) => void;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({
  endByParticipants = false, setEndByParticipants,
  startDateTime,    setStartDateTime,
  endDateTime,      setEndDateTime,
  memberMax,        setMemberMax,
  isSelectedStartTime,
  setIsSelectedStartTime,
  isSelectedEndTime,
  setIsSelectedEndTime,

  startDateLabel, 
  endDateLabel, 
  setEndDateLabel, 
  setStartDateLabel,
}) => {
  const [startOption, setStartOption] = useState<string>('');
  const [endOption,   setEndOption]   = useState<string>('');
  const [startLabel,  setStartLabel]  = useState<string>('');
  const [endLabel,    setEndLabel]    = useState<string>('');
  const [startDirty,  setStartDirty]  = useState(false);
  const [endDirty,    setEndDirty]    = useState(false);

  useEffect(() => {
    //Данные с formData для startDate
    if (isSelectedStartTime === "custom") {
      setStartOption('custom');
      setStartLabel(`Моя дата и время `);

    } else if (isSelectedStartTime === "noCustom") {
      setStartLabel(`${startDateLabel} [${startDateTime}]`); 
    } else {
      setStartLabel('');
    }

    //Данные с formData для endDate
    if (isSelectedEndTime === "custom") {
      setEndOption('custom');
      setEndLabel(`Моя дата и время `);

    } else if (isSelectedEndTime === "noCustom") {
      setEndLabel(`${endDateLabel} [${endDateTime}]`); 
    } else if (isSelectedEndTime === '') {
      setEndLabel('');
    }
  }, []);

  // Синхронизация select → date state
  useEffect(() => {
    if (!startDirty) return;
    const iso = startDateTime.slice(0, 16);
    const found = START_OPTIONS.find(o =>
      o.value !== 'custom' &&
      getDateTimeFromOption(o.value).slice(0, 16) === iso
    );
    if (found) {
      setStartOption(found.value);
      setStartLabel(`${found.label} [${dayjs(iso).format('DD.MM.YYYY HH:mm')}]`);

      setIsSelectedStartTime("noCustom");

    } else {
      setStartOption('custom');
      setStartLabel(`Моя дата и время `);
    }
  }, [startDateTime, startDirty]);

  useEffect(() => {
    if (!endDirty) return;
    const iso = endDateTime.slice(0, 16);
    const found = END_OPTIONS.find(o =>
      o.value !== 'custom' &&
      getDateTimeFromOption(o.value).slice(0, 16) === iso
    );
    if (found) {
      setEndOption(found.value);
      setEndLabel(`${found.label} [${dayjs(iso).format('DD.MM.YYYY HH:mm')}]`);

      setIsSelectedEndTime('noCustom');

    } else {
      setEndOption('custom');
      setEndLabel(`Моя дата и время `);
    }
  }, [endDateTime, endDirty]);

  // Handlers
  const onStartSelect = (label: string) => {
    setStartDirty(true);
    const opt = START_OPTIONS.find(o => o.label === label)!;
    setStartOption(opt.value);
    setStartLabel(opt.label);
    if (opt.value !== 'custom') {
      setStartDateTime(getDateTimeFromOption(opt.value));
      setStartDateLabel(opt.label);
    } else {
      // при custom очищаем, чтобы открыть DateTimePicker
      setStartDateTime('');
    }
  };
  const onEndSelect = (label: string) => {
    setEndDirty(true);
    const opt = END_OPTIONS.find(o => o.label === label)!;
    setEndOption(opt.value);
    setEndLabel(opt.label);
    if (opt.value !== 'custom') {
      setEndDateTime(getDateTimeFromOption(opt.value));
      setEndDateLabel(opt.label);
    } else {
      setEndDateTime('');
    }
  };

  return (
    <FormLayoutGroup mode="vertical" className={styles.FormLayoutGroup}>
      {/* Переключатель режима валидации (но поля отображаются всегда) */}
      <FormItem className={styles.formItemT} onClick={console.log(endByParticipants)}>
        <ToggleSwitch
          checked={endByParticipants}
          onChange={setEndByParticipants}
          label="Условия завершения розыгрыша *"
        />
      </FormItem>

      {/* Всегда показываем начало */}
      <FormItem className={styles.formItem} top={`Старт розыгрыша ${endByParticipants ? "*" : ""}`}>
        <Select
          placeholder="Выберите дату начала"
          options={START_OPTIONS.map(o => o.label)}
          value={startLabel}
          onChange={onStartSelect}
        />
        {startOption === 'custom' && (
          <DateTimePicker
            value={startDateTime}
            onChange={e => {
              setStartDirty(true);
              setStartDateTime(e.target.value);
              setIsSelectedStartTime("custom")
            }}
            placeholder="Укажите дату и время"
            tittle="Старт розыгрыша"
          />
        )}
      </FormItem>

      {/* Всегда показываем лимит участников */}
      <FormItem className={styles.formItem} top={`Max колличество участников ${endByParticipants ? "" : "*"}`}>
        <Input
          type="input"
          value={memberMax}
          onChange={e => setMemberMax(e.target.value)}
          placeholder="Введите max количество участников"
        />
      </FormItem>

      {/* Всегда показываем окончание */}
      <FormItem className={styles.formItem} top={`Заврешение розыгрыша ${endByParticipants ? "*" : ""}`}>
        <Select
          placeholder="Укажите дату окончания"
          options={END_OPTIONS.map(o => o.label)}
          value={endLabel}
          onChange={onEndSelect}
        />
        {endOption === 'custom' && (
          <DateTimePicker
            value={endDateTime}
            onChange={e => {
              setEndDirty(true);
              setEndDateTime(e.target.value);
              setIsSelectedEndTime('custom');
            }}
            placeholder="Укажите дату и время"
            tittle="Завершение розыгрыша"
          />
        )}
      </FormItem>
    </FormLayoutGroup>
  );
};
