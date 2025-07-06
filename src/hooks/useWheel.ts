import { useRef, useEffect, useState, RefObject } from 'react';

export interface UseWheelOptions<T> {
  items: T[];
  initialIndex: number;
  onChange?: (item: T) => void;
}

export interface UseWheelResult<T> {
  /** Реф на контейнер-крутилку */
  ref: RefObject<HTMLDivElement>;
  /** Индекс активного (центрированного) элемента */
  activeIndex: number;
  /** Текущее scrollTop контейнера */
  scrollPos: number;
  /** Программно центрирует элемент idx */
  scrollToIndex: (idx: number, behavior?: ScrollBehavior) => void;
  /** То же + устанавливает activeIndex + вызывает onChange */
  selectIndex: (idx: number) => void;
}

export function useWheel<T>({
  items,
  initialIndex,
  onChange,
}: UseWheelOptions<T>): UseWheelResult<T> {
  const ITEM_H = 40;
  const GAP = 8;
  const PAD = 87;
  const CONTAINER_H = 214;

  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [scrollPos, setScrollPos] = useState(0);

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = 'smooth') => {
    const c = ref.current;
    if (!c) return;
    const topOffset = PAD + idx * (ITEM_H + GAP);
    const top = topOffset - (CONTAINER_H / 2 - ITEM_H / 2);
    c.scrollTo({ top, behavior });
  };

  // при маунте центрируем initialIndex
  useEffect(() => {
    scrollToIndex(initialIndex, 'auto');
    setActiveIndex(initialIndex);
  }, []);

  // отслеживаем scroll → scrollPos + activeIndex на лету
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const onScroll = () => {
      const st = c.scrollTop;
      setScrollPos(st);
      const centerY = st + CONTAINER_H / 2;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((_, idx) => {
        const elCenter = PAD + idx * (ITEM_H + GAP) + ITEM_H / 2;
        const d = Math.abs(elCenter - centerY);
        if (d < bestDist) {
          bestDist = d;
          best = idx;
        }
      });
      setActiveIndex(best);
    };
    c.addEventListener('scroll', onScroll);
    return () => {
      c.removeEventListener('scroll', onScroll);
    };
  }, [items]);

  // по окончании прокрутки — докатываем в центр + onChange
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    let tid: ReturnType<typeof setTimeout>;
    const onEnd = () => {
      clearTimeout(tid);
      tid = setTimeout(() => {
        scrollToIndex(activeIndex);
        onChange?.(items[activeIndex]);
      }, 100);
    };
    c.addEventListener('scroll', onEnd);
    return () => {
      c.removeEventListener('scroll', onEnd);
      clearTimeout(tid);
    };
  }, [activeIndex, items, onChange]);

  const selectIndex = (idx: number) => {
    setActiveIndex(idx);
    scrollToIndex(idx);
    onChange?.(items[idx]);
  };

  return { ref, activeIndex, scrollPos, scrollToIndex, selectIndex };
}
