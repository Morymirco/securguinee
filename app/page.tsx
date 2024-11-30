import { ChartBarIcon, PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark">
      <div className="container mx-auto px-4">
        {/* En-tête avec logo */}
        <header className="py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image 
              src="/logoS.png" 
              alt="SecurGuinée" 
              width={40} 
              height={40}
              className="w-auto h-10"
            />
            <h2 className="text-2xl font-bold text-white">SecurGuinée</h2>
          </div>
          <Link 
            href="/login" 
            className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors"
          >
            Accès Services d'Urgence
          </Link>
        </header>

        {/* Section principale */}
        <div className="max-w-4xl mx-auto text-center text-white pt-20 pb-12">
          <h1 className="text-5xl font-bold mb-6">
            Portail des Services d'Urgence
          </h1>
          <p className="text-xl mb-12 text-white/80">
            Plateforme de gestion des alertes et interventions d'urgence en Guinée
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <ShieldCheckIcon className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-3">Gestion des Alertes</h3>
              <p className="text-white/70">
                Réception et traitement des alertes en temps réel
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <PhoneIcon className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-3">Coordination</h3>
              <p className="text-white/70">
                Coordination efficace des équipes d'intervention
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-3">Analyse</h3>
              <p className="text-white/70">
                Suivi et analyse des interventions
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/login" 
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Accéder au tableau de bord
            </Link>
            <Link 
              href="/documentation" 
              className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Documentation
            </Link>
          </div>
        </div>

        {/* Section statistiques */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-white/70">Service Continu</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2"> 5min</div>
            <div className="text-white/70">Temps de Réponse Moyen</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">33</div>
            <div className="text-white/70">Préfectures Couvertes</div>
          </div>
        </div>

        {/* Section Application Mobile */}
        <div className="max-w-4xl mx-auto text-center text-white pb-12">
          <h2 className="text-2xl font-bold mb-4">Application Mobile SecurGuinée</h2>
          <p className="text-lg mb-8">
            Les citoyens peuvent signaler des incidents via notre application mobile disponible sur :
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="#" 
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black/90 transition-colors flex items-center gap-2"
            >
              <img src="/app-store.svg" alt="App Store" className="h-6 w-6" />
              App Store
            </a>
            <a 
              href="/securguinee.apk" 
              download
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black/90 transition-colors flex items-center gap-2"
            >
              <img src="/google.svg" alt="Play Store" className="h-6 w-6" />
              Télécharger l'APK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
