import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={onMenuToggle}
            className="text-slate-700 hover:bg-slate-100 p-2 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
              WS
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-700">WorkSpace Hub</h1>
              <p className="text-xs text-slate-500">Gestion des espaces hybrides</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-slate-700 hover:bg-slate-100 p-2 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-600 rounded-full"></span>
          </button>
          
          <button className="text-slate-700 hover:bg-slate-100 p-2 rounded-lg transition-colors">
            <User size={20} />
          </button>

          <div className="border-l border-slate-200 pl-4">
            <button className="text-slate-700 hover:text-orange-600 flex items-center gap-2 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};