import type { IconComponent } from "../types/icon";

const AI: IconComponent = ({ className }) => (
  <svg
    viewBox='0 0 24 24'
    className={className || "w-6 h-6 mx-auto"}>
    <path
      d='M12 2l1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2zm6.5 11l.95 2.55L22 16.5l-2.55.95L18.5 20l-.95-2.55L15 16.5l2.55-.95L18.5 13zM6 15l.7 1.9L8.6 17.6l-1.9.7L6 20.2l-.7-1.9L3.4 17.6l1.9-.7L6 15z'
      fill='#A855F7'
    />
  </svg>
);

export default AI;
