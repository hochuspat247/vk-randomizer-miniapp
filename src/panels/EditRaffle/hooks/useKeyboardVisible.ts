import { useState, useEffect } from 'react';

/**
 * Хук отслеживает изменение высоты viewport и флагирует,
 * что клавиатура, вероятно, открыта, когда высота упала ниже
 * исходного значения на threshold пикселей.
 *
 * @param threshold — чувствительность (по умолчанию 100px)
 */
export function useKeyboardVisible(threshold = 100): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Берём начальную высоту viewport (в пикселях)
    const initialHeight = window.innerHeight;

    const onResize = () => {
      // Если высота уменьшилась больше чем на threshold — считаем, что клавиатура открыта
      if (initialHeight - window.innerHeight > threshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [threshold]);

  return visible;
}
