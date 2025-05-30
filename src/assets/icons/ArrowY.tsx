import React from 'react';

interface SVGIconProps {
  width?: number; // Опциональная ширина
  height?: number; // Опциональная высота
  color?: string;  // Опциональный цвет
}

const ArrowY: React.FC<SVGIconProps> = ({ width = 16, height = 16, color = "#FFC256" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.39339 3.2337C8.22197 2.92495 7.77795 2.92495 7.60653 3.2337L2.55535 12.3316C2.38882 12.6315 2.60571 13 2.94877 13H13.0512C13.3943 13 13.6112 12.6315 13.4446 12.3316L8.39339 3.2337ZM6.2951 2.50559C7.03793 1.16765 8.96199 1.16765 9.70482 2.50558L14.7561 11.6034C15.4777 12.9032 14.5378 14.5 13.0512 14.5H2.94877C1.46216 14.5 0.522299 12.9032 1.24392 11.6034L6.2951 2.50559ZM8.00001 5.49999C8.41422 5.49999 8.75001 5.83578 8.75001 6.24999V8.74999C8.75001 9.16421 8.41422 9.49999 8.00001 9.49999C7.58579 9.49999 7.25001 9.16421 7.25001 8.74999V6.24999C7.25001 5.83578 7.58579 5.49999 8.00001 5.49999ZM8.00001 12C8.41422 12 8.75001 11.6642 8.75001 11.25C8.75001 10.8358 8.41422 10.5 8.00001 10.5C7.58579 10.5 7.25001 10.8358 7.25001 11.25C7.25001 11.6642 7.58579 12 8.00001 12Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowY;
