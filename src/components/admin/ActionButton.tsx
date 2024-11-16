import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  path: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon: Icon, path }) => {
  return (
    <Link
      to={path}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex items-center gap-4"
    >
      <div className="bg-orange-100 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-orange-500" />
      </div>
      <span className="font-medium text-gray-900">{label}</span>
    </Link>
  );
};

export default ActionButton;