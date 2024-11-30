import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
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
            Connexion SecurGuinée
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            Portail des Services d'Urgence
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-surface dark:text-white"
              placeholder="nom@service.gov.gn"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-surface dark:text-white"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                Se souvenir de moi
              </label>
            </div>
            <Link href="#" className="text-sm text-primary hover:text-primary-dark">
              Mot de passe oublié ?
            </Link>
          </div>

          <Link
            href="/dashboard"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
          >
            Se connecter
          </Link>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Besoin d'aide ? {' '}
          <Link href="/documentation" className="text-primary hover:text-primary-dark">
            Consultez la documentation
          </Link>
        </div>
      </div>
    </div>
  );
} 