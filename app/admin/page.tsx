'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp, query, orderBy, limit, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface EmergencyService {
  id: string;
  name: string;
  type: 'medical' | 'police' | 'pompiers' | 'assistance_routiere';
  phone: string[];
  address: string;
  available24h: boolean;
  services: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  status: 'active' | 'inactive';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface EmergencyMessage {
  id: string;
  userId: string;
  serviceId: string;
  message: string;
  status: 'pending' | 'received' | 'processing' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: Timestamp;
}

export default function AdminPage() {
  const [services, setServices] = useState<EmergencyService[]>([]);
  const [messages, setMessages] = useState<EmergencyMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getPriorityClass = (priority: EmergencyMessage['priority']) => {
    const classes = {
      urgent: 'bg-error/10 text-error',
      high: 'bg-warning/10 text-warning',
      medium: 'bg-info/10 text-info',
      low: 'bg-success/10 text-success'
    };
    return classes[priority];
  };

  const handleDeleteAllServices = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer tous les services ? Cette action est irréversible.')) {
      return;
    }

    setDeleteLoading(true);
    try {
      const servicesCollection = collection(db, 'emergency_services');
      const servicesSnapshot = await getDocs(servicesCollection);
      
      const deletePromises = servicesSnapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref);
      });

      await Promise.all(deletePromises);
      setServices([]);
      alert('Tous les services ont été supprimés avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression des services:', error);
      alert('Une erreur est survenue lors de la suppression des services');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Administration
        </h1>
        <button
          onClick={handleDeleteAllServices}
          disabled={deleteLoading}
          className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 disabled:opacity-50 flex items-center gap-2"
        >
          {deleteLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Suppression...
            </>
          ) : (
            <>
              <span>🗑️</span>
              Vider la liste des services
            </>
          )}
        </button>
      </div>

      {/* Section Statistiques Globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
            Services Actifs
          </h3>
          <p className="text-3xl font-bold text-primary">
            {services.filter(s => s.status === 'active').length}
          </p>
        </div>
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
            Messages en attente
          </h3>
          <p className="text-3xl font-bold text-primary">
            {messages.filter(m => m.status === 'pending').length}
          </p>
        </div>
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
            Messages traités
          </h3>
          <p className="text-3xl font-bold text-primary">
            {messages.filter(m => m.status === 'resolved').length}
          </p>
        </div>
      </div>

      {/* Section Messages d'Urgence */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
          Messages d'Urgence Récents
        </h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-divider dark:border-dark-divider"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getPriorityClass(message.priority)}`}>
                        {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                      </span>
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {new Date(message.createdAt.seconds * 1000).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-light-text-primary dark:text-dark-text-primary mb-2">
                      {message.message}
                    </p>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      📍 {message.location.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-primary/10 text-primary rounded-lg">
                      Répondre
                    </button>
                    <button className="px-3 py-1 bg-success/10 text-success rounded-lg">
                      Résolu
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section Logs Système */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
          Logs Système
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {new Date().toLocaleString()}
                </p>
                <p className="text-light-text-primary dark:text-dark-text-primary">
                  Nouveau message d'urgence reçu
                </p>
              </div>
              <span className="px-3 py-1 bg-info/10 text-info rounded-full text-sm">
                Info
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 