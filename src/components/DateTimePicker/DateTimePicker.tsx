import React, { useState } from 'react';
import {
  Group,
  FormItem,
  Calendar,
  CustomSelect,
} from '@vkontakte/vkui';
import { Icon24ChevronDown, Icon24CalendarOutline } from '@vkontakte/icons';
import dayjs from 'dayjs';
import './DateTimePickerField.css';

interface DateTimePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  tittle: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  min,
  tittle
}) => {
  // Основное, закреплённое значение
  const [date, setDate] = useState<Date>(value ? new Date(value) : new Date());
  // Черновик, который редактируем в попапе
  const [draftDate, setDraftDate] = useState<Date>(date);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Формат для отображения в поле
  const formatted = dayjs(date).format('DD.MM.YYYY HH:mm');

  // Открываем/закрываем попап и при открытии сбрасываем черновик
  const togglePicker = () => {
    if (!isPickerOpen) {
      setDraftDate(date);
    }
    setIsPickerOpen(!isPickerOpen);
  };

  // Обработчик выбора даты в календаре (изменяет только draftDate)
  const handleCalendarChange = (newDate?: Date) => {
    if (!newDate) return;
    const d = new Date(newDate);
    // сохраняем часы/минуты из текущего draftDate
    d.setHours(draftDate.getHours());
    d.setMinutes(draftDate.getMinutes());
    setDraftDate(d);
  };

  // Обработчики часов и минут
  const handleHourChange = (hour: number) => {
    const d = new Date(draftDate);
    d.setHours(hour);
    setDraftDate(d);
  };
  const handleMinuteChange = (minute: number) => {
    const d = new Date(draftDate);
    d.setMinutes(minute);
    setDraftDate(d);
  };

  // Кнопка "Готово" — сохраняем draftDate в date и зовём parent onChange
  const handleDone = () => {
    setDate(draftDate);
    onChange({
      target: { value: draftDate.toISOString() },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsPickerOpen(false);
  };

  return (
    <Group mode="plain" style={{ padding: 0 }}>
      <div className="fullWidthWrapper">
        <FormItem className="formItem" top={tittle}>
          <div className="dateInputWrapper" onClick={togglePicker}>
            <div className="dateText">{formatted}</div>
            <Icon24CalendarOutline
              className='calendarIcon'
            />
          </div>
        </FormItem>

        {isPickerOpen && (
          <div className={`popout show`}>
            <div className="popout-content">
              <Calendar
                value={draftDate}
                onChange={handleCalendarChange}
                className="calendar"
              />

              <div className="timeControls">
                <CustomSelect
                  className="customSelect"
                  placeholder="Часы"
                  options={Array.from({ length: 24 }, (_, i) => ({
                    label: `${i}`.padStart(2, '0'),
                    value: i,
                  }))}
                  value={draftDate.getHours()}
                  onChange={e => handleHourChange(+e.target.value)}
                />
                <CustomSelect
                  placeholder="Минуты"
                  options={Array.from({ length: 60 }, (_, i) => ({
                    label: `${i}`.padStart(2, '0'),
                    value: i,
                  }))}
                  value={draftDate.getMinutes()}
                  onChange={e => handleMinuteChange(+e.target.value)}
                />
              </div>

              <button className="btn" onClick={handleDone}>
                Готово
              </button>
            </div>
          </div>
        )}
      </div>
    </Group>
  );
};
