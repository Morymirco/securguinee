'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface ChatMessage {
  id: string;
  message: string;
  userId: string;
  serviceId: string;
  serviceName?: string;
  status: 'pending' | 'received' | 'processing' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: any;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const chatRef = collection(db, 'chat_urgence');
      const q = query(chatRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      // Récupérer les services pour avoir les noms
      const servicesRef = collection(db, 'emergency_services');
      const servicesSnapshot = await getDocs(servicesRef);
      const servicesMap = new Map();
      servicesSnapshot.docs.forEach(doc => {
        servicesMap.set(doc.id, doc.data().name);
      });

      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        serviceName: servicesMap.get(doc.data().serviceId) || 'Service inconnu'
      })) as ChatMessage[];

      setMessages(messagesData);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (messageId: string, newStatus: ChatMessage['status']) => {
    try {
      const messageRef = doc(db, 'chat_urgence', messageId);
      await updateDoc(messageRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Mettre à jour l'état local
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      ));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const getPriorityClass = (priority: ChatMessage['priority']) => {
    const classes = {
      urgent: 'bg-error/10 text-error',
      high: 'bg-warning/10 text-warning',
      medium: 'bg-info/10 text-info',
      low: 'bg-success/10 text-success'
    };
    return classes[priority];
  };

  const getStatusClass = (status: ChatMessage['status']) => {
    const classes = {
      pending: 'bg-error/10 text-error',
      received: 'bg-info/10 text-info',
      processing: 'bg-warning/10 text-warning',
      resolved: 'bg-success/10 text-success'
    };
    return classes[status];
  };

  const filteredMessages = messages.filter(message => {
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Messages d'Urgence
        </h1>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-card dark:bg-dark-card"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="received">Reçus</option>
            <option value="processing">En traitement</option>
            <option value="resolved">Résolus</option>
          </select>
          <select
            className="px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-card dark:bg-dark-card"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">Toutes les priorités</option>
            <option value="urgent">Urgent</option>
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div 
              key={message.id}
              className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getPriorityClass(message.priority)}`}>
                      {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(message.status)}`}>
                      {message.status === 'pending' ? 'En attente' :
                       message.status === 'received' ? 'Reçu' :
                       message.status === 'processing' ? 'En traitement' : 'Résolu'}
                    </span>
                  </div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {new Date(message.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={message.status}
                    onChange={(e) => handleStatusChange(message.id, e.target.value as ChatMessage['status'])}
                    className="px-3 py-1 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
                  >
                    <option value="pending">En attente</option>
                    <option value="received">Reçu</option>
                    <option value="processing">En traitement</option>
                    <option value="resolved">Résolu</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-light-text-primary dark:text-dark-text-primary">
                  {message.message}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    📍 {message.location.address}
                  </p>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Service assigné: {message.serviceName}
                  </p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 