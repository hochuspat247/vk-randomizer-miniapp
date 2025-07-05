import React, { CSSProperties } from 'react';
import styles from './TimePicker.module.css';

const ITEM_H = 40;
const GAP = 8;
const PAD = 87;
const CONTAINER_H = 214;
const MAX_ANGLE = 85;

export function renderWheelItem<T extends string | number>(
  item: T,
  idx: number,
  activeIndex: number,
  scrollPos: number,
  tilt: boolean,
  selectIndex: (idx: number) => void
) {
  // вычисляем центр элемента и контейнера
  const elCenter = PAD + idx * (ITEM_H + GAP) + ITEM_H / 2;
  const centerY = scrollPos + CONTAINER_H / 2;
  const dist = elCenter - centerY;
  const norm = Math.max(-1, Math.min(1, dist / (CONTAINER_H / 2)));

  // если tilt=true, считаем transform и opacity
  const style: CSSProperties = tilt
    ? {
        transform: `perspective(400px) rotateX(${norm * MAX_ANGLE}deg)`,
        opacity: 1 - Math.abs(norm) * 0.8,
      }
    : {};

  return (
    <span
      key={idx}
      className={`${styles.hour} ${idx === activeIndex ? styles.active : ''}`}
      style={style}
      onClick={() => selectIndex(idx)}
    >
      {item}
    </span>
  );
}
