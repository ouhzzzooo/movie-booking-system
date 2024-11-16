import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2 text-left border-b ${
          isOpen ? 'text-orange-500 border-orange-500' : 'border-gray-200'
        } ${className}`}
      >
        {label}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'transform rotate-180 text-orange-500' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;