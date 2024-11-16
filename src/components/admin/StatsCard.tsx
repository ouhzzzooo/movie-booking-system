import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value ?? 'N/A'}</p>
        </div>
        <div className="bg-orange-100 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-orange-500" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;