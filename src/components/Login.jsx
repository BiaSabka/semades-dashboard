import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Parser from "rss-parser";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [noticias, setNoticias] = useState([]);
  const [slideAtual, setSlideAtual] = useState(0);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@teste.com" && senha === "123456") {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      alert("E-mail ou senha incorretos!");
    }
  };

  // ======= BUSCAR NOTÍCIAS DO BACKEND LOCAL/PROD =======
  useEffect(() => {
    async function carregarNoticias() {
      try {
        const API_URL =
          window.location.hostname === "localhost"
            ? "http://localhost:4000/api/noticias"
            : "https://semades-dashboard-z4ig.onrender.com/api/noticias";

        const resposta = await fetch(API_URL);
        const data = await resposta.json();

        const arr = Array.isArray(data)
          ? data
          : data.noticias || data.items || [];
        setNoticias(
          arr.map((n) => ({
            titulo: n.titulo || n.title,
            link: n.link || n.url,
            imagem:
              n.imagem ||
              n.image ||
              n.thumbnail ||
              "https://picsum.photos/800/600?blur=2",
          }))
        );
      } catch (erro) {
        console.error("Erro ao carregar notícias:", erro);
        setNoticias([
          {
            titulo: "SEMADES promove ações sustentáveis em Campo Grande",
            link: "https://www.campogrande.ms.gov.br/semades/",
            imagem: "https://picsum.photos/800/600?random=1",
          },
          {
            titulo: "Prefeitura investe em energia limpa e inovação",
            link: "https://www.campogrande.ms.gov.br/semades/",
            imagem: "https://picsum.photos/800/600?random=2",
          },
          {
            titulo: "Desenvolvimento Urbano e Sustentabilidade",
            link: "https://www.campogrande.ms.gov.br/semades/",
            imagem: "https://picsum.photos/800/600?random=3",
          },
        ]);
      }
    }

    carregarNoticias();
  }, []);

  // Carrossel automático
  useEffect(() => {
    if (noticias.length === 0) return;
    const intervalo = setInterval(() => {
      setSlideAtual((prev) => (prev + 1) % noticias.length);
    }, 7000); // <- aqui: troca a cada 7s em vez de 5s
    return () => clearInterval(intervalo);
  }, [noticias]);

  return (
    <div className="login-wrapper">
      {/* ===== LADO ESQUERDO ===== */}
      <div className="login-left">
        <div className="login-box">
          <div className="login-title-highlight">
            <h1 className="login-title">
              Seja bem-vindo ao
              <br />
              Dashboard da SEMADES
            </h1>
          </div>

          <p className="login-instructions">
            Acesse com seu e-mail institucional para visualizar os indicadores.
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>

      {/* ===== LADO DIREITO (CARROSSEL) ===== */}
      <div className="login-right">
        {noticias.length > 0 ? (
          <div className="carousel-container">
            {noticias.map((noticia, index) => (
              <div
                key={index}
                className={`slide ${index === slideAtual ? "ativo" : ""}`}
              >
                <img src={noticia.imagem} alt={noticia.titulo} />
                <div className="slide-overlay"></div>
                <div className="slide-texto">
                  <h4>{noticia.titulo}</h4>
                  <a
                    href={noticia.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ler mais →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="carousel-loading">Carregando notícias...</div>
        )}
      </div>
    </div>
  );
}

export default Login;
