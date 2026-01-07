import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { MapView } from './components/MapView';
import { Reservations } from './components/Reservations';
import { MagicTeammates } from './components/MagicTeammates';
import { Analytics } from './components/Analytics';
import { ChatSupport } from './components/ChatSupport';

type ViewType = 'dashboard' | 'map' | 'reservations' | 'teammates' | 'analytics' | 'chat';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'map':
        return <MapView />;
      case 'reservations':
        return <Reservations />;
      case 'teammates':
        return <MagicTeammates />;
      case 'analytics':
        return <Analytics />;
      case 'chat':
        return <ChatSupport />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Navigation 
          isOpen={sidebarOpen} 
          currentView={currentView} 
          onViewChange={setCurrentView}
        />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;