import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const incidents = [
  {
    id: 1,
    type: "Incendie",
    lieu: "Marché Madina",
    date: "2024-03-20",
    status: "En cours",
    equipe: "Équipe A",
    description: "Incendie majeur dans la section ouest du marché"
  },
  // ... autres incidents
];

export default function IncidentsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Gestion des Incidents
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Nouvel incident
          </button>
        </div>
      </div>

      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-light-surface dark:bg-dark-surface">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                Lieu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                Équipe
              </th>
              <th className="px-6 py-3 relative">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-divider dark:divide-dark-divider">
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-warning mr-2" />
                    <span className="text-light-text-primary dark:text-dark-text-primary">
                      {incident.type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text-primary dark:text-dark-text-primary">
                  {incident.lieu}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text-primary dark:text-dark-text-primary">
                  {incident.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning/10 text-warning">
                    {incident.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-light-text-primary dark:text-dark-text-primary">
                  {incident.equipe}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary hover:text-primary-dark">
                    Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 