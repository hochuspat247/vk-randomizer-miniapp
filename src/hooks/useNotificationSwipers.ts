// src/hooks/useNotificationSwipers.ts
import { useState, useMemo } from 'react';
import { SwiperOption } from '@/components/Swipers/Swipers';
import { staticOptions1, staticOptions2 } from '@/constants/Texts/Swipers';

/**
 * Хук, который внутри держит все useState и сразу возвращает готовые options1/options2.
 */
export function useNotificationSwipers() {
  // состояния
  const [onWin, setOnWin]             = useState(true);
  const [onStart, setOnStart]         = useState(true);
  const [onComplete, setOnComplete]   = useState(true);
  const [onError, setOnError]         = useState(true);

  const [bannerEnabled, setBannerEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled]   = useState(true);

  // собираем окончательные массивы — useMemo для оптимизации
  const options1: SwiperOption[] = useMemo(() => {
    return staticOptions1.map(opt => ({
      ...opt,
      checked: 
        opt.id === 'win'      ? onWin      :
        opt.id === 'start'    ? onStart    :
        opt.id === 'complete' ? onComplete :
        onError,
      onChange:
        opt.id === 'win'      ? setOnWin      :
        opt.id === 'start'    ? setOnStart    :
        opt.id === 'complete' ? setOnComplete :
        setOnError
    }));
  }, [onWin, onStart, onComplete, onError]);

  const options2: SwiperOption[] = useMemo(() => {
    return staticOptions2.map(opt => ({
      ...opt,
      checked:   opt.id === 'banner' ? bannerEnabled : soundEnabled,
      onChange:  opt.id === 'banner' ? setBannerEnabled : setSoundEnabled
    }));
  }, [bannerEnabled, soundEnabled]);

  return { options1, options2 };
}
