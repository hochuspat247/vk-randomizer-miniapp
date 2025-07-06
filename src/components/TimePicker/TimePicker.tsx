import React from 'react';
import styles from './TimePicker.module.css';
import { useWheel } from '@/hooks/useWheel';
import { renderWheelItem } from '@/hooks/renderWheelItem';

export type TimePickerProps = {
  initialHour?: number;
  initialMinute?: number;
  initialAmPm?: 'AM' | 'PM';
  onHourChange?: (h: number) => void;
  onMinuteChange?: (m: string) => void;
  onAmPmChange?: (p: 'AM' | 'PM') => void;
};

export const TimePicker: React.FC<TimePickerProps> = ({
  initialHour = 1,
  initialMinute = 0,
  initialAmPm = 'AM',
  onHourChange,
  onMinuteChange,
  onAmPmChange,
}) => {
  const hourItems = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteItems = Array.from({ length: 61 }, (_, i) =>
    i < 10 ? `0${i}` : `${i}`
  );
  const ampmItems = ['AM', 'PM'] as const;

  // часы
  const {
    ref: hourRef,
    activeIndex: hourIndex,
    scrollPos: hourScroll,
    selectIndex: selectHour,
  } = useWheel<number>({
    items: hourItems,
    initialIndex: initialHour - 1,
    onChange: onHourChange,
  });

  // минуты
  const {
    ref: minRef,
    activeIndex: minIndex,
    scrollPos: minScroll,
    selectIndex: selectMinute,
  } = useWheel<string>({
    items: minuteItems,
    initialIndex: initialMinute,
    onChange: onMinuteChange,
  });

  // AM/PM (без наклона)
  const initialAmPmIndex = ampmItems.indexOf(initialAmPm);
  const {
    ref: ampmRef,
    activeIndex: ampmIndex,
    scrollPos: ampmScroll,
    selectIndex: selectAmPm,
  } = useWheel<typeof ampmItems[number]>({
    items: ampmItems,
    initialIndex: initialAmPmIndex >= 0 ? initialAmPmIndex : 0,
    onChange: onAmPmChange,
  });

  return (
    <div className={styles.picker}>
      <div ref={hourRef} className={styles.hours}>
        {hourItems.map((h, i) =>
          renderWheelItem(h, i, hourIndex, hourScroll, true, selectHour)
        )}
      </div>
      <div ref={minRef} className={styles.hours}>
        {minuteItems.map((m, i) =>
          renderWheelItem(m, i, minIndex, minScroll, true, selectMinute)
        )}
      </div>
      <div ref={ampmRef} className={styles.hours}>
        {ampmItems.map((p, i) =>
          renderWheelItem(p, i, ampmIndex, ampmScroll, false, selectAmPm)
        )}
      </div>
    </div>
  );
};
