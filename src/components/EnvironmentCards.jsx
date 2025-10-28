import React from "react";
// ...existing code...
import "../styles/EnvironmentCards.css";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const forestData = [
  { icon: "\u{1F331}", label: "Mudas Doadas", value: 25261 },
  { icon: "\u{1F33F}", label: "Mudas Plantadas", value: 5577 },
];

const plantingRate = 22.1;
const sectionTitle = "\u{1F333} Sustentabilidade e Meio Ambiente";
const sectionPeriod = "Janeiro - Setembro 2025";

export default function EnvironmentCards() {
  const pieData = {
    labels: forestData.map((d) => d.label),
    datasets: [
      {
        data: forestData.map((d) => d.value),
        backgroundColor: ["#66bb6a", "#a5d6a7"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((s, v) => s + v, 0);
            const pct = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value.toLocaleString("pt-BR")} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <section className="env-container">
      <div className="env-header">
        <h2 className="env-title">{sectionTitle}</h2>
        <p>{sectionPeriod}</p>
      </div>

      <div className="env-card">
        <div className="card-list">
          {forestData.map((item) => (
            <div key={item.label} className="card-row">
              <div className="left">
                <span className="item-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              <span className="value">{item.value.toLocaleString("pt-BR")}</span>
            </div>
          ))}

          <div className="card-footer">
            <span className="taxa-titulo">Taxa de plantio:</span>{" "}
            <span className="taxa-texto">
              {plantingRate}% das mudas doadas foram plantadas
            </span>
          </div>
        </div>

        <div className="chart-container" aria-hidden="true">
          <Pie data={pieData} options={options} />
        </div>
      </div>
    </section>
  );
}