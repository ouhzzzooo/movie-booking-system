import React from 'react';

interface SeatIconProps {
  isSofa?: boolean;
  isSelected?: boolean;
  isAvailable?: boolean;
}

const SeatIcon: React.FC<SeatIconProps> = ({ isSofa = false, isSelected = false, isAvailable = true }) => {
  if (isSofa) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`w-full h-full ${
          isSelected
            ? 'fill-orange-500'
            : isAvailable
            ? 'fill-orange-200 hover:fill-orange-300'
            : 'fill-gray-200'
        }`}
      >
        <path d="M2 18V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v12h-2v3H4v-3H2zm18-2V6H4v10h16zM6 8h12v2H6V8zm0 4h12v2H6v-2z"/>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`w-full h-full ${
        isSelected
          ? 'fill-orange-500'
          : isAvailable
          ? 'fill-orange-200 hover:fill-orange-300'
          : 'fill-gray-200'
      }`}
    >
      <path d="M4 18v3h16v-3h2v-3c0-1.1-.9-2-2-2h-1V7c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v6H4c-1.1 0-2 .9-2 2v3h2zm2-8V7h12v6H6z"/>
    </svg>
  );
};

export default SeatIcon;