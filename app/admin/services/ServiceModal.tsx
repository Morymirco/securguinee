'use client';

import { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../firebase/config';

interface ServiceModalProps {
  serviceId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

interface ServiceFormData {
  name: string;
  type: 'medical' | 'police' | 'pompiers' | 'assistance_routiere';
  phone: string[];
  address: string;
  available24h: boolean;
  email: string;
  password: string;
  status: 'active' | 'inactive';
}

export default function ServiceModal({ serviceId, isOpen, onClose, onUpdate }: ServiceModalProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    type: 'medical',
    phone: [''],
    address: '',
    available24h: false,
    email: '',
    password: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (serviceId) {
        try {
          const serviceDoc = await getDoc(doc(db, 'emergency_services', serviceId));
          if (serviceDoc.exists()) {
            const data = serviceDoc.data();
            setFormData({
              ...data,
              email: data.email || '',
              password: '',
            } as ServiceFormData);
          }
        } catch (error) {
          console.error('Erreur lors du chargement du service:', error);
          setError('Erreur lors du chargement du service');
        }
      }
    };

    if (isOpen && serviceId) {
      fetchService();
    }
  }, [serviceId, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Créer un compte utilisateur Firebase
      let userCredential;
      try {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      } catch (authError: any) {
        if (authError.code === 'auth/email-already-in-use') {
          setError('Cet email est déjà utilisé. Veuillez en choisir un autre.');
        } else {
          console.error('Erreur lors de la création du compte:', authError);
          setError('Erreur lors de la création du compte utilisateur');
        }
        return;
      }

      const serviceData = {
        name: formData.name,
        type: formData.type,
        phone: formData.phone || [],
        address: formData.address,
        available24h: formData.available24h,
        email: formData.email,
        status: formData.status || 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        serviceId: userCredential.user.uid
      };

      if (serviceId) {
        // Mise à jour d'un service existant
        const serviceRef = doc(db, 'emergency_services', serviceId);
        await updateDoc(serviceRef, {
          ...serviceData,
          updatedAt: new Date()
        });
        setSuccessMessage('Service mis à jour avec succès!');
      } else {
        // Création d'un nouveau service
        const servicesRef = collection(db, 'emergency_services');
        const newServiceRef = await addDoc(servicesRef, serviceData);
        setSuccessMessage(`Service créé avec succès!\nIdentifiants de connexion:\nEmail: ${formData.email}\nMot de passe: ${formData.password}`);
      }

      setTimeout(() => {
        onUpdate();
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de l\'opération');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-light-text-primary dark:text-dark-text-primary">
          {serviceId ? 'Modifier le Service' : 'Ajouter un Service'}
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-error/10 text-error rounded-lg">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-success/10 text-success rounded-lg whitespace-pre-line">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nom du service</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type de service</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as ServiceFormData['type'] })}
              className="w-full px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
            >
              <option value="medical">Médical</option>
              <option value="police">Police</option>
              <option value="pompiers">Sapeurs Pompiers</option>
              <option value="assistance_routiere">Assistance Routière</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email de connexion</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
              required
            />
            <p className="mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Cet email sera utilisé pour la connexion du service
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {serviceId ? 'Nouveau mot de passe de connexion' : 'Mot de passe de connexion'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
              {...(!serviceId && { required: true })}
              minLength={6}
            />
            <p className="mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {serviceId ? 'Laissez vide pour ne pas modifier le mot de passe existant' : 'Minimum 6 caractères'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Adresse</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.available24h}
                onChange={(e) => setFormData({ ...formData, available24h: e.target.checked })}
                className="rounded border-light-divider dark:border-dark-divider"
              />
              <span className="text-sm font-medium">Disponible 24h/24</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Statut</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
              className="w-full px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Téléphone</label>
            <div className="space-y-2">
              {formData.phone.map((phone, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const newPhones = [...formData.phone];
                      newPhones[index] = e.target.value;
                      setFormData({ ...formData, phone: newPhones });
                    }}
                    className="flex-1 px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-surface dark:bg-dark-surface"
                    placeholder="Numéro de téléphone"
                  />
                  {formData.phone.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newPhones = formData.phone.filter((_, i) => i !== index);
                        setFormData({ ...formData, phone: newPhones });
                      }}
                      className="px-3 py-2 bg-error/10 text-error rounded-lg"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, phone: [...formData.phone, ''] })}
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg"
              >
                Ajouter un numéro
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-light-text-primary dark:text-dark-text-primary hover:bg-light-surface dark:hover:bg-dark-surface rounded-lg"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 