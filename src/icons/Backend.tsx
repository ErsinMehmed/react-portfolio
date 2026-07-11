import type { IconComponent } from "../types/icon";

const Backend: IconComponent = ({ className }) => (
  <svg
    viewBox='0 0 24 24'
    className={className || "w-6 h-6 mx-auto"}>
    <path
      d='M12 2C7.58 2 4 3.34 4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5c0-1.66-3.58-3-8-3zm6 17c0 .55-2.69 1.5-6 1.5s-6-.95-6-1.5v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V19zm0-5c0 .55-2.69 1.5-6 1.5s-6-.95-6-1.5v-2.23C7.61 12.55 9.72 13 12 13s4.39-.45 6-1.23V14zM12 11C8.69 11 6 10.05 6 9.5V7.27C7.61 8.05 9.72 8.5 12 8.5s4.39-.45 6-1.23V9.5c0 .55-2.69 1.5-6 1.5zm0-4C8.69 7 6 6.05 6 5.5S8.69 4 12 4s6 .95 6 1.5S15.31 7 12 7z'
      fill='#10B981'
    />
  </svg>
);

export default Backend;
