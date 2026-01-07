import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const OccupancyChart: React.FC = () => {
  const data = [
    { time: '08:00', occupancy: 15, capacity: 100 },
    { time: '09:00', occupancy: 42, capacity: 100 },
    { time: '10:00', occupancy: 68, capacity: 100 },
    { time: '11:00', occupancy: 78, capacity: 100 },
    { time: '12:00', occupancy: 62, capacity: 100 },
    { time: '13:00', occupancy: 55, capacity: 100 },
    { time: '14:00', occupancy: 71, capacity: 100 },
    { time: '15:00', occupancy: 82, capacity: 100 },
    { time: '16:00', occupancy: 45, capacity: 100 },
    { time: '17:00', occupancy: 28, capacity: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="time" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
          cursor={{ fill: '#f1f5f9' }}
        />
        <Legend />
        <Bar dataKey="occupancy" fill="#CC4E0A" name="Occupation (%)" radius={[8, 8, 0, 0]} />
        <Bar dataKey="capacity" fill="#EFF2F8" name="Capacité (%)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};