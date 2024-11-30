import Chart from '../components/dashboard/Chart';
import StatCard from '../components/dashboard/StatCard';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Tableau de bord
        </h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-card dark:bg-dark-card text-light-text-primary dark:text-dark-text-primary">
            <option>Aujourd'hui</option>
            <option>Cette semaine</option>
            <option>Ce mois</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Alertes en attente"
          value="12"
          change="+3"
          trend="up"
        />
        <StatCard
          title="Interventions en cours"
          value="8"
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
          value="45"
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
        <div className="space-y-4">
          <div className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg border border-light-divider dark:border-dark-divider">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                  Accident de la route
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Conakry, Kaloum
                </p>
              </div>
              <span className="px-3 py-1 bg-error/10 text-error rounded-full text-sm">
                Urgent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 