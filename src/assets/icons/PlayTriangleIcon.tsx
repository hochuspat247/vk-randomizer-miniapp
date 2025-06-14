// PlayTriangleIcon.tsx
import React from 'react';

interface PlayTriangleIconProps {
  /** Цвет заливки иконки. По умолчанию #2C2D2E */
  fill?: string;
  /** Ширина (px) */
  width?: number;
  /** Высота (px) */
  height?: number;
  /** Дополнительные пропсы для <svg> */
  className?: string;
}

const PlayTriangleIcon: React.FC<PlayTriangleIconProps> = ({
  fill = '#2C2D2E',
  width = 20,
  height = 20,
  className,
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    className={className}
    {...rest}
  >
    <path
      d="M16.2799 8.91342C17.0734 9.39317 17.0734 10.6048 16.2799 11.0846L8.01526 16.0816C7.22849 16.5573 6.25 15.9556 6.25 14.9961V5.00184C6.25 4.0423 7.2285 3.44057 8.01527 3.91628L16.2799 8.91342Z"
      fill={fill}
    />
  </svg>
);

export default PlayTriangleIcon;
