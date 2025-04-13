import React from "react";

interface EnergyIconProps {
  size?: number;
  current?: number;
  max?: number;
  showAmount?: boolean;
  className?: string;
}

export default function EnergyIcon({
  size = 24,
  current = 5,
  max = 5,
  showAmount = false,
  className = "",
}: EnergyIconProps) {
  // Calculate percentage filled
  const fillPercentage = Math.min(100, Math.max(0, (current / max) * 100));

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {/* Pokéball-inspired energy icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Outer circle */}
        <circle
          cx="12"
          cy="12"
          r="11"
          stroke="#E63946"
          strokeWidth="2"
          fill="white"
        />

        {/* Middle line */}
        <line x1="1" y1="12" x2="23" y2="12" stroke="#E63946" strokeWidth="2" />

        {/* Center circle */}
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="#F3E260"
          stroke="#E63946"
          strokeWidth="1"
        />

        {/* Fill amount (pill-shaped) - conditionally rendered based on fillPercentage */}
        {fillPercentage > 0 && (
          <path
            d={`M 12 23
                A 11 11 0 0 1 12 1
                A 11 11 0 0 1 12 23
                Z`}
            fill="#E63946"
            opacity="0.3"
            clipPath={`polygon(0 ${100 - fillPercentage}%, 100% ${
              100 - fillPercentage
            }%, 100% 100%, 0% 100%)`}
          />
        )}
      </svg>

      {/* Amount display */}
      {showAmount && (
        <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {current}
        </div>
      )}
    </div>
  );
}
