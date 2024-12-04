'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp, query, where, orderBy, addDoc } from 'firebase/firestore';
import Chart from '../components/dashboard/Chart';
import StatCard from '../components/dashboard/StatCard';
import { db } from '../firebase/config';
import { useRouter } from 'next/navigation';

interface Alert {
  id: string;
  type: string;
  location: string;
  status: 'pending' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Timestamp;
}

interface ChatMessage {
  id: string;
  message: string;
  userId: string;
  userName?: string;
  serviceId: string;
  status: 'pending' | 'received' | 'processing' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: any;
  replyTo?: string;
  replyToMessage?: string;
}

interface ServiceData {
  id: string;
  name: string;
  type: 'medical' | 'police' | 'pompiers' | 'assistance_routiere';
  email: string;
  phone: string[];
  address: string;
  available24h: boolean;
  status: 'active' | 'inactive';
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

const formatDate = (timestamp: any) => {
  if (!timestamp) return '';
  
  if (timestamp.seconds) {
    // Si c'est un Timestamp Firestore
    return new Date(timestamp.seconds * 1000).toLocaleString();
  } else if (timestamp instanceof Date) {
    // Si c'est un objet Date
    return timestamp.toLocaleString();
  } else {
    // Si c'est une autre forme de date
    return new Date(timestamp).toLocaleString();
  }
};

export default function DashboardPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('today');
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      router.push('/login');
      return;
    }

    const service = JSON.parse(userData) as ServiceData;
    setServiceData(service);

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching messages for service ID:", service.id);

        const chatRef = collection(db, 'chat_urgence');
        const chatSnapshot = await getDocs(chatRef);
        
        console.log("Total messages found:", chatSnapshot.size);

        const messagesData = chatSnapshot.docs.map(doc => {
          const data = doc.data();
          console.log("Message data:", data);
          return {
            id: doc.id,
            message: data.message || '',
            userId: data.userId || '',
            userName: data.userName || '',
            serviceId: data.serviceId || '',
            status: data.status || 'pending',
            priority: data.priority || 'medium',
            location: {
              latitude: data.location?.latitude || 0,
              longitude: data.location?.longitude || 0,
              address: data.location?.address || ''
            },
            createdAt: data.createdAt || new Date(),
            replyTo: data.replyTo || '',
            replyToMessage: data.replyToMessage || ''
          } as ChatMessage;
        });

        console.log("Processed messages:", messagesData);
        setChatMessages(messagesData);

      } catch (error) {
        console.error("Erreur détaillée lors du chargement des données:", error);
        if (error instanceof Error) {
          console.log("Message d'erreur:", error.message);
        }
        setChatMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const getPriorityClass = (priority: Alert['priority']) => {
    const classes = {
      urgent: 'bg-error/10 text-error',
      high: 'bg-warning/10 text-warning',
      medium: 'bg-info/10 text-info',
      low: 'bg-success/10 text-success'
    };
    return classes[priority];
  };

  const handleReply = (message: ChatMessage) => {
    setReplyingTo(message);
    const inputElement = document.getElementById('messageInput');
    if (inputElement) {
      inputElement.focus();
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !serviceData) return;

    try {
      const messageData = {
        message: newMessage.trim(),
        serviceId: serviceData.id,
        userId: serviceData.id,
        userName: serviceData.name,
        status: 'pending',
        priority: 'medium',
        location: {
          latitude: 0,
          longitude: 0,
          address: serviceData.address
        },
        createdAt: new Date(),
        ...(replyingTo && {
          replyTo: replyingTo.id,
          replyToMessage: replyingTo.message
        })
      };

      await addDoc(collection(db, 'chat_urgence'), messageData);
      setNewMessage('');
      setReplyingTo(null);
      
      const chatRef = collection(db, 'chat_urgence');
      const chatSnapshot = await getDocs(chatRef);
      const messagesData = chatSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChatMessage[];
      setChatMessages(messagesData);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  // Position par défaut (Conakry)
  const defaultPosition: [number, number] = [9.5092, -13.7122];

  if (!serviceData) return null;

  return (
    <div className="max-w-7xl mx-auto">
      {/* En-tête avec informations du service */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
              {serviceData.name}
            </h1>
            <div className="mt-2 space-y-1 text-light-text-secondary dark:text-dark-text-secondary">
              <p>📍 {serviceData.address}</p>
              <p>📞 {Array.isArray(serviceData.phone) ? serviceData.phone.join(', ') : serviceData.phone}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              serviceData.status === 'active' 
                ? 'bg-success/10 text-success' 
                : 'bg-error/10 text-error'
            }`}>
              {serviceData.status === 'active' ? 'En service' : 'Hors service'}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              serviceData.available24h 
                ? 'bg-success/10 text-success' 
                : 'bg-warning/10 text-warning'
            }`}>
              {serviceData.available24h ? 'Disponible 24h/24' : 'Horaires spécifiques'}
            </span>
          </div>
        </div>
      </div>

      {/* Filtres temporels */}
      <div className="flex justify-end mb-8">
        <select 
          className="px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="today">Aujourd'hui</option>
          <option value="week">Cette semaine</option>
          <option value="month">Ce mois</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Alertes en attente"
          value={alerts.filter(a => a.status === 'pending').length.toString()}
          change="+3"
          trend="up"
        />
        <StatCard
          title="Interventions en cours"
          value={alerts.filter(a => a.status === 'in_progress').length.toString()}
          change="+2"
          trend="up"
        />
        <StatCard
          title="Temps de réponse moyen"
          value="4.5 min"
          change="-1.2"
          trend="down"
        />
        <StatCard
          title="Incidents résolus"
          value={alerts.filter(a => a.status === 'resolved').length.toString()}
          change="+15"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
            Distribution des incidents
          </h2>
          <Chart type="bar" />
        </div>
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
            Tendances des interventions
          </h2>
          <Chart type="line" />
        </div>
      </div>

      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
          Alertes récentes
        </h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts
              .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
              .slice(0, 5)
              .map(alert => (
                <div 
                  key={alert.id}
                  className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-divider dark:border-dark-divider"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                        {alert.type}
                      </h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {alert.location}
                      </p>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                        {new Date(alert.createdAt.seconds * 1000).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getPriorityClass(alert.priority)}`}>
                      {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Section Messagerie */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
            Messagerie
          </h2>
        </div>

        {/* Zone de chat */}
        <div className="h-[400px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {chatMessages.map((message) => (
              <div 
                key={message.id}
                className={`p-4 rounded-lg max-w-[80%] ${
                  message.userId === serviceData?.id
                    ? 'ml-auto bg-primary/10 text-primary'
                    : 'bg-light-surface dark:bg-dark-surface'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getPriorityClass(message.priority)}`}>
                    {message.priority}
                  </span>
                  <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
                <p>{message.message}</p>
                {message.location?.address && (
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    📍 {message.location.address}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Formulaire d'envoi */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="flex-1 px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>

      {/* Section Messages */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
            Messages d'Urgence
          </h2>
          <div className="flex gap-2">
            <select 
              className="px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
              onChange={(e) => {
                // Ajoutez ici la logique de filtrage
              }}
            >
              <option value="all">Tous les messages</option>
              <option value="pending">En attente</option>
              <option value="processing">En traitement</option>
              <option value="resolved">Résolus</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : chatMessages.length === 0 ? (
          <div className="text-center py-8 text-light-text-secondary dark:text-dark-text-secondary">
            Aucun message pour le moment
          </div>
        ) : (
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div 
                key={message.id}
                className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-divider dark:border-dark-divider hover:border-primary/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-primary">
                        {message.userName || 'Utilisateur'}
                      </span>
                      <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>

                    {message.replyTo && (
                      <div className="ml-4 mb-2 p-2 border-l-2 border-primary/30 bg-primary/5 rounded">
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          En réponse à: {message.replyToMessage}
                        </p>
                      </div>
                    )}

                    <p className="text-light-text-primary dark:text-dark-text-primary">
                      {message.message}
                    </p>

                    {message.location?.address && (
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        📍 {message.location.address}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => handleReply(message)}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                    >
                      Répondre
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          {replyingTo && (
            <div className="mb-2 p-2 bg-primary/5 rounded-lg flex justify-between items-center">
              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Réponse à: {replyingTo.message}
              </span>
              <button 
                onClick={() => setReplyingTo(null)}
                className="text-error hover:text-error/80"
              >
                ✕
              </button>
            </div>
          )}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              id="messageInput"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={replyingTo ? "Écrivez votre réponse..." : "Tapez votre message..."}
              className="flex-1 px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 