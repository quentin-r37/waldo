import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Calendar, 
  Users, 
  BarChart3, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  currentView: string;
  onViewChange: (view: any) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isOpen, currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'map', label: 'Carte interactive', icon: Map },
    { id: 'reservations', label: 'Réservations', icon: Calendar },
    { id: 'teammates', label: 'Magic Teammates', icon: Users },
    { id: 'analytics', label: 'Rapports', icon: BarChart3 },
    { id: 'chat', label: 'Support', icon: MessageSquare },
  ];

  return (
    <nav className={`bg-white border-r border-slate-200 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} sticky top-16 h-[calc(100vh-64px)] overflow-y-auto`}>
      <div className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && (
                <>
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </>
              )}
            </button>
          );
        })}
      </div>

      <div className="border-t border-slate-200 p-4 mt-4">
        {isOpen && (
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-sm text-slate-700 mb-2">Conseil du jour</h3>
            <p className="text-xs text-slate-600">Réservez votre bureau avant 10h pour optimiser la collaboration.</p>
          </div>
        )}
      </div>
    </nav>
  );
};