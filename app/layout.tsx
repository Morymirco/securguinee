import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-light-background dark:bg-dark-background min-h-screen">
        {children}
      </body>
    </html>
  );
} 