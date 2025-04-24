import { usePlatformContext } from '../contexts/PlatformContext';

export const usePlatform = () => {
  const { platform } = usePlatformContext();
  return platform;
};