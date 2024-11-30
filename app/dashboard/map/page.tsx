// 'use client';

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Icon } from 'leaflet';

// // Données simulées des signalements
// const signalements = [
//   {
//     id: 1,
//     type: "Accident",
//     latitude: 9.5092,
//     longitude: -13.7122,
//     lieu: "Kaloum, Conakry",
//     status: "En cours",
//     description: "Accident de la circulation"
//   },
//   // Ajoutez d'autres signalements ici
// ];

// export default function MapPage() {
//   return (
//     <div className="max-w-7xl mx-auto space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
//           Carte des Signalements
//         </h1>
//         <div className="flex gap-4">
//           <select className="px-4 py-2 rounded-lg border border-light-divider dark:border-dark-divider bg-light-card dark:bg-dark-card">
//             <option>Tous les types</option>
//             <option>Accidents</option>
//             <option>Incendies</option>
//             <option>Urgences médicales</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg">
//         <div className="h-[600px] rounded-lg overflow-hidden">
//           <MapContainer
//             center={[9.5092, -13.7122]}
//             zoom={13}
//             style={{ height: '100%', width: '100%' }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             />
//             {signalements.map((signal) => (
//               <Marker
//                 key={signal.id}
//                 position={[signal.latitude, signal.longitude]}
//               >
//                 <Popup>
//                   <div className="p-2">
//                     <h3 className="font-semibold">{signal.type}</h3>
//                     <p className="text-sm">{signal.lieu}</p>
//                     <p className="text-sm mt-1">{signal.description}</p>
//                   </div>
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// } ]

export default function MapPage() {
return (
    <div className="max-w-7xl mx-auto space-y-6"></div>
); }