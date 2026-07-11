import type { IconComponent } from "../types/icon";

const ChevronUp: IconComponent = ({ className }) => (
  <svg
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth='2.5'
    stroke='currentColor'
    className={className || "w-6 h-6 mx-auto"}>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M4.5 15.75l7.5-7.5 7.5 7.5'
    />
  </svg>
);

export default ChevronUp;
