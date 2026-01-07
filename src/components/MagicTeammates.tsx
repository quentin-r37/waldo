import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, MessageSquare, Users } from 'lucide-react';

interface Colleague {
  id: string;
  name: string;
  title: string;
  location: string;
  status: 'office' | 'home' | 'away';
  floor?: string;
  desk?: string;
  avatar: string;
  email: string;
  phone: string;
  lastSeen: string;
}

export const MagicTeammates: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColleague, setSelectedColleague] = useState<Colleague | null>(null);

  const colleagues: Colleague[] = [
    {
      id: '1',
      name: 'Marie Dupont',
      title: 'Product Manager',
      location: 'Bureau A-205',
      status: 'office',
      floor: '2',
      desk: 'A-205',
      avatar: 'MD',
      email: 'marie.dupont@company.com',
      phone: '+33 1 23 45 67 89',
      lastSeen: 'À l\'instant',
    },
    {
      id: '2',
      name: 'Jean Martin',
      title: 'Developer',
      location: 'Bureau B-102',
      status: 'office',
      floor: '2',
      desk: 'B-102',
      avatar: 'JM',
      email: 'jean.martin@company.com',
      phone: '+33 1 23 45 67 90',
      lastSeen: 'Il y a 5 min',
    },
    {
      id: '3',
      name: 'Sophie Lefevre',
      title: 'Designer',
      location: 'En télétravail',
      status: 'home',
      avatar: 'SL',
      email: 'sophie.lefevre@company.com',
      phone: '+33 1 23 45 67 91',
      lastSeen: 'Il y a 2h',
    },
    {
      id: '4',
      name: 'Pierre Bernard',
      title: 'HR Manager',
      location: 'Bureau C-101',
      status: 'office',
      floor: '3',
      desk: 'C-101',
      avatar: 'PB',
      email: 'pierre.bernard@company.com',
      phone: '+33 1 23 45 67 92',
      lastSeen: 'À l\'instant',
    },
    {
      id: '5',
      name: 'Isabelle Laurent',
      title: 'Finance',
      location: 'En déplacement',
      status: 'away',
      avatar: 'IL',
      email: 'isabelle.laurent@company.com',
      phone: '+33 1 23 45 67 93',
      lastSeen: 'Il y a 30 min',
    },
  ];

  const filteredColleagues = colleagues.filter(
    (colleague) =>
      colleague.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      colleague.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'office':
        return 'bg-emerald-500';
      case 'home':
        return 'bg-blue-500';
      case 'away':
        return 'bg-amber-500';
      default:
        return 'bg-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'office':
        return 'Au bureau';
      case 'home':
        return 'En télétravail';
      case 'away':
        return 'En déplacement';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-700 flex items-center gap-3">
          <Users size={32} />
          Magic Teammates
        </h1>
        <p className="text-slate-600">Localisez vos collègues et collaborez ensemble</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Recherchez un collègue par nom ou fonction..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colleagues List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredColleagues.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <p className="text-slate-600">Aucun collègue trouvé</p>
            </div>
          ) : (
            filteredColleagues.map((colleague) => (
              <div
                key={colleague.id}
                onClick={() => setSelectedColleague(colleague)}
                className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedColleague?.id === colleague.id
                    ? 'border-orange-600 bg-orange-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-slate-300 text-white flex items-center justify-center font-bold text-sm">
                      {colleague.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(colleague.status)}`}></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-700">{colleague.name}</h3>
                    <p className="text-sm text-slate-500">{colleague.title}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      {colleague.status === 'office' ? (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <MapPin size={14} />
                          {colleague.location}
                        </div>
                      ) : (
                        <div className="text-slate-500">{colleague.location}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(colleague.status)}`}>
                      {getStatusLabel(colleague.status)}
                    </span>
                    <p className="text-xs text-slate-500 mt-2">{colleague.lastSeen}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Colleague Details */}
        {selectedColleague && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-20 h-fit space-y-6">
            <div className="text-center">
              <div className="relative w-16 h-16 rounded-full bg-slate-300 text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                {selectedColleague.avatar}
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor(selectedColleague.status)}`}></div>
              </div>
              <h2 className="text-xl font-bold text-slate-700">{selectedColleague.name}</h2>
              <p className="text-sm text-slate-600">{selectedColleague.title}</p>
              <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(selectedColleague.status)}`}>
                {getStatusLabel(selectedColleague.status)}
              </span>
            </div>

            {selectedColleague.status === 'office' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-600" />
                  Localisation
                </h3>
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">{selectedColleague.location}</span>
                </p>
                {selectedColleague.floor && (
                  <p className="text-xs text-slate-500 mt-2">Étage {selectedColleague.floor}</p>
                )}
              </div>
            )}

            <div className="space-y-3 border-t border-slate-200 pt-4">
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                Envoyer un message
              </button>

              <button className="w-full border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Phone size={18} />
                Appeler
              </button>

              <button className="w-full border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Mail size={18} />
                Envoyer un email
              </button>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-600">Dernière connexion</p>
              <p className="font-semibold text-slate-700">{selectedColleague.lastSeen}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};