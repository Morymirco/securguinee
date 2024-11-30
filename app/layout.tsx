import './globals.css';

export const metadata = {
  title: 'SecurGuinée - Portail des Services d\'Urgence',
  description: 'Plateforme de gestion des alertes et interventions d\'urgence en Guinée',
  manifest: '/manifest.json',
  themeColor: '#094FC6',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SecurGuinée',
  },
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#094FC6" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-light-background dark:bg-dark-background min-h-screen">
        {children}
      </body>
    </html>
  );
} 