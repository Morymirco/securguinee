'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  {
    label: 'Tableau de bord',
    path: '/admin',
    icon: '📊'
  },
  {
    label: 'Services',
    path: '/admin/services',
    icon: '🚑'
  },
  {
    label: 'Utilisateurs',
    path: '/admin/users',
    icon: '👥'
  },
  {
    label: 'Messages',
    path: '/admin/chat',
    icon: '💬'
  },
  {
    label: 'Incidents',
    path: '/admin/incidents',
    icon: '🚨'
  },
  {
    label: 'Rapports',
    path: '/admin/reports',
    icon: '📈'
  },
  {
    label: 'Paramètres',
    path: '/admin/settings',
    icon: '⚙️'
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-light-card dark:bg-dark-card border-r border-light-divider dark:border-dark-divider fixed left-0 top-0">
      <div className="p-6">
        <div className="text-xl font-bold text-primary mb-8">SecurGN Admin</div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.label === 'Messages' && (
                  <span className="ml-auto bg-error text-white text-xs px-2 py-1 rounded-full">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-light-divider dark:border-dark-divider">
        <div className="flex items-center gap-4 text-light-text-primary dark:text-dark-text-primary">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            👤
          </div>
          <div>
            <div className="font-semibold">Admin</div>
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Super Admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 