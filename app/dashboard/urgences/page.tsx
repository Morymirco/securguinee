'use client';

import { useState } from 'react';
import { Card, Title, Text, Grid, Col, Button, Badge } from '@tremor/react';

interface ServiceUrgence {
  id: string;
  nom: string;
  numero: string;
  type: string;
  status: 'active' | 'inactive';
  localisation: string;
}

export default function UrgencesPage() {
  const [services, setServices] = useState<ServiceUrgence[]>([
    {
      id: '1',
      nom: 'SAMU',
      numero: '15',
      type: 'Médical',
      status: 'active',
      localisation: 'Conakry',
    },
    {
      id: '2',
      nom: 'Police',
      numero: '17',
      type: 'Sécurité',
      status: 'active',
      localisation: 'Conakry',
    },
    // ... autres services
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title>Services d'Urgence</Title>
        <Button color="blue">Ajouter un service</Button>
      </div>

      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        {services.map((service) => (
          <Col key={service.id}>
            <Card>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Text className="text-xl font-bold">{service.nom}</Text>
                  <Text className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    {service.numero}
                  </Text>
                </div>
                <Badge
                  color={service.status === 'active' ? 'green' : 'red'}
                >
                  {service.status === 'active' ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Text className="text-tremor-label">Type:</Text>
                  <Text className="ml-2">{service.type}</Text>
                </div>
                <div className="flex items-center">
                  <Text className="text-tremor-label">Localisation:</Text>
                  <Text className="ml-2">{service.localisation}</Text>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button size="xs" variant="secondary">
                  Modifier
                </Button>
                <Button size="xs" color="red" variant="secondary">
                  Supprimer
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Grid>
    </div>
  );
} 