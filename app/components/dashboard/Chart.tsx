'use client';

import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Lun', accidents: 40, incendies: 24, urgences: 28 },
  { name: 'Mar', accidents: 30, incendies: 13, urgences: 22 },
  { name: 'Mer', accidents: 20, incendies: 38, urgences: 35 },
  { name: 'Jeu', accidents: 27, incendies: 39, urgences: 20 },
  { name: 'Ven', accidents: 18, incendies: 48, urgences: 28 },
  { name: 'Sam', accidents: 23, incendies: 38, urgences: 42 },
  { name: 'Dim', accidents: 34, incendies: 43, urgences: 31 },
];

interface ChartProps {
  type: 'bar' | 'line';
}

export default function Chart({ type }: ChartProps) {
  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="accidents" fill="#094FC6" name="Accidents" />
          <Bar dataKey="incendies" fill="#EF4444" name="Incendies" />
          <Bar dataKey="urgences" fill="#F59E0B" name="Urgences" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="accidents" 
          stroke="#094FC6" 
          name="Accidents"
          strokeWidth={2} 
        />
        <Line 
          type="monotone" 
          dataKey="incendies" 
          stroke="#EF4444" 
          name="Incendies"
          strokeWidth={2} 
        />
        <Line 
          type="monotone" 
          dataKey="urgences" 
          stroke="#F59E0B" 
          name="Urgences"
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
} 