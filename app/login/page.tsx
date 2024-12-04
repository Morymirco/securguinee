'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth, db } from '../firebase/config';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Tentative de connexion avec:', credentials.email);

      // Vérifier d'abord si le service existe
      const servicesRef = collection(db, 'emergency_services');
      const q = query(servicesRef, where('email', '==', credentials.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('Aucun service trouvé avec cet email');
        setError('Email ou mot de passe incorrect');
        setLoading(false);
        return;
      }

      const serviceDoc = querySnapshot.docs[0];
      const serviceData = serviceDoc.data();

      // Vérifier si le service est actif
      if (serviceData.status === 'inactive') {
        console.log('Service inactif');
        setError('Ce compte de service est actuellement inactif');
        setLoading(false);
        return;
      }

      // Tentative de connexion Firebase
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        );
        console.log('Connexion Firebase réussie:', userCredential.user.uid);

        // Stocker les informations du service
        const userData = {
          id: serviceDoc.id,
          email: credentials.email,
          ...serviceData
        };

        console.log('Données du service à stocker:', userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Redirection
        console.log('Redirection vers le tableau de bord');
        router.push('/dashboard');
      } catch (authError: any) {
        console.error('Erreur d\'authentification Firebase:', authError);
        
        // Messages d'erreur spécifiques
        const errorMessages: { [key: string]: string } = {
          'auth/invalid-email': 'Format d\'email invalide',
          'auth/user-disabled': 'Ce compte a été désactivé',
          'auth/user-not-found': 'Email ou mot de passe incorrect',
          'auth/wrong-password': 'Email ou mot de passe incorrect',
          'auth/too-many-requests': 'Trop de tentatives. Veuillez réessayer plus tard'
        };

        setError(errorMessages[authError.code] || 'Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur générale:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-card rounded-2xl p-8 w-full max-w-md shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <Image 
            src="/logoS.png" 
            alt="SecurGuinée" 
            width={64} 
            height={64}
            className="mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Connexion Service d'Urgence
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            Accès réservé aux services d'urgence
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email du service
            </label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-surface dark:text-white"
              placeholder="service@securgn.gov.gn"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-surface dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </span>
            ) : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Problème de connexion ? {' '}
          <Link href="/contact" className="text-primary hover:text-primary-dark">
            Contactez l'administrateur
          </Link>
        </div>
      </div>
    </div>
  );
} 