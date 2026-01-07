import React, { useState } from 'react';
import { Clock, MapPin, ParkingCircle, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { StatCard } from './StatCard';
import { OccupancyChart } from './OccupancyChart';
import { PresenceForm } from './PresenceForm';

export const Dashboard: React.FC = () => {
  const [presenceStatus, setPresenceStatus] = useState<'office' | 'home' | null>(null);

  const stats = [
    { label: 'Présents aujourd\'hui', value: '324', subtext: '68% des collaborateurs', icon: Users, color: 'cyan' },
    { label: 'Bureaux disponibles', value: '142', subtext: '42% des espaces', icon: MapPin, color: 'emerald' },
    { label: 'Places parking', value: '28', subtext: '7% disponibles', icon: ParkingCircle, color: 'orange' },
    { label: 'Alertes RH', value: '3', subtext: 'Limite dépassée', icon: AlertCircle, color: 'red' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-700">Tableau de bord</h1>
        <p className="text-slate-600">Aperçu en temps réel de l'occupation et de la collaboration</p>
      </div>

      {/* Presence Registration */}
      {!presenceStatus && (
        <div className="bg-gradient-to-r from-orange-50 to-slate-50 border-2 border-orange-200 rounded-xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-700 mb-2">Bienvenue! Commençons par votre statut</h2>
              <p className="text-slate-600 mb-6">Où êtes-vous aujourd'hui?</p>
              <PresenceForm onStatusChange={setPresenceStatus} />
            </div>
          </div>
        </div>
      )}

      {presenceStatus && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 mb-8">
          <CheckCircle size={20} className="text-emerald-700" />
          <span className="text-sm font-medium text-emerald-700">
            Statut mis à jour: {presenceStatus === 'office' ? 'Au bureau' : 'En télétravail'}
          </span>
        </div>
      )}

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Occupancy Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <Clock size={20} className="text-slate-500" />
              Occupation par heure
            </h2>
          </div>
          <OccupancyChart />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-700">Actions rapides</h2>
          
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center">
            Réserver un bureau
          </button>

          <button className="w-full border-2 border-orange-600 hover:bg-orange-50 text-orange-600 font-semibold py-3 px-4 rounded-lg transition-colors text-center">
            Réserver un parking
          </button>

          <button className="w-full border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-colors text-center">
            Chercher un collègue
          </button>

          <button className="w-full border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-3 px-4 rounded-lg transition-colors text-center">
            Contacter le support
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-700 mb-4">Activité récente</h2>
        <div className="space-y-3">
          {[
            { user: 'Marie Dupont', action: 'a réservé le bureau D-205', time: 'Il y a 5 min' },
            { user: 'Jean Martin', action: 'a enregistré sa présence au bureau', time: 'Il y a 12 min' },
            { user: 'Sophie Lefevre', action: 'a libéré le parking P-042', time: 'Il y a 23 min' },
            { user: 'System', action: 'Rapport d\'occupation généré', time: 'Il y a 1h' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-3 border-b border-slate-100 last:border-b-0">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};