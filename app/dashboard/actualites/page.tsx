'use client';

import { useState } from 'react';
import { Card, Title, Text, Grid, Col, Button, Badge } from '@tremor/react';

interface Actualite {
  id: string;
  titre: string;
  description: string;
  date: string;
  categorie: string;
  status: 'publie' | 'brouillon';
}

export default function ActualitesPage() {
  const [actualites, setActualites] = useState<Actualite[]>([
    {
      id: '1',
      titre: 'Alerte Météo',
      description: 'Fortes pluies attendues dans la région de Conakry...',
      date: '2024-03-20',
      categorie: 'Alerte',
      status: 'publie',
    },
    // ... autres actualités
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title>Actualités</Title>
        <Button color="blue">Nouvelle actualité</Button>
      </div>

      <Grid numItems={1} numItemsSm={2} className="gap-6">
        {actualites.map((actualite) => (
          <Col key={actualite.id}>
            <Card>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Text className="text-xl font-bold">{actualite.titre}</Text>
                  <Text className="text-sm text-gray-500">
                    {actualite.date}
                  </Text>
                </div>
                <Badge
                  color={actualite.status === 'publie' ? 'green' : 'yellow'}
                >
                  {actualite.status === 'publie' ? 'Publié' : 'Brouillon'}
                </Badge>
              </div>
              <Text className="mb-4">{actualite.description}</Text>
              <div className="flex justify-between items-center">
                <Badge color="blue">{actualite.categorie}</Badge>
                <div className="space-x-2">
                  <Button size="xs" variant="secondary">
                    Modifier
                  </Button>
                  <Button size="xs" color="red" variant="secondary">
                    Supprimer
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Grid>
    </div>
  );
} 