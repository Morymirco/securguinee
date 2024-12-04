'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: 'admin' | 'service_manager' | 'operator' | 'user';
  serviceId?: string;
  status: 'active' | 'inactive';
  lastLogin?: Timestamp;
  createdAt: Timestamp;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        setUsers(usersData);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleLabel = (role: User['role']) => {
    const labels = {
      admin: 'Administrateur',
      service_manager: 'Gestionnaire de Service',
      operator: 'Opérateur',
      user: 'Utilisateur'
    };
    return labels[role];
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Gestion des Utilisateurs
        </h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Ajouter un utilisateur
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">
            Chargement des utilisateurs...
          </p>
        </div>
      ) : (
        <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  className="px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary"
                />
                <select className="px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary">
                  <option value="">Tous les rôles</option>
                  <option value="admin">Administrateur</option>
                  <option value="service_manager">Gestionnaire</option>
                  <option value="operator">Opérateur</option>
                  <option value="user">Utilisateur</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light-divider dark:border-dark-divider">
                    <th className="text-left py-4 px-6">Utilisateur</th>
                    <th className="text-left py-4 px-6">Contact</th>
                    <th className="text-left py-4 px-6">Rôle</th>
                    <th className="text-left py-4 px-6">Dernière connexion</th>
                    <th className="text-left py-4 px-6">Statut</th>
                    <th className="text-left py-4 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr 
                      key={user.id}
                      className="border-b border-light-divider dark:border-dark-divider hover:bg-light-surface dark:hover:bg-dark-surface"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-semibold">
                            {user.prenom} {user.nom}
                          </div>
                          <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">{user.telephone}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          {user.lastLogin ? new Date(user.lastLogin.seconds * 1000).toLocaleString() : 'Jamais connecté'}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.status === 'active' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-error/10 text-error'
                        }`}>
                          {user.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button 
                            className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                            title="Modifier"
                          >
                            ✏️
                          </button>
                          <button 
                            className="p-2 hover:bg-warning/10 rounded-lg text-warning transition-colors"
                            title="Réinitialiser le mot de passe"
                          >
                            🔑
                          </button>
                          <button 
                            className="p-2 hover:bg-error/10 rounded-lg text-error transition-colors"
                            title="Désactiver"
                          >
                            🚫
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 