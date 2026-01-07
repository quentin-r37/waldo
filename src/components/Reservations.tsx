import React, { useState } from 'react';
import { Calendar, MapPin, ParkingCircle, Clock, CheckCircle, X, Plus } from 'lucide-react';
import { ReservationForm } from './ReservationForm';

interface Reservation {
  id: string;
  type: 'desk' | 'parking';
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export const Reservations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'active' | 'history'>('active');
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 'RES001',
      type: 'desk',
      location: 'Bureau A-205',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '17:00',
      status: 'confirmed',
    },
    {
      id: 'RES002',
      type: 'parking',
      location: 'Parking P-042',
      date: '2024-01-15',
      startTime: '08:30',
      endTime: '17:30',
      status: 'confirmed',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const handleCancelReservation = (id: string) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, status: 'cancelled' } : res
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-700">Mes réservations</h1>
        <p className="text-slate-600">Gérez vos réservations de bureaux et parkings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { id: 'active', label: 'Actives', icon: Calendar },
          { id: 'new', label: 'Nouvelle réservation', icon: Plus },
          { id: 'history', label: 'Historique', icon: Clock },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? 'text-orange-600 border-orange-600'
                : 'text-slate-600 border-transparent hover:text-slate-700'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {reservations
            .filter((res) => res.status !== 'cancelled')
            .map((reservation) => (
              <div
                key={reservation.id}
                className={`border-2 rounded-xl p-6 ${getStatusColor(reservation.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg ${reservation.type === 'desk' ? 'bg-slate-700 text-white' : 'bg-slate-700 text-white'}`}>
                      {reservation.type === 'desk' ? (
                        <MapPin size={24} />
                      ) : (
                        <ParkingCircle size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{reservation.location}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600 text-xs mb-1">Date</p>
                          <p className="font-semibold">{new Date(reservation.date).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div>
                          <p className="text-slate-600 text-xs mb-1">Horaires</p>
                          <p className="font-semibold">{reservation.startTime} - {reservation.endTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border`}>
                      {getStatusLabel(reservation.status)}
                    </span>
                    {reservation.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelReservation(reservation.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        <X size={16} />
                        Annuler
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {activeTab === 'new' && (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <ReservationForm />
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          {reservations
            .filter((res) => res.status === 'cancelled')
            .map((reservation) => (
              <div key={reservation.id} className={`border-2 rounded-xl p-6 opacity-60 ${getStatusColor(reservation.status)}`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                    {reservation.type === 'desk' ? (
                      <MapPin size={24} />
                    ) : (
                      <ParkingCircle size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{reservation.location}</h3>
                    <p className="text-sm text-slate-600">
                      {new Date(reservation.date).toLocaleDateString('fr-FR')} • {reservation.startTime} - {reservation.endTime}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold border">
                    {getStatusLabel(reservation.status)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};