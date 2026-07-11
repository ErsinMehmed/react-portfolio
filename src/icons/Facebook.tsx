import type { IconComponent } from "../types/icon";

const Facebook: IconComponent = ({ className }) => (
  <svg
    style={{
      width: "1.2em",
      height: "1.2em",
      fill: "currentColor",
    }}
    viewBox='0 0 1024 1024'
    className={className || "mx-auto text-[#1773EA] group-hover:text-white"}>
    <path d='M767.428571 6.857143l0 150.857143-89.714286 0q-49.142857 0-66.285714 20.571429t-17.142857 61.714286l0 108 167.428571 0-22.285714 169.142857-145.142857 0 0 433.714286-174.857143 0 0-433.714286-145.714286 0 0-169.142857 145.714286 0 0-124.571429q0-106.285714 59.428571-164.857143t158.285714-58.571429q84 0 130.285714 6.857143z' />
  </svg>
);

export default Facebook;
