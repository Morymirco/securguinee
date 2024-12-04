import Sidebar from '../components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      <Sidebar />
      
      <div className="pl-64">
        <nav className="bg-light-card dark:bg-dark-card shadow-lg mb-8">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="flex justify-end items-center">
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface">
                  🔔
                </button>
                <button className="px-4 py-2 bg-error/10 text-error rounded-lg">
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="px-8 py-8">{children}</main>
      </div>
    </div>
  );
} 