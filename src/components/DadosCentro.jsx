import React, { useMemo, useRef, useState } from "react";

export default function DadosCentro() {
  const [hoverBairro, setHoverBairro] = useState(null);
  const [hoverProprietario, setHoverProprietario] = useState(null);

  // Tooltips dos gráficos de barras (1 e 2)
  const [barTip1, setBarTip1] = useState(null);
  const [barTip2, setBarTip2] = useState(null);
  const barAreaRef1 = useRef(null);
  const barAreaRef2 = useRef(null);

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

  // ====== NOVO GRÁFICO 1 (0 a 80) ======
  const proprietariosImoveisQtd = [
    { label: "Ministério do Exército", value: 76 },
    { label: "Vista XV Empreendimentos Imobiliários LTDA", value: 70 },
    { label: "Trier Empreendimentos Imobiliários Limitada", value: 29 },
    { label: "Morais dos Santos Empreendimentos e Administração de Imóveis Próprios LTDA", value: 19 },
    { label: "Jorge João Rezek", value: 19 },
    { label: "Olga Maria Lemos Siufi", value: 19 },
    { label: "Ivan Paes Barbosa", value: 17 },
    { label: "Vicosa Administradora de Imóveis LTDA EPP", value: 16 },
    { label: "Janio Cardoso Goncalves", value: 15 },
    { label: "6F Participações e Empreendimentos LTDA", value: 15 },
  ];

  // ====== NOVO GRÁFICO 2 (0 a 1,5 bi) ======
  const proprietariosValorAcumulado = [
    { label: "Vista XV Empreendimentos Imobiliários LTDA", value: 1340667021.4 },
    { label: "Ministério do Exército", value: 1082413341.56 },
    { label: "Trier Empreendimentos Imobiliários Limitada", value: 868224650.52 },
    { label: "Ilson Francisco Venturin Carloto", value: 361292566.45 },
    { label: "Paula Micheli Fancelli", value: 281296195.37 },
    { label: "Condomínio Edifício Geneve", value: 254680867.43 },
    { label: "Neire Alves de Lima", value: 218213578.35 },
    { label: "Jaime Khalil Jacob", value: 215669497.41 },
    { label: "Patrice Koester dos Santos Pereira", value: 215669497.41 },
    { label: "Aliomar Coelho Pereira", value: 196880093.88 },
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

  // Formatadores
  const moneyBRL = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 2,
      }),
    []
  );

  // Tooltip helper
  const handleTip = (e, item, setTip, ref, valueText) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTip({
      x,
      y,
      label: item.label,
      valueText,
    });
  };

  return (
    <>
      {/* ===== CARDS RESUMO + CARD LOOKER (ANTES DE TODOS OS GRÁFICOS) ===== */}
      <div className="resumo-row">
        <div className="resumo-cards">
          <div className="resumo-card">
            <img
              className="resumo-icon-img"
              src="/imagens-cg/IconImoveis.jpg"
              alt="Ícone Quantidade de Imóveis"
            />

            <div className="resumo-text">
              <div className="resumo-title">Quantidade de Imóveis</div>
              <div className="resumo-value">6.178</div>
            </div>
          </div>

          <div className="resumo-card">
            <img
              className="resumo-icon-img"
              src="/imagens-cg/IconValorVenal.jpg"
              alt="Ícone Valor Venal"
            />

            <div className="resumo-text">
              <div className="resumo-title">Valor Venal</div>
              <div className="resumo-value">R$ 2.524.530.392,64</div>
            </div>
          </div>

          <div className="resumo-card">
            <img
              className="resumo-icon-img"
              src="/imagens-cg/IconValorTotal.jpg"
              alt="Ícone Valor Total"
            />

            <div className="resumo-text">
              <div className="resumo-title">Valor Total</div>
              <div className="resumo-value">R$ 97.944.779.641,77</div>
            </div>
          </div>

          <div className="resumo-card">
            <img
              className="resumo-icon-img"
              src="/imagens-cg/IconAreaTerreno.jpg"
              alt="Ícone Área do Terreno"
            />

            <div className="resumo-text">
              <div className="resumo-title">Área do Terreno</div>
              <div className="resumo-value">7.617.790,94</div>
            </div>
          </div>
        </div>

        <a
          className="looker-linkcard"
          href="https://lookerstudio.google.com/u/0/reporting/e7c4b698-6d0f-41c3-92cc-5e882c02d6d1/page/1U2bF"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir Looker do Centro de Campo Grande - MS"
        >
          <div className="looker-card">
            <img
              className="looker-flag"
              src="/imagens-cg/BandeiraCampoGrandeMS.png"
              alt="Bandeira de Campo Grande - MS"
            />
            <div className="looker-text">
              <div className="looker-title">Dashboard dos Indicadores do Centro de campo Grande - MS</div>
              <div className="looker-meta">PLANURB, 2025</div>
              <div className="looker-desc">Para uma observação mais detalhada</div>
            </div>
          </div>
        </a>
      </div>

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

      {/* ===== 2 CARDS DE BARRAS LADO A LADO ===== */}
      <div className="bar-cards-row">
        {/* ===== GRÁFICO 1 ===== */}
        <section className="dados-card bar-card">
          <div className="chart-header-left">Proprietários por Quantidade de Imóveis</div>

          <div className="bar-chart-wrap">
            {/* PLOT */}
            <div
              className="bar-plot"
              ref={barAreaRef1}
              onMouseLeave={() => setBarTip1(null)}
            >
              <div className="bar-ylabels" aria-hidden="true">
                <div>80</div>
                <div>60</div>
                <div>40</div>
                <div>20</div>
                <div>0</div>
              </div>

              <div className="bar-grid" aria-hidden="true">
                <div className="bar-grid-line" style={{ top: "0%" }} />
                <div className="bar-grid-line" style={{ top: "25%" }} />
                <div className="bar-grid-line" style={{ top: "50%" }} />
                <div className="bar-grid-line" style={{ top: "75%" }} />
                <div className="bar-grid-line" style={{ top: "100%" }} />

                {Array.from({ length: 11 }).map((_, idx) => (
                  <div
                    key={`v1-${idx}`}
                    className="bar-grid-vline"
                    style={{ left: `${(idx / 10) * 100}%` }}
                  />
                ))}
              </div>

              {barTip1 && (
                <div className="bar-tooltip" style={{ left: barTip1.x, top: barTip1.y }}>
                  <div className="bar-tooltip-title">{barTip1.label}</div>
                  <div className="bar-tooltip-value">{barTip1.valueText}</div>
                </div>
              )}

              <div className="bars-row">
                {proprietariosImoveisQtd.map((item, i) => {
                  const maxY = 80;
                  const pct = Math.max(0, Math.min(100, (item.value / maxY) * 100));
                  const valueText = `${item.value} Imóveis`;

                  return (
                    <div className="bar-col" key={`qtd-${i}`}>
                      <div
                        className="bar-rect"
                        style={{ height: `${pct}%` }}
                        onMouseEnter={(e) => handleTip(e, item, setBarTip1, barAreaRef1, valueText)}
                        onMouseMove={(e) => handleTip(e, item, setBarTip1, barAreaRef1, valueText)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* labels fora do plot */}
            <div className="bar-xlabels">
              {proprietariosImoveisQtd.map((item, i) => {
                const valueText = `${item.value} imóveis`;
                return (
                  <div
                    key={`xl1-${i}`}
                    className="bar-xlabel"
                    title={item.label}
                    onMouseEnter={(e) => handleTip(e, item, setBarTip1, barAreaRef1, valueText)}
                    onMouseMove={(e) => handleTip(e, item, setBarTip1, barAreaRef1, valueText)}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>

            <div className="bar-source">
              Fonte: <b>Planurb</b> - 2025
            </div>
          </div>
        </section>

        {/* ===== GRÁFICO 2 ===== */}
        <section className="dados-card bar-card">
          <div className="chart-header-left">Proprietários por Valor Acumulado em Imóveis</div>

          <div className="bar-chart-wrap">
            {/* PLOT */}
            <div
              className="bar-plot"
              ref={barAreaRef2}
              onMouseLeave={() => setBarTip2(null)}
            >
              <div className="bar-ylabels" aria-hidden="true">
                <div>1,5 bi</div>
                <div>1,0 bi</div>
                <div>0,5 bi</div>
                <div>0</div>
              </div>

              <div className="bar-grid" aria-hidden="true">
                <div className="bar-grid-line" style={{ top: "0%" }} />
                <div className="bar-grid-line" style={{ top: "33.333%" }} />
                <div className="bar-grid-line" style={{ top: "66.666%" }} />
                <div className="bar-grid-line" style={{ top: "100%" }} />

                {Array.from({ length: 11 }).map((_, idx) => (
                  <div
                    key={`v2-${idx}`}
                    className="bar-grid-vline"
                    style={{ left: `${(idx / 10) * 100}%` }}
                  />
                ))}
              </div>

              {barTip2 && (
                <div className="bar-tooltip" style={{ left: barTip2.x, top: barTip2.y }}>
                  <div className="bar-tooltip-title">{barTip2.label}</div>
                  <div className="bar-tooltip-value">{barTip2.valueText}</div>
                </div>
              )}

              <div className="bars-row">
                {proprietariosValorAcumulado.map((item, i) => {
                  const maxY = 1500000000;
                  const pct = Math.max(0, Math.min(100, (item.value / maxY) * 100));
                  const valueText = moneyBRL.format(item.value);

                  return (
                    <div className="bar-col" key={`val-${i}`}>
                      <div
                        className="bar-rect"
                        style={{ height: `${pct}%` }}
                        onMouseEnter={(e) => handleTip(e, item, setBarTip2, barAreaRef2, valueText)}
                        onMouseMove={(e) => handleTip(e, item, setBarTip2, barAreaRef2, valueText)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* labels fora do plot */}
            <div className="bar-xlabels">
              {proprietariosValorAcumulado.map((item, i) => {
                const valueText = moneyBRL.format(item.value);
                return (
                  <div
                    key={`xl2-${i}`}
                    className="bar-xlabel"
                    title={item.label}
                    onMouseEnter={(e) => handleTip(e, item, setBarTip2, barAreaRef2, valueText)}
                    onMouseMove={(e) => handleTip(e, item, setBarTip2, barAreaRef2, valueText)}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>

            <div className="bar-source">
              Fonte: <b>Planurb</b> - 2025
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
