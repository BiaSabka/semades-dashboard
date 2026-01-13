import React, { useMemo, useState } from "react";

export default function DadosCentro() {
  const [hoverBairro, setHoverBairro] = useState(null);
  const [hoverProprietario, setHoverProprietario] = useState(null);

  const data = [
    { label: "Afonso Pena", value: 16.3 },
    { label: "Quinze de Novembro", value: 15.6 },
    { label: "Dom Aquino", value: 15.1 },
    { label: "Marechal Rondon", value: 8.8 },
    { label: "José Antônio", value: 8.2 },
    { label: "Eduardo Santos Pereira", value: 8.1 },
    { label: "Barão do Rio Branco", value: 7.7 },
    { label: "Maracajú", value: 7.0 },
    { label: "Mato Grosso", value: 7.0 },
    { label: "Treze de Junho", value: 6.2 },
  ];

  const proprietarios = [
    { label: "Ministério do Exército", value: 22.9 },
    { label: "Vista XV Empreendimentos Imobiliários LTDA", value: 17.8 },
    { label: "Trier Empreendimentos Imobiliários Limitada", value: 15.4 },
    { label: "Espólio de Myrthes Carvalho de Oliveira", value: 9.1 },
    { label: "Olga Maria Lemos Siufi", value: 8.1 },
    { label: "Alvaro Haverroth Hilgert", value: 7.4 },
    { label: "Condomínio Edifício Geneve", value: 6.1 },
    { label: "Ivan Paes Barbosa", value: 4.6 },
    { label: "Marcílio Mendonça", value: 4.4 },
    { label: "Ilson Francisco Venturin Carloto", value: 4.2 },
  ];

  const radius = 140;

  const slicesBairro = useMemo(() => {
    let start = -Math.PI / 2;
    return data.map((d, i) => {
      const angle = (d.value / 100) * Math.PI * 2;
      const end = start + angle;

      const x1 = Math.cos(start) * radius;
      const y1 = Math.sin(start) * radius;
      const x2 = Math.cos(end) * radius;
      const y2 = Math.sin(end) * radius;

      const large = angle > Math.PI ? 1 : 0;
      const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;

      start = end;
      return { path, i };
    });
  }, [data]);

  const slicesProprietario = useMemo(() => {
    let start2 = -Math.PI / 2;
    return proprietarios.map((d, i) => {
      const angle = (d.value / 100) * Math.PI * 2;
      const end = start2 + angle;

      const x1 = Math.cos(start2) * radius;
      const y1 = Math.sin(start2) * radius;
      const x2 = Math.cos(end) * radius;
      const y2 = Math.sin(end) * radius;

      const large = angle > Math.PI ? 1 : 0;
      const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;

      start2 = end;
      return { path, i };
    });
  }, [proprietarios]);

  const isDimmed = (hoverIndex, i) => hoverIndex !== null && hoverIndex !== i;

  return (
    <>
      {/* ===== CARD 1 ===== */}
      <section className="dados-card">
        <div className="chart-header-left">
          Área de Lote por Bairro (Top 10)
          <span className="chart-subtitle"> - Planurb, 2025</span>
        </div>

        <div className="chart-box">
          <svg
            width="340"
            height="340"
            viewBox="0 0 340 340"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Área de Lote (Top 10)"
            onMouseLeave={() => setHoverBairro(null)}
          >
            <g transform="translate(170,170)">
              {slicesBairro.map(({ path, i }) => (
                <path
                  key={i}
                  d={path}
                  fill={`var(--blue-${i + 1})`}
                  stroke="#fff"
                  strokeWidth="2"
                  className={[
                    isDimmed(hoverBairro, i) ? "dimmed" : "",
                    hoverBairro === i ? "hovered-slice" : "",
                  ].join(" ")}
                  onMouseEnter={() => setHoverBairro(i)}
                />
              ))}

              <circle cx="0" cy="0" r="60" fill="#ffffff" />
              <text x="0" y="-6" textAnchor="middle" fontWeight="700" fontSize="16" fill="#1f2933">
                Top 10
              </text>
              <text x="0" y="18" textAnchor="middle" fontSize="12" fill="#666">
                Área de Lote
              </text>
            </g>
          </svg>
        </div>

        <div className="legend-box">
          <div className="legend-list" onMouseLeave={() => setHoverBairro(null)}>
            {data.map((d, i) => (
              <div
                className={[
                  "legend-item",
                  isDimmed(hoverBairro, i) ? "dimmed" : "",
                  hoverBairro === i ? "hovered" : "",
                ].join(" ")}
                key={i}
                onMouseEnter={() => setHoverBairro(i)}
              >
                <div className={`legend-swatch swatch-${i + 1}`}></div>
                <div className="legend-label">{d.label}</div>
                <div className="legend-value">{d.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CARD 2 ===== */}
      <section className="dados-card">
        <div className="chart-header-left">
          Área de Lote por Proprietário (Top 10)
          <span className="chart-subtitle"> - Planurb, 2025</span>
        </div>

        <div className="chart-box">
          <svg
            width="340"
            height="340"
            viewBox="0 0 340 340"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Área de Lote por Proprietário (Top 10)"
            onMouseLeave={() => setHoverProprietario(null)}
          >
            <g transform="translate(170,170)">
              {slicesProprietario.map(({ path, i }) => (
                <path
                  key={`p-${i}`}
                  d={path}
                  fill={`var(--blue-${i + 1})`}
                  stroke="#fff"
                  strokeWidth="2"
                  className={[
                    isDimmed(hoverProprietario, i) ? "dimmed" : "",
                    hoverProprietario === i ? "hovered-slice" : "",
                  ].join(" ")}
                  onMouseEnter={() => setHoverProprietario(i)}
                />
              ))}

              <circle cx="0" cy="0" r="60" fill="#ffffff" />
              <text x="0" y="-6" textAnchor="middle" fontWeight="700" fontSize="16" fill="#1f2933">
                Top 10
              </text>
              <text x="0" y="18" textAnchor="middle" fontSize="12" fill="#666">
                Área de Lote
              </text>
            </g>
          </svg>
        </div>

        <div className="legend-box">
          <div className="legend-list" onMouseLeave={() => setHoverProprietario(null)}>
            {proprietarios.map((d, i) => (
              <div
                className={[
                  "legend-item",
                  isDimmed(hoverProprietario, i) ? "dimmed" : "",
                  hoverProprietario === i ? "hovered" : "",
                ].join(" ")}
                key={`lp-${i}`}
                onMouseEnter={() => setHoverProprietario(i)}
              >
                <div className={`legend-swatch swatch-${i + 1}`}></div>
                <div className="legend-label">{d.label}</div>
                <div className="legend-value">{d.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
