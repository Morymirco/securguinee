import {
    BellIcon,
    BookOpenIcon,
    ChartBarIcon,
    MapIcon,
    PhoneIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const documentationSections = [
  {
    title: "Prise en main",
    icon: BookOpenIcon,
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Connexion au portail", href: "#connexion" },
      { title: "Navigation dans l'interface", href: "#navigation" }
    ]
  },
  {
    title: "Gestion des alertes",
    icon: BellIcon,
    items: [
      { title: "Réception des alertes", href: "#reception-alertes" },
      { title: "Traitement des signalements", href: "#traitement" },
      { title: "Priorisation des urgences", href: "#priorisation" }
    ]
  },
  {
    title: "Cartographie",
    icon: MapIcon,
    items: [
      { title: "Visualisation des incidents", href: "#visualisation" },
      { title: "Zones d'intervention", href: "#zones" },
      { title: "Suivi en temps réel", href: "#suivi" }
    ]
  },
  {
    title: "Équipes d'intervention",
    icon: UserGroupIcon,
    items: [
      { title: "Gestion des équipes", href: "#equipes" },
      { title: "Attribution des missions", href: "#missions" },
      { title: "Coordination", href: "#coordination" }
    ]
  },
  {
    title: "Statistiques et rapports",
    icon: ChartBarIcon,
    items: [
      { title: "Tableaux de bord", href: "#tableaux" },
      { title: "Analyses des données", href: "#analyses" },
      { title: "Génération de rapports", href: "#rapports" }
    ]
  },
  {
    title: "Support technique",
    icon: PhoneIcon,
    items: [
      { title: "FAQ", href: "#faq" },
      { title: "Contact support", href: "#support" },
      { title: "Mises à jour", href: "#updates" }
    ]
  }
];

export default function DocumentationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
          Documentation
        </h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Guide complet d'utilisation du portail des services d'urgence SecurGuinée
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentationSections.map((section) => {
          const Icon = section.icon;
          return (
            <div 
              key={section.title}
              className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-light-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Section de recherche */}
      <div className="mt-12 bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-light-text-primary dark:text-dark-text-primary">
          Besoin d'aide ?
        </h2>
        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Rechercher dans la documentation..."
            className="flex-1 px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary"
          />
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
} 