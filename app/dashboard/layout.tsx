import Sidebar from '../components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 lg:p-8 bg-light-surface dark:bg-dark-surface w-full">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
} 