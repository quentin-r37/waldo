import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingUp, Users, Calendar, Download } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');

  const occupancyTrend = [
    { date: 'Lun', occupancy: 65, capacity: 100 },
    { date: 'Mar', occupancy: 72, capacity: 100 },
    { date: 'Mer', occupancy: 78, capacity: 100 },
    { date: 'Jeu', occupancy: 74, capacity: 100 },
    { date: 'Ven', occupancy: 58, capacity: 100 },
  ];

  const spaceUtilization = [
    { name: 'Bureau', value: 68, fill: '#CC4E0A' },
    { name: 'Réunion', value: 52, fill: '#0C7B91' },
    { name: 'Collaboration', value: 45, fill: '#007B52' },
    { name: 'Disponible', value: 32, fill: '#EFF2F8' },
  ];

  const parkingTrend = [
    { date: 'Lun', used: 85, available: 15 },
    { date: 'Mar', used: 92, available: 8 },
    { date: 'Mer', used: 88, available: 12 },
    { date: 'Jeu', used: 87, available: 13 },
    { date: 'Ven', used: 72, available: 28 },
  ];

  const stats = [
    { label: 'Taux d\'occupation moyen', value: '69.4%', change: '+2.3%' },
    { label: 'Jours télétravail/semaine', value: '2.4', change: '-0.3' },
    { label: 'Collaborateurs présents moy.', value: '346', change: '+12' },
    { label: 'Places parking utilisées', value: '84.8%', change: '+1.5%' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-700 flex items-center gap-3">
          <BarChart3 size={32} />
          Rapports & Analyses
        </h1>
        <p className="text-slate-600">Insights sur l'utilisation des espaces et la collaboration hybride</p>
      </div>

      {/* Date Range Selector */}
      <div className="flex gap-3 flex-wrap">
        {[
          { id: 'week', label: 'Cette semaine' },
          { id: 'month', label: 'Ce mois' },
          { id: 'quarter', label: 'Ce trimestre' },
          { id: 'year', label: 'Cette année' },
        ].map((range) => (
          <button
            key={range.id}
            onClick={() => setDateRange(range.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              dateRange === range.id
                ? 'bg-orange-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:border-slate-400'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold text-slate-700 mb-2">{stat.value}</h3>
            <p className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-slate-500" />
            Tendance d'occupation
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="occupancy"
                stroke="#CC4E0A"
                strokeWidth={2}
                name="Occupation (%)"
                dot={{ fill: '#CC4E0A', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Space Utilization */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
            <Users size={20} className="text-slate-500" />
            Utilisation des espaces
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spaceUtilization}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {spaceUtilization.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Parking Usage */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-slate-500" />
            Utilisation du parking
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={parkingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="used" fill="#CC4E0A" name="Utilisées" radius={[8, 8, 0, 0]} />
              <Bar dataKey="available" fill="#E4EAE7" name="Disponibles" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export Button */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">Exporter les rapports</h3>
          <p className="text-sm text-slate-600">Téléchargez vos rapports détaillés en PowerBI format</p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 flex-shrink-0">
          <Download size={20} />
          Télécharger
        </button>
      </div>
    </div>
  );
};