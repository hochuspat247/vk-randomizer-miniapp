import React from 'react';

const GoldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={props.width || 48}
    height={props.height || 48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.096 29.25L24 10.5L32.904 29.25H15.096ZM18.192 27H29.808L24 15.3L18.192 27ZM10.056 37.5L5.472 28.2H16.08L18.144 32.55H12.336L14.208 36.6L10.056 37.5ZM42.528 28.2L37.944 37.5L33.792 36.6L35.664 32.55H29.856L31.92 28.2H42.528ZM19.488 37.5L17.424 33.15H30.576L28.512 37.5H19.488Z"
      fill="currentColor"
    />
  </svg>
);

export default GoldIcon;
