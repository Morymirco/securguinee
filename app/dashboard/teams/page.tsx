import { UserGroupIcon, PhoneIcon } from '@heroicons/react/24/outline';

const equipes = [
  {
    id: 1,
    nom: "Équipe Alpha",
    responsable: "Mamadou Diallo",
    membres: 6,
    zone: "Kaloum",
    status: "En service",
    vehicule: "Ambulance A1",
    contact: "+224 621 00 00 00"
  },
  {
    id: 2,
    nom: "Équipe Bravo",
    responsable: "Fatou Camara",
    membres: 4,
    zone: "Ratoma",
    status: "En intervention",
    vehicule: "Unité d'intervention B2",
    contact: "+224 622 00 00 00"
  },
  // Ajoutez d'autres équipes
];

export default function TeamsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Équipes d'intervention
        </h1>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
          Nouvelle équipe
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipes.map((equipe) => (
          <div 
            key={equipe.id}
            className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                    {equipe.nom}
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {equipe.zone}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                equipe.status === 'En service' 
                  ? 'bg-success/10 text-success' 
                  : 'bg-warning/10 text-warning'
              }`}>
                {equipe.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Responsable
                </p>
                <p className="text-light-text-primary dark:text-dark-text-primary">
                  {equipe.responsable}
                </p>
              </div>
              <div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Véhicule
                </p>
                <p className="text-light-text-primary dark:text-dark-text-primary">
                  {equipe.vehicule}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-primary" />
                <p className="text-light-text-primary dark:text-dark-text-primary">
                  {equipe.contact}
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Assigner mission
              </button>
              <button className="px-4 py-2 bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary rounded-lg hover:bg-light-divider dark:hover:bg-dark-divider transition-colors">
                Détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 