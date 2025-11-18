import React from "react";

const Friends92Logo = ({ size = 45 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Gear-like circular shape */}
    <g fill="none" stroke="#004d00" strokeWidth="4">
      <circle cx="50" cy="50" r="30" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 50 + 30 * Math.cos(angle);
        const y1 = 50 + 30 * Math.sin(angle);
        const x2 = 50 + 40 * Math.cos(angle);
        const y2 = 50 + 40 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
    </g>
    {/* “92” text */}
    <text
      x="50%"
      y="54%"
      textAnchor="middle"
      fill="#004d00"
      fontSize="28"
      fontWeight="bold"
      fontFamily="Arial, sans-serif"
      dy=".3em"
    >
      92
    </text>
  </svg>
);

export default Friends92Logo;
