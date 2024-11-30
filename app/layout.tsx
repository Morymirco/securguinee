import './globals.css';

export const metadata = {
  title: 'SecurGuinée - Portail des Services d\'Urgence',
  description: 'Plateforme de gestion des alertes et interventions d\'urgence en Guinée',
  icons: {
    icon: [
      {
        url: '/logoS.png',
        href: '/logoS.png',
      }
    ],
    shortcut: '/logoS.png',
    apple: '/logoS.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/logoS.png" />
        <link rel="apple-touch-icon" href="/logoS.png" />
      </head>
      <body className="bg-light-background dark:bg-dark-background min-h-screen">
        {children}
      </body>
    </html>
  );
} 