'use client';

import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

const monthlyData = [
  { mois: 'Jan', accidents: 65, incendies: 45, urgences: 58 },
  { mois: 'Fév', accidents: 59, incendies: 49, urgences: 62 },
  { mois: 'Mar', accidents: 80, incendies: 55, urgences: 70 },
  { mois: 'Avr', accidents: 81, incendies: 42, urgences: 65 },
  { mois: 'Mai', accidents: 56, incendies: 38, urgences: 55 },
  { mois: 'Juin', accidents: 55, incendies: 45, urgences: 60 }
];

const typeIncidents = [
  { name: 'Accidents routiers', value: 35 },
  { name: 'Incendies', value: 25 },
  { name: 'Urgences médicales', value: 20 },
  { name: 'Catastrophes naturelles', value: 10 },
  { name: 'Autres', value: 10 }
];

const COLORS = ['#094FC6', '#EF4444', '#F59E0B', '#10B981', '#6B7280'];

export default function StatsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Statistiques et Analyses
        </h1>
        <select className="px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-card dark:bg-dark-card">
          <option>Cette année</option>
          <option>6 derniers mois</option>
          <option>30 derniers jours</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Évolution mensuelle */}
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
            Évolution mensuelle des interventions
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accidents" stroke="#094FC6" strokeWidth={2} />
              <Line type="monotone" dataKey="incendies" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="urgences" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution par type */}
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
            Distribution par type d'incident
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeIncidents}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {typeIncidents.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
          Statistiques détaillées
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Temps moyen d'intervention
            </p>
            <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              4.5 minutes
            </p>
          </div>
          <div className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Taux de résolution
            </p>
            <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              95%
            </p>
          </div>
          <div className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Total interventions
            </p>
            <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              1,234
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 