'use client';

import { 
  PhoneIcon, 
  UserGroupIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import Image from 'next/image';

// Données simulées du service d'urgence
const serviceInfo = {
  nom: "Service des Sapeurs-Pompiers",
  zone: "Conakry",
  equipes: 12,
  personnelActif: 48,
  tempsMoyenIntervention: "4.5 minutes",
  interventionsEnCours: 3
};

const interventionsRecentes = [
  {
    id: 1,
    type: "Incendie",
    lieu: "Marché Madina",
    timestamp: "Il y a 10 minutes",
    status: "en cours",
    priorite: "haute"
  },
  {
    id: 2,
    type: "Accident routier",
    lieu: "Autoroute Fidel Castro",
    timestamp: "Il y a 25 minutes",
    status: "en cours",
    priorite: "moyenne"
  },
  {
    id: 3,
    type: "Secours médical",
    lieu: "Kaloum Centre",
    timestamp: "Il y a 45 minutes",
    status: "terminé",
    priorite: "normale"
  }
];

export default function DashboardHomePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* En-tête du service */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <Image 
              src="/logoS.png"
              alt="Logo du service"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
              {serviceInfo.nom}
            </h1>
            <div className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
              <MapPinIcon className="h-5 w-5" />
              <span>{serviceInfo.zone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Personnel actif
              </p>
              <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                {serviceInfo.personnelActif}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ClockIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Temps moyen d'intervention
              </p>
              <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                {serviceInfo.tempsMoyenIntervention}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interventions récentes */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
          Interventions récentes
        </h2>
        <div className="space-y-4">
          {interventionsRecentes.map((intervention) => (
            <div 
              key={intervention.id}
              className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-divider dark:border-dark-divider"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                    {intervention.type}
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {intervention.lieu}
                  </p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    {intervention.timestamp}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    intervention.status === 'en cours' 
                      ? 'bg-warning/10 text-warning' 
                      : 'bg-success/10 text-success'
                  }`}>
                    {intervention.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    intervention.priorite === 'haute' 
                      ? 'bg-error/10 text-error' 
                      : intervention.priorite === 'moyenne'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-success/10 text-success'
                  }`}>
                    {intervention.priorite}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone de couverture */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
          Zone de couverture
        </h2>
        <div className="h-64 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-divider dark:border-dark-divider">
          {/* Ici vous pourrez intégrer une carte */}
          <div className="h-full flex items-center justify-center text-light-text-secondary dark:text-dark-text-secondary">
            Carte de la zone de couverture
          </div>
        </div>
      </div>
    </div>
  );
} 