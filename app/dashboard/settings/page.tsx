'use client';

import { useState } from 'react';
import { 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'urgences',
      title: 'Alertes d\'urgence',
      description: 'Recevoir des notifications pour les nouvelles alertes',
      enabled: true
    },
    {
      id: 'equipes',
      title: 'Mises à jour des équipes',
      description: 'Notifications sur les changements d\'état des équipes',
      enabled: true
    },
    {
      id: 'rapports',
      title: 'Rapports quotidiens',
      description: 'Recevoir un résumé quotidien des activités',
      enabled: false
    },
    {
      id: 'maintenance',
      title: 'Maintenance système',
      description: 'Notifications sur les mises à jour et la maintenance',
      enabled: true
    }
  ]);

  const handleToggle = (id: string) => {
    setNotificationSettings(settings =>
      settings.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
        Configuration
      </h1>

      {/* Profil du service */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <UserIcon className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
            Profil du Service
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
              Nom du service
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
              defaultValue="Service des Sapeurs-Pompiers"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
              Zone de couverture
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
              defaultValue="Conakry"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BellIcon className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
            Notifications
          </h2>
        </div>
        <div className="space-y-6">
          {notificationSettings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <div>
                <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
                  {setting.title}
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  {setting.description}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={setting.enabled}
                  onChange={() => handleToggle(setting.id)}
                />
                <div className={`
                  w-11 h-6 rounded-full peer 
                  peer-focus:outline-none peer-focus:ring-4 
                  peer-focus:ring-primary/20
                  after:content-[''] after:absolute 
                  after:top-[2px] after:left-[2px] 
                  after:bg-white after:rounded-full 
                  after:h-5 after:w-5 after:transition-all
                  ${setting.enabled ? 'bg-primary after:translate-x-full' : 'bg-gray-200'}
                `}></div>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-warning/10 rounded-lg">
          <p className="text-sm text-warning">
            Les notifications sont essentielles pour la gestion des urgences. 
            Désactivez-les uniquement si nécessaire.
          </p>
        </div>
      </div>

      {/* Sécurité */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ShieldCheckIcon className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
            Sécurité
          </h2>
        </div>
        <div className="space-y-4">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Changer le mot de passe
          </button>
          <button className="px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary rounded-lg hover:bg-light-divider dark:hover:bg-dark-divider transition-colors">
            Gérer les accès
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary rounded-lg hover:bg-light-divider dark:hover:bg-dark-divider transition-colors">
          Annuler
        </button>
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          Enregistrer
        </button>
      </div>
    </div>
  );
} 