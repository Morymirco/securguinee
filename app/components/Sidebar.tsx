'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  HomeIcon,
  ExclamationTriangleIcon,
  MapIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Accueil', href: '/dashboard/home', icon: HomeIcon },
  { name: 'Alertes en cours', href: '/dashboard/alerts', icon: BellAlertIcon },
  { name: 'Incidents', href: '/dashboard/incidents', icon: ExclamationTriangleIcon },
  { name: 'Carte des signalements', href: '/dashboard/map', icon: MapIcon },
  { name: 'Équipes d\'intervention', href: '/dashboard/teams', icon: UserGroupIcon },
  { name: 'Statistiques', href: '/dashboard/stats', icon: ChartBarIcon },
  { name: 'Configuration', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full bg-dark-surface text-white w-64">
      <div className="p-4 bg-primary">
        <div className="flex items-center gap-2 mb-2">
          <Image 
            src="/logoS.png" 
            alt="SecurGuinée" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold text-white">SecurGuinée</h1>
        </div>
        <p className="text-sm text-white/70">Portail des Services d'Urgence</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-white/10 transition-colors"
                >
                  <Icon className="h-5 w-5 text-white" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
} 