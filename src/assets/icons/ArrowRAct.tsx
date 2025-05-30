import React from 'react';

interface SVGIconProps {
  width?: number;  // Ширина иконки
  height?: number; // Высота иконки
  color?: string;  // Цвет иконки
}

const ArrowRAct: React.FC<SVGIconProps> = ({ width = 24, height = 24, color = "#D4F94E" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M14.2322 12L8.11612 5.88388C7.62796 5.39573 7.62796 4.60427 8.11612 4.11612C8.60427 3.62796 9.39573 3.62796 9.88388 4.11612L16.8839 11.1161C17.372 11.6043 17.372 12.3957 16.8839 12.8839L9.88388 19.8839C9.39573 20.372 8.60427 20.372 8.11612 19.8839C7.62796 19.3957 7.62796 18.6043 8.11612 18.1161L14.2322 12Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowRAct;
