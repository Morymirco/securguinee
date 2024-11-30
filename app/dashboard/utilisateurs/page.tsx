'use client';

import { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Button,
} from '@tremor/react';

interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  role: 'admin' | 'user';
  status: 'actif' | 'inactif';
  dateInscription: string;
}

export default function UtilisateursPage() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([
    {
      id: '1',
      nom: 'John Doe',
      email: 'john@example.com',
      telephone: '+224 123456789',
      role: 'admin',
      status: 'actif',
      dateInscription: '2024-03-20',
    },
    // ... autres utilisateurs
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title>Utilisateurs</Title>
        <Button color="blue">Ajouter un utilisateur</Button>
      </div>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nom</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Téléphone</TableHeaderCell>
              <TableHeaderCell>Rôle</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Date d'inscription</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {utilisateurs.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nom}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telephone}</TableCell>
                <TableCell>
                  <Badge color={user.role === 'admin' ? 'blue' : 'gray'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge color={user.status === 'actif' ? 'green' : 'red'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.dateInscription}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="xs" variant="secondary">
                      Modifier
                    </Button>
                    <Button size="xs" color="red" variant="secondary">
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 