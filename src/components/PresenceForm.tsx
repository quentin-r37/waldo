import React from 'react';
import { Building2, Home } from 'lucide-react';

interface PresenceFormProps {
  onStatusChange: (status: 'office' | 'home') => void;
}

export const PresenceForm: React.FC<PresenceFormProps> = ({ onStatusChange }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <button
        onClick={() => onStatusChange('office')}
        className="flex items-center gap-3 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <Building2 size={20} />
        Au bureau
      </button>
      <button
        onClick={() => onStatusChange('home')}
        className="flex items-center gap-3 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        <Home size={20} />
        En télétravail
      </button>
    </div>
  );
};