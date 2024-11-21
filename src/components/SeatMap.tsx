import React from 'react';
import { Seat } from '../types';
import SeatIcon from './SeatIcon';

interface SeatMapProps {
  seats: Seat[];
  selectedSeats: number[];
  onSeatSelect: (seatId: number) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedSeats,
  onSeatSelect,
}) => {
  const rowOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'BB', 'AA'];

  const rows = rowOrder.filter((row) =>
    seats.some((seat) => seat.rowNumber === row)
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-16 text-center relative">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-[90%] h-16 bg-gradient-to-b from-sky-200/50 to-transparent blur-xl"></div>
        
        <div className="relative">
          <div className="w-[90%] mx-auto h-3 bg-gradient-to-r from-sky-300 via-sky-400 to-sky-300 rounded-t-3xl shadow-lg"></div>
          <div className="w-[90%] mx-auto h-10 bg-gradient-to-b from-sky-50 to-white rounded-b-lg transform perspective-1000 rotateX-60 shadow-[0_8px_16px_-2px_rgba(14,165,233,0.2)]"></div>
        </div>
        
        <p className="text-sky-600 mt-6 font-medium tracking-wide">SCREEN</p>
      </div>
      
      <div className="grid gap-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-6 text-sky-600 font-medium">{row}</span>
            <div className="flex gap-2 flex-1 justify-center">
              {seats
                .filter((seat) => seat.rowNumber === row)
                .sort((a, b) => parseInt(a.seatNumber) - parseInt(b.seatNumber))
                .map((seat) => (
                  <button
                    key={seat.seatId}
                    onClick={() =>
                      seat.isAvailable && onSeatSelect(seat.seatId)
                    }
                    disabled={!seat.isAvailable}
                    className={`
                      ${
                        seat.rowNumber === 'AA' || seat.rowNumber === 'BB'
                          ? 'w-24 h-12'
                          : 'w-8 h-8'
                      }
                      transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed
                    `}
                  >
                    <SeatIcon
                      isSofa={seat.rowNumber === 'AA' || seat.rowNumber === 'BB'}
                      isSelected={selectedSeats.includes(seat.seatId)}
                      isAvailable={seat.isAvailable}
                    />
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center gap-12">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6">
            <SeatIcon isAvailable={true} />
          </div>
          <span className="text-sm text-sky-700">Normal (200 THB)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-6">
            <SeatIcon isSofa={true} isAvailable={true} />
          </div>
          <span className="text-sm text-sky-700">Premium (500 THB)</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;