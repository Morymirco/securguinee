'use client';

import {
  Bars3Icon,
  BellAlertIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  MapIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton toggle pour mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Overlay sombre pour mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        flex flex-col h-full bg-dark-surface text-white w-64
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
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
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-white/10 transition-colors"
                    onClick={() => setIsOpen(false)}
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
    </>
  );
} 