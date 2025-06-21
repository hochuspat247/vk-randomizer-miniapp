// src/constants/faqFilterOptions.ts
import PlayTriangleIcon from '@/assets/icons/PlayTriangleIcon';
import { Icon20Users3Outline, Icon20ErrorCircleOutline } from '@vkontakte/icons';
import BuildingIcon from '@/assets/icons/BuildingIcon';
import WrenchIcon from '@/assets/icons/WrenchIcon';
import CrownIcon from '@/assets/icons/CrownIcon';

export interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
}

export interface Option {
  label: string;
  value: string;
  /** Иконка — опционально */
  Icon?: React.FC<IconProps>;
}

export const options: Option[] = [
  { label: 'Все',         value: 'all'         /* без Icon */ },
  { label: 'Введение',    value: 'intro',       Icon: PlayTriangleIcon           },
  { label: 'Сообщества',  value: 'communities', Icon: Icon20Users3Outline        },
  { label: 'Виджеты',     value: 'widgets',     Icon: BuildingIcon               },
  { label: 'Розыгрыши',   value: 'raffles',     Icon: CrownIcon                  },
  { label: 'Ошибки',      value: 'errors',      Icon: Icon20ErrorCircleOutline   },
  { label: 'Прочее',      value: 'other',       Icon: WrenchIcon                 },
];
