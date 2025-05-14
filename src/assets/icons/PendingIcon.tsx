import React from 'react';

const PendingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.25 4C7.66421 4 8 4.33579 8 4.75V8.26707L10.3104 9.31722C10.6874 9.48863 10.8542 9.93327 10.6828 10.3104C10.5114 10.6874 10.0667 10.8542 9.68965 10.6828L6.93965 9.43278C6.6719 9.31107 6.5 9.04411 6.5 8.75V4.75C6.5 4.33579 6.83579 4 7.25 4Z"
      fill="black"
    />
  </svg>
);

export default PendingIcon;
