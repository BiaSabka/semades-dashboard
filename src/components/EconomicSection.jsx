import React from "react";
import "../styles/EconomicSection.css";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { month: "Ago/24", empresas: 4000, empregos: 13500 },
  { month: "Set/24", empresas: 4100, empregos: 13600 },
  { month: "Out/24", empresas: 4150, empregos: 13700 },
  { month: "Nov/24", empresas: 4200, empregos: 13800 },
  { month: "Dez/24", empresas: 4300, empregos: 13900 },
  { month: "Jan/25", empresas: 4400, empregos: 14000 },
  { month: "Fev/25", empresas: 4450, empregos: 14100 },
  { month: "Mar/25", empresas: 4500, empregos: 14200 },
  { month: "Abr/25", empresas: 4550, empregos: 14300 },
  { month: "Mai/25", empresas: 4600, empregos: 14400 },
  { month: "Jun/25", empresas: 4650, empregos: 14500 },
  { month: "Jul/25", empresas: 4700, empregos: 14689 },
];

export default function EconomicSection() {
  return (
    <section className="economic-section">
      <div className="economic-grid">
        {/* === CARD DE DADOS === */}
        <div className="economic-card info-card">
          <h3 className="economic-title">Desenvolvimento Econômico</h3>
          <p className="economic-period">Acumulado: Ago/2024 - Jul/2025</p>

          <div className="economic-item">
            <div className="economic-info">
              <span className="economic-icon">🏢</span>
              <span className="economic-label">Empresas Abertas</span>
            </div>
            <span className="economic-value">4.000</span>
          </div>

          <div className="economic-item">
            <div className="economic-info">
              <span className="economic-icon">👥</span>
              <span className="economic-label">Empregos Formais (Saldo)</span>
            </div>
            <span className="economic-value">16.689</span>
          </div>

          <div className="economic-item">
            <div className="economic-info">
              <span className="economic-icon">📈</span>
              <span className="economic-label">Crescimento Percentual</span>
            </div>
            <span className="economic-value">+2,45%</span>
          </div>

          <div className="economic-item">
            <div className="economic-info">
              <span className="economic-icon">🏆</span>
              <span className="economic-label">Posição Nacional</span>
            </div>
            <span className="economic-value">20º (Saldo) | 26º (Crescimento)</span>
          </div>
        </div>

        {/* === CARD DO GRÁFICO === */}
        <div className="economic-card chart-card">
          <div className="chart-header">
            <h3 className="economic-title">Visualização Econômica</h3>
            <p className="economic-subtitle">Comparativo de Indicadores — MS</p>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fill: "#374151", fontSize: 11 }} />
                <YAxis tick={{ fill: "#374151", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: 8 }} />
                <Bar dataKey="empresas" name="Empresas" barSize={20} fill="#2563eb" />
                <Line
                  dataKey="empregos"
                  name="Empregos Formais"
                  type="monotone"
                  stroke="#1d4ed8"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-footer">
            <p className="economic-source">
              Fonte:{" "}
              <a
                href="https://www.funtrab.ms.gov.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                FUNTRAB / CAGED
              </a>{" "}
              — Jul/2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
