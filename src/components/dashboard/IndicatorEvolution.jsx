import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import "../../styles/IndicatorEvolution.css";

const data = [
  { month: 'Jan', Empresas: 500, Empregos: 700, Mudas: 2700 },
  { month: 'Fev', Empresas: 520, Empregos: 750, Mudas: 2900 },
  { month: 'Mar', Empresas: 540, Empregos: 780, Mudas: 3100 },
  { month: 'Abr', Empresas: 530, Empregos: 760, Mudas: 2800 },
  { month: 'Mai', Empresas: 550, Empregos: 800, Mudas: 2900 },
  { month: 'Jun', Empresas: 580, Empregos: 820, Mudas: 3000 },
  { month: 'Jul', Empresas: 570, Empregos: 810, Mudas: 2800 },
  { month: 'Ago', Empresas: 560, Empregos: 790, Mudas: 2700 },
  { month: 'Set', Empresas: 540, Empregos: 770, Mudas: 2700 }
];

export default function IndicatorEvolution() {
  return (
    <div className="evolution-section">
      <h2 className="title">
        <span className="icon">📈</span> Evolução Mensal dos Indicadores
      </h2>
      <p className="subtitle">Tendências ao longo de 2025</p>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="#e0e0e0" strokeWidth={1.2} />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="Empresas" 
              stroke="#1e88e5" 
              dot={{ r: 6, strokeWidth: 3 }}
              strokeWidth={3}
            />
            <Line 
              type="monotone" 
              dataKey="Empregos" 
              stroke="#64b5f6" 
              dot={{ r: 6, strokeWidth: 3 }}
              strokeWidth={3}
            />
            <Line 
              type="monotone" 
              dataKey="Mudas" 
              stroke="#43a047" 
              dot={{ r: 6, strokeWidth: 3 }}
              strokeWidth={3}
            />
            <Line 
              type="monotone" 
              dataKey="sustentabilidade" 
              stroke="#66bb6a" 
              dot={{ r: 6, strokeWidth: 3 }}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
