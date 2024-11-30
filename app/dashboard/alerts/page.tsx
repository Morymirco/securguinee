import { BellAlertIcon } from '@heroicons/react/24/outline';

const alerts = [
  {
    id: 1,
    type: "Accident de la route",
    lieu: "Autoroute Fidel Castro",
    timestamp: "Il y a 5 minutes",
    status: "Non assigné",
    priorite: "Haute",
    description: "Collision entre deux véhicules, plusieurs blessés signalés"
  },
  // ... autres alertes
];

export default function AlertsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Alertes en cours
        </h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-card dark:bg-dark-card">
            <option>Toutes les priorités</option>
            <option>Haute priorité</option>
            <option>Moyenne priorité</option>
            <option>Basse priorité</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="p-2 bg-error/10 rounded-lg">
                  <BellAlertIcon className="h-6 w-6 text-error" />
                </div>
                <div>
                  <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                    {alert.type}
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {alert.lieu}
                  </p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                    {alert.timestamp}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-error/10 text-error rounded-full text-sm">
                  {alert.priorite}
                </span>
                <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm">
                  {alert.status}
                </span>
              </div>
            </div>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">
              {alert.description}
            </p>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Prendre en charge
              </button>
              <button className="px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary rounded-lg hover:bg-light-divider dark:hover:bg-dark-divider transition-colors">
                Voir les détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 