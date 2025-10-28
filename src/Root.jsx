import React from "react";
import "./styles/Root.css";
import EnvironmentCards from "./components/EnvironmentCards";
import EconomicSection from "./components/EconomicSection"; // ✅ Mantém só este import

const indicadores = [
  {
    icone: "🏢",
    cor: "economia",
    titulo: "EMPRESAS",
    fonte: "PLANURB, 2025",
    subtitulo: "Crescimento e número de estabelecimentos ativos",
    posicao: "1º",
    link: "https://lookerstudio.google.com/reporting/c2481516-de21-4653-af24-08c88b02cac5",
  },
  {
    icone: "💼",
    cor: "economia",
    titulo: "EMPREGOS",
    fonte: "CAGED, 2025",
    subtitulo: "Geração de empregos formais e informais",
    posicao: "2º",
    link: "https://lookerstudio.google.com/reporting/38fdf9ca-ce21-4bb8-8c32-26a0cf7cbe86",
  },
  {
    icone: "🐄",
    cor: "sustentabilidade",
    titulo: "AGRONEGÓCIO: PECUÁRIA",
    fonte: "IBGE, 2024",
    subtitulo: "Produção e movimentação de rebanhos",
    posicao: "3º",
    link: "https://lookerstudio.google.com/reporting/ddb6fd56-6187-4941-adb5-def4eca70f70",
  },
  {
    icone: "🌾",
    cor: "sustentabilidade",
    titulo: "AGRONEGÓCIO: AGRICULTURA",
    fonte: "IBGE, 2024",
    subtitulo: "Produção e área plantada das principais culturas",
    posicao: "4º",
    link: "https://lookerstudio.google.com/reporting/07f206fd-4594-4ad6-a155-0303421cd099",
  },
  {
    icone: "🚢",
    cor: "inovacao",
    titulo: "Comércio Exterior Exportação",
    fonte: "COMEXTAT, 2025",
    subtitulo: "Principais produtos exportados pelo município",
    posicao: "5º",
    link: "https://lookerstudio.google.com/reporting/b726ca0c-1ace-468a-822f-4e6bca1a56d7",
  },
  {
    icone: "📦",
    cor: "inovacao",
    titulo: "Comércio Exterior Importação",
    fonte: "COMEXTAT, 2025",
    subtitulo: "Principais produtos importados pelo município",
    posicao: "6º",
    link: "https://lookerstudio.google.com/reporting/f63d1dd2-0f38-4580-a7b7-e50e17f4c8d1",
  },
];

export default function Root() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="titulo-degrade">Dashboard de Indicadores</h1>
        <p>
          Desenvolvimento Urbano e Sustentabilidade • Janeiro - Setembro 2025
        </p>
        <div className="legenda">
          <span className="tag economia">Economia</span>
          <span className="tag sustentabilidade">Sustentabilidade</span>
          <span className="tag inovacao">Inovação</span>
        </div>
      </header>

      <div className="dashboard-content">
        <main className="card-grid">
          {indicadores.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div className={`card ${item.cor}`}>
                <div className="icone">{item.icone}</div>
                <div className="posicao">{item.posicao}</div>
                <h2>{item.titulo}</h2>
                <p className="fonte">{item.fonte}</p>
                <p className="subtitulo">{item.subtitulo}</p>
              </div>
            </a>
          ))}
        </main>
      </div>

      <section className="economic-wrapper">
        <EconomicSection />
      </section>

      <aside className="environment-wrapper">
        <EnvironmentCards />
      </aside>
    </div>
  );
}
