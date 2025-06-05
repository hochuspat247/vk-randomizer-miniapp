import React, { useState } from 'react';
import {
  Group,
  FormItem,
  Calendar,
  CustomSelect,
  Button,
} from '@vkontakte/vkui';
import { Icon28CalendarOutline } from '@vkontakte/icons';
import dayjs from 'dayjs';
import './DateTimePickerField.css';

interface DateTimePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange, min }) => {
  const [date, setDate] = useState<Date | null>(value ? new Date(value) : new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const formatted = date ? dayjs(date).format('DD.MM.YYYY HH:mm') : '';

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) return;
    const current = new Date(newDate);
    current.setHours(date?.getHours() || 0);
    current.setMinutes(date?.getMinutes() || 0);
    setDate(current);
    onChange({ target: { value: current.toISOString() } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Group mode="plain" style={{ padding: 0 }}>
      <div className="fullWidthWrapper">
        <FormItem top="Старт розыгрыша">
          <div className="dateInputWrapper" onClick={() => setIsPickerOpen(true)}>
            <div className="dateText">{formatted}</div>
            <Icon28CalendarOutline className="calendarIcon" />
          </div>
        </FormItem>

        {isPickerOpen && (
          <div className="popout">
            <Calendar
              value={date ?? new Date()}
              onChange={handleDateChange}
              size="m"
            />

            <div className="timeControls">
              <CustomSelect
                placeholder="Часы"
                options={Array.from({ length: 24 }, (_, i) => ({
                  label: `${i}`.padStart(2, '0'),
                  value: i,
                }))}
                value={date?.getHours()}
                onChange={(e) => {
                  const newDate = new Date(date ?? new Date());
                  newDate.setHours(+e.target.value);
                  setDate(newDate);
                  onChange({ target: { value: newDate.toISOString() } } as React.ChangeEvent<HTMLInputElement>);
                }}
              />
              <CustomSelect
                placeholder="Минуты"
                options={Array.from({ length: 60 }, (_, i) => ({
                  label: `${i}`.padStart(2, '0'),
                  value: i,
                }))}
                value={date?.getMinutes()}
                onChange={(e) => {
                  const newDate = new Date(date ?? new Date());
                  newDate.setMinutes(+e.target.value);
                  setDate(newDate);
                  onChange({ target: { value: newDate.toISOString() } } as React.ChangeEvent<HTMLInputElement>);
                }}
              />
            </div>

            <Button
              size="l"
              stretched
              style={{ marginTop: 12 }}
              onClick={() => setIsPickerOpen(false)}
            >
              Готово
            </Button>
          </div>
        )}
      </div>
    </Group>
  );
};
