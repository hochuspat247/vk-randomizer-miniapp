import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Анимация при наведении
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Стилизованный компонент кнопки
const StyledButton = styled.button<{ $isActive: boolean }>`
  background: ${({ $isActive }) => ($isActive ? '#4CAF50' : '#2196F3')};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  animation: ${({ $isActive }) => ($isActive ? `${pulse} 1s infinite` : 'none')};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Props для кнопки
interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

const RandomButton: React.FC<ButtonProps> = ({ label = 'Нажми меня', onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick?.();
  };

  return (
    <StyledButton 
      $isActive={isActive} 
      onClick={handleClick}
      aria-label={label}
    >
      {isActive ? 'Активно!' : label}
    </StyledButton>
  );
};

export default RandomButton;