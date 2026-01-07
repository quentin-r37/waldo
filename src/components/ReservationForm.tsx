import React, { useState } from 'react';
import { MapPin, ParkingCircle, Calendar, Clock } from 'lucide-react';

export const ReservationForm: React.FC = () => {
  const [reservationType, setReservationType] = useState<'desk' | 'parking'>('desk');
  const [formData, setFormData] = useState({
    date: '',
    startTime: '09:00',
    endTime: '17:00',
    location: '',
  });

  const deskOptions = ['A-201', 'A-202', 'A-203', 'B-101', 'B-102', 'C-301'];
  const parkingOptions = ['P-001', 'P-002', 'P-003', 'P-042', 'P-043'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', { type: reservationType, ...formData });
    alert('Réservation confirmée!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-700">Nouvelle réservation</h2>

      {/* Type Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">Type de réservation</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setReservationType('desk')}
            className={`p-4 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
              reservationType === 'desk'
                ? 'bg-orange-600 text-white border-orange-600'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <MapPin size={20} />
            Bureau
          </button>
          <button
            type="button"
            onClick={() => setReservationType('parking')}
            className={`p-4 rounded-xl border-2 font-semibold transition-all flex items-center justify-center gap-2 ${
              reservationType === 'parking'
                ? 'bg-orange-600 text-white border-orange-600'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <ParkingCircle size={20} />
            Parking
          </button>
        </div>
      </div>

      {/* Location Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Sélectionnez un {reservationType === 'desk' ? 'bureau' : 'parking'}
        </label>
        <select
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
        >
          <option value="">-- Choisir --</option>
          {(reservationType === 'desk' ? deskOptions : parkingOptions).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Date Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Calendar size={16} />
          Date
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
      </div>

      {/* Time Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Clock size={16} />
            Heure début
          </label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Clock size={16} />
            Heure fin
          </label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
      >
        Confirmer la réservation
      </button>
    </form>
  );
};