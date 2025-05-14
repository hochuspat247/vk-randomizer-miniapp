import React from 'react';

interface SVGIconProps {
  width?: number; // Опциональная ширина
  height?: number; // Опциональная высота
  color?: string;  // Цвет иконки, по умолчанию #D4F94E
}

const ArrowG: React.FC<SVGIconProps> = ({ width = 16, height = 16, color = "#D4F94E" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7818 4.72113C13.0747 5.01403 13.0747 5.4889 12.7818 5.7818L6.78182 11.7818C6.48893 12.0747 6.01405 12.0747 5.72116 11.7818L3.21967 9.28031C2.92678 8.98741 2.92678 8.51254 3.21967 8.21965C3.51256 7.92675 3.98744 7.92675 4.28033 8.21965L6.25149 10.1908L11.7212 4.72113C12.0141 4.42824 12.4889 4.42824 12.7818 4.72113Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowG;
