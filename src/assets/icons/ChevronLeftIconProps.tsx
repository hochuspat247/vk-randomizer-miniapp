import React from 'react';

interface ChevronLeftIconProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({
  width = 16,
  height = 20,
  color = '#D4F94E',
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5422 3.20039C11.9444 3.57891 11.9636 4.21178 11.5851 4.61396L6.51583 10L11.5851 15.3861C11.9636 15.7883 11.9444 16.4211 11.5422 16.7996C11.1401 17.1782 10.5072 17.159 10.1287 16.7568L4.41438 10.6854C4.05198 10.3003 4.05198 9.69971 4.41438 9.31466L10.1287 3.24323C10.5072 2.84105 11.1401 2.82188 11.5422 3.20039Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronLeftIcon;