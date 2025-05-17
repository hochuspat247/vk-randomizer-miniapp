// UserCheckIcon.tsx
import React from 'react';

const UserCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="10"
    viewBox="0 0 11 10"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_1912_23201)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.11271 3.57479C4.29576 3.75785 4.29576 4.05465 4.11271 4.23771L2.23771 6.11271C2.05465 6.29576 1.75785 6.29576 1.57479 6.11271L0.637294 5.17521C0.454235 4.99215 0.454235 4.69535 0.637294 4.51229C0.820352 4.32924 1.11715 4.32924 1.30021 4.51229L1.90625 5.11834L3.44979 3.57479C3.63285 3.39174 3.92965 3.39174 4.11271 3.57479Z"
        fill="white"
      />
      <path
        d="M8.3125 3.4375C8.3125 2.57422 7.61328 1.875 6.75 1.875C5.88672 1.875 5.1875 2.57422 5.1875 3.4375C5.1875 4.30078 5.88672 5 6.75 5C7.61328 5 8.3125 4.30078 8.3125 3.4375ZM6.75 5.625C7.87667 5.625 9.875 6.00962 9.875 7.35577V7.62752C9.875 7.90227 9.65227 8.125 9.37752 8.125H4.12247C3.84773 8.125 3.625 7.90227 3.625 7.62752V7.35577C3.625 6.00962 5.62333 5.625 6.75 5.625Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1912_23201">
        <rect width="10" height="10" fill="white" transform="translate(0.5)" />
      </clipPath>
    </defs>
  </svg>
);

export default UserCheckIcon;
