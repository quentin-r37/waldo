import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  color: 'cyan' | 'emerald' | 'orange' | 'red';
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subtext, icon: Icon, color }) => {
  const colorMap = {
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  };

  const iconColorMap = {
    cyan: 'text-cyan-700',
    emerald: 'text-emerald-700',
    orange: 'text-orange-700',
    red: 'text-red-700',
  };

  return (
    <div className={`rounded-xl border-2 ${colorMap[color]} p-6 space-y-4`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon size={32} className={`${iconColorMap[color]} opacity-30`} />
      </div>
      <p className="text-xs opacity-70">{subtext}</p>
    </div>
  );
};