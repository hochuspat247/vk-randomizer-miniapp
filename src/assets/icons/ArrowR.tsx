import React from 'react';

interface SVGIconProps {
  width?: number;  // Ширина иконки
  height?: number; // Высота иконки
  color?: string;  // Цвет иконки
}

const ArrowR: React.FC<SVGIconProps> = ({ width = 16, height = 16, color = "#FF5C5C" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 4C8.41421 4 8.75 4.33579 8.75 4.75V8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25V4.75C7.25 4.33579 7.58579 4 8 4Z"
        fill={color}
      />
      <path
        d="M8.89998 11.1C8.89998 11.5971 8.49703 12 7.99998 12C7.50292 12 7.09998 11.5971 7.09998 11.1C7.09998 10.6029 7.50292 10.2 7.99998 10.2C8.49703 10.2 8.89998 10.6029 8.89998 11.1Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowR;
