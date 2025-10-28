import React from "react";
import "../styles/EconomicCards.css";

const economicIndicators = [
  { icon: "\u{1F3E2}", label: "Empresas Abertas", value: "4.000" },
  { icon: "\u{1F454}", label: "Empregos Formais", value: "7.000" },
];

const sectionTitle = "\u{1F3E6} Desenvolvimento Econ\u00F4mico";
const sectionPeriod = "Janeiro - Setembro 2025";

export default function EconomicCards() {
  return (
    <section className="economic-section">
      <h2 className="title">{sectionTitle}</h2>
      <p className="periodo">{sectionPeriod}</p>

      <div className="economic-cards">
        {economicIndicators.map((indicator) => (
          <div key={indicator.label} className="card-item">
            <span className="icon">{indicator.icon}</span>
            <span className="label">{indicator.label}</span>
            <span className="value">{indicator.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
