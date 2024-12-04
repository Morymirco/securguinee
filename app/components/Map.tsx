'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correction des icônes Leaflet
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  serviceData: any;
  chatMessages: any[];
  defaultPosition: [number, number];
}

const Map = ({ serviceData, chatMessages, defaultPosition }: MapProps) => {
  const [key, setKey] = useState(Date.now()); // Clé unique pour forcer le rendu

  useEffect(() => {
    // Mettre à jour la clé quand les props changent
    setKey(Date.now());
  }, [serviceData, chatMessages, defaultPosition]);

  return (
    <MapContainer
      key={key}
      center={defaultPosition}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      whenCreated={(map) => {
        // Optionnel: actions à effectuer lors de la création de la carte
        map.invalidateSize();
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      
      {/* Marqueur pour le service */}
      {serviceData?.location?.latitude && serviceData?.location?.longitude && (
        <Marker 
          position={[serviceData.location.latitude, serviceData.location.longitude]} 
          icon={icon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{serviceData.name}</h3>
              <p className="text-sm">{serviceData.address}</p>
            </div>
          </Popup>
        </Marker>
      )}

      {/* Marqueurs pour les messages avec localisation */}
      {chatMessages.map((message) => (
        message.location && message.location.latitude && message.location.longitude && (
          <Marker
            key={message.id}
            position={[message.location.latitude, message.location.longitude]}
            icon={icon}
          >
            <Popup>
              <div className="p-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  message.priority === 'urgent' ? 'bg-error/10 text-error' :
                  message.priority === 'high' ? 'bg-warning/10 text-warning' :
                  message.priority === 'medium' ? 'bg-info/10 text-info' :
                  'bg-success/10 text-success'
                }`}>
                  {message.priority}
                </span>
                <p className="mt-1">{message.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(message.createdAt.seconds * 1000).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default Map; 