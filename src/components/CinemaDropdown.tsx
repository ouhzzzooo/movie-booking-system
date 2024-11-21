import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { getCinemas } from '../api/auth';
import { Cinema } from '../types';

interface CinemaDropdownProps {
  onSelect?: () => void;
}

const CinemaDropdown: React.FC<CinemaDropdownProps> = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [filteredCinemas, setFilteredCinemas] = useState<Cinema[]>([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const cinemasData = await getCinemas();
        setCinemas(cinemasData);
        setFilteredCinemas(cinemasData);
      } catch (error) {
        console.error('Failed to fetch cinemas:', error);
      }
    };
    fetchCinemas();
  }, []);

  useEffect(() => {
    setFilteredCinemas(
      cinemas.filter((cinema) =>
        cinema.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cinema.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, cinemas]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg transform transition-all duration-300 animate-fadeIn">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Find - Locations or Cinema"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/50 bg-sky-50/30 text-sky-700 placeholder-sky-400"
        />
      </div>

      <div className="space-y-3">
        {filteredCinemas.map((cinema) => (
          <div
            key={cinema.cinemaId}
            onClick={() => {
              onSelect?.();
            }}
            className="cursor-pointer text-sky-700 hover:text-sky-500 transition-colors duration-200 hover:bg-sky-50 px-3 py-1.5 rounded-lg"
          >
            <span className="font-semibold">{cinema.name}</span> - <span>{cinema.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaDropdown;