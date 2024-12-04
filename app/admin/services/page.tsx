'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ServiceModal from './ServiceModal';

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

export default function ServicesPage() {
  const [services, setServices] = useState<EmergencyService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const servicesCollection = collection(db, 'emergency_services');
      const servicesSnapshot = await getDocs(servicesCollection);
      const servicesData = servicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EmergencyService[];
      setServices(servicesData);
    } catch (error) {
      console.error("Erreur lors du chargement des services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const getServiceTypeLabel = (type: EmergencyService['type']) => {
    const labels = {
      medical: 'Médical',
      police: 'Police',
      pompiers: 'Sapeurs Pompiers',
      assistance_routiere: 'Assistance Routière'
    };
    return labels[type];
  };

  const handleEdit = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedServiceId(null);
    setIsModalOpen(false);
  };

  const handleServiceUpdate = () => {
    fetchServices();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Gestion des Services
        </h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Ajouter un service
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">
            Chargement des services...
          </p>
        </div>
      ) : (
        <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-light-divider dark:border-dark-divider">
                  <th className="text-left py-4 px-6">Service</th>
                  <th className="text-left py-4 px-6">Type</th>
                  <th className="text-left py-4 px-6">Contact</th>
                  <th className="text-left py-4 px-6">Adresse</th>
                  <th className="text-left py-4 px-6">Disponibilité</th>
                  <th className="text-left py-4 px-6">Statut</th>
                  <th className="text-left py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr 
                    key={service.id}
                    className="border-b border-light-divider dark:border-dark-divider hover:bg-light-surface dark:hover:bg-dark-surface"
                  >
                    <td className="py-4 px-6">
                      <div className="font-semibold">{service.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {getServiceTypeLabel(service.type)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        {service.phone.map((num, index) => (
                          <div key={index}>{num}</div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">{service.address}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        service.available24h 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {service.available24h ? '24h/24' : 'Horaires spécifiques'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        service.status === 'active' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-error/10 text-error'
                      }`}>
                        {service.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(service.id)}
                          className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button 
                          className="p-2 hover:bg-error/10 rounded-lg text-error transition-colors"
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ServiceModal
        serviceId={selectedServiceId}
        isOpen={isModalOpen || isAddModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsAddModalOpen(false);
          setSelectedServiceId(null);
        }}
        onUpdate={handleServiceUpdate}
      />
    </div>
  );
} 