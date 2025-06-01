import React from 'react';

interface ChevronRightIconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  width = 17,
  height = 24,
  color = '#D4F94E',
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 17 24"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.29289 6.29289C4.90237 6.68342 4.90237 7.31658 5.29289 7.70711L9.58579 12L5.29289 16.2929C4.90237 16.6834 4.90237 17.3166 5.29289 17.7071C5.68342 18.0976 6.31658 18.0976 6.70711 17.7071L11.7071 12.7071C12.0976 12.3166 12.0976 11.6834 11.7071 11.2929L6.70711 6.29289C6.31658 5.90237 5.68342 5.90237 5.29289 6.29289Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronRightIcon;