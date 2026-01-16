import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import GoogleAuth from "./Google_auth";

function Login() {
  const [erro, setErro] = useState("");
  const [slides, setSlides] = useState([]);
  const [slideAtual, setSlideAtual] = useState(0);
  const navigate = useNavigate();

  const handleGoogleLogin = ({ credential, profile }) => {
    if (credential) localStorage.setItem("authToken", credential);
    if (profile) {
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          name: profile.name,
          email: profile.email,
          picture: profile.picture,
          provider: "google",
        })
      );
    }
    navigate("/dashboard");
  };

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    const token = localStorage.getItem("authToken");
    if (user && token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ======= SLIDES LOCAIS (imagens + frases + link) =======
  useEffect(() => {
    const fotos = [
      {
        src: "/imagens-cg/campo5.jpg",
        titulo: "Campo Grande em crescimento",
        descricao:
          "A SEMADES investe em inovação urbana e sustentabilidade para o futuro da capital.",
        link: "https://www.campogrande.ms.gov.br/semades/",
      },
      {
        src: "/imagens-cg/campo2.jpg",
        titulo: "Parques e áreas verdes",
        descricao:
          "Campo Grande é referência em gestão ambiental e expansão de espaços sustentáveis.",
        link: "https://www.campogrande.ms.gov.br/semades/",
      },
      {
        src: "/imagens-cg/campo3.jpg",
        titulo: "Investimentos em energia limpa",
        descricao:
          "A Prefeitura aposta em soluções inteligentes para o desenvolvimento sustentável.",
        link: "https://www.campogrande.ms.gov.br/semades/",
      },
      {
        src: "/imagens-cg/campo1.jpg",
        titulo: "Desenvolvimento urbano integrado",
        descricao:
          "Planejamento estratégico e inovação para melhorar a qualidade de vida dos cidadãos.",
        link: "https://www.campogrande.ms.gov.br/semades/",
      },
      {
        src: "/imagens-cg/campo4.jpg",
        titulo: "Crescimento com responsabilidade",
        descricao:
          "A SEMADES promove políticas sustentáveis para uma cidade mais verde e inclusiva.",
        link: "https://www.campogrande.ms.gov.br/semades/",
      },
    ];

    // embaralha para variar a ordem a cada acesso
    const embaralhar = (array) => array.sort(() => Math.random() - 0.5);
    setSlides(embaralhar(fotos));
  }, []);

  // ======= TROCA AUTOMÁTICA =======
  useEffect(() => {
    if (slides.length === 0) return;
    const intervalo = setInterval(() => {
      setSlideAtual((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, [slides]);

  return (
    <div className="login-wrapper">
      {/* ===== LADO ESQUERDO ===== */}
      <div className="login-left">
        <div className="login-box">
            <img
              src="/logo/prefcg1.png"
              alt="Prefeitura de Campo Grande"
              className="logo-prefeitura"
            />

            <h1 className="login-title">
              Seja bem-vindo ao
              <br />
              Dashboard da SEMADES
            </h1>

            <p className="login-instructions">
              Acesse com sua conta Google institucional para visualizar os indicadores.
            </p>

            {erro && <p className="login-error">{erro}</p>}
            <GoogleAuth onSuccess={handleGoogleLogin} onError={setErro} />
          </div>
        </div>

        {/* ===== LADO DIREITO (CARROSSEL INSTITUCIONAL) ===== */}
        <div className="login-right">
          {slides.length > 0 ? (
            <div className="carousel-container">
              {slides.map((slide, index) => (
                <a
                  key={index}
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`slide ${index === slideAtual ? "ativo" : ""}`}
                >
                  <img src={slide.src} alt={slide.titulo} />
                  <div className="slide-overlay"></div>
                  <div className="slide-texto">
                    <h4>{slide.titulo}</h4>
                    <p className="slide-descricao">{slide.descricao}</p>
                    <span className="slide-link">Visitar site →</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="carousel-loading">Carregando imagens...</div>
          )}
        </div>
      </div>
      );
}

      export default Login;
