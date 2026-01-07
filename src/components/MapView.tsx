import React, { useState } from 'react';
import { MapPin, Users, Layers, Search, Plus, Minus } from 'lucide-react';

export const MapView: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [selectedDesk, setSelectedDesk] = useState<string | null>(null);

  const floors = [
    { id: 1, name: 'Rez-de-chaussée' },
    { id: 2, name: 'Étage 1' },
    { id: 3, name: 'Étage 2' },
    { id: 4, name: 'Étage 3' },
  ];

  const desks = [
    { id: 'A101', x: 10, y: 10, occupied: true, user: 'Marie Dupont' },
    { id: 'A102', x: 25, y: 10, occupied: false, user: null },
    { id: 'A103', x: 40, y: 10, occupied: true, user: 'Jean Martin' },
    { id: 'B101', x: 10, y: 35, occupied: false, user: null },
    { id: 'B102', x: 25, y: 35, occupied: true, user: 'Sophie Lefevre' },
    { id: 'B103', x: 40, y: 35, occupied: false, user: null },
    { id: 'C101', x: 10, y: 60, occupied: true, user: 'Pierre Bernard' },
    { id: 'C102', x: 25, y: 60, occupied: false, user: null },
    { id: 'C103', x: 40, y: 60, occupied: true, user: 'Isabelle Laurent' },
  ];

  const collaborativeZones = [
    { id: 'zone1', name: 'Espace réunion A', x: 60, y: 15, width: 30, height: 20 },
    { id: 'zone2', name: 'Espace réunion B', x: 60, y: 50, width: 30, height: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-700">Carte interactive</h1>
        <p className="text-slate-600">Visualisez les bureaux disponibles et localisez vos collègues</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Floor Selection */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
            <Layers size={20} />
            Étages
          </h2>
          
          <div className="space-y-2">
            {floors.map((floor) => (
              <button
                key={floor.id}
                onClick={() => setSelectedFloor(floor.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  selectedFloor === floor.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {floor.name}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4 space-y-3">
            <h3 className="font-semibold text-slate-700">Occupation</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-600 rounded"></div>
                <span className="text-sm text-slate-600">Occupé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-100 border border-emerald-600 rounded"></div>
                <span className="text-sm text-slate-600">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-100 border border-cyan-600 rounded"></div>
                <span className="text-sm text-slate-600">Réunion</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-sm font-medium text-slate-700 mb-2">Étage {selectedFloor}</p>
            <p className="text-xs text-slate-600">Occupation: <span className="font-bold text-orange-600">68%</span></p>
            <p className="text-xs text-slate-600">Disponibles: <span className="font-bold text-emerald-600">6 bureaux</span></p>
          </div>
        </div>

        {/* Map View */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <MapPin size={20} />
              Plan de l'étage {selectedFloor}
            </h2>
            
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                className="p-2 hover:bg-slate-200 rounded transition-colors"
              >
                <Minus size={18} className="text-slate-700" />
              </button>
              <span className="text-sm font-medium text-slate-700 min-w-fit px-2">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.2))}
                className="p-2 hover:bg-slate-200 rounded transition-colors"
              >
                <Plus size={18} className="text-slate-700" />
              </button>
            </div>
          </div>

          {/* SVG Map */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-auto" style={{ height: '500px' }}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full p-4"
              style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}
            >
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.1" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />

              {/* Desks */}
              {desks.map((desk) => (
                <g key={desk.id}>
                  <rect
                    x={desk.x - 4}
                    y={desk.y - 4}
                    width="8"
                    height="8"
                    fill={desk.occupied ? '#CC4E0A' : '#E4EAE7'}
                    stroke={desk.occupied ? '#CC4E0A' : '#007B52'}
                    strokeWidth="0.3"
                    rx="1"
                    cursor="pointer"
                    onClick={() => setSelectedDesk(desk.id)}
                  />
                  <text
                    x={desk.x}
                    y={desk.y + 6}
                    fontSize="2"
                    textAnchor="middle"
                    fill={desk.occupied ? '#fff' : '#25465F'}
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    {desk.id[0]}
                  </text>
                </g>
              ))}

              {/* Collaborative Zones */}
              {collaborativeZones.map((zone) => (
                <g key={zone.id}>
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.width}
                    height={zone.height}
                    fill="#E4EAED"
                    stroke="#0C7B91"
                    strokeWidth="0.3"
                    strokeDasharray="2"
                    rx="1"
                  />
                  <text
                    x={zone.x + zone.width / 2}
                    y={zone.y + zone.height / 2}
                    fontSize="3"
                    textAnchor="middle"
                    fill="#0C7B91"
                    fontWeight="bold"
                    pointerEvents="none"
                  >
                    {zone.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Selected Desk Details */}
          {selectedDesk && (
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-bold text-slate-700 mb-3">Détails du bureau</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Bureau:</span>
                  <span className="font-semibold text-slate-700">{selectedDesk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Statut:</span>
                  <span className="font-semibold text-orange-600">Occupé</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Utilisateur:</span>
                  <span className="font-semibold text-slate-700">-</span>
                </div>
                <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                  Demander à changer de siège
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};