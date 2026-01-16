import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { registerUser } from "../../services/authApi";

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

const passwordRules = [
  {
    key: "length",
    label: "Mínimo de 8 caracteres",
    test: (value) => value.length >= 8,
  },
  {
    key: "uppercase",
    label: "Pelo menos 1 letra maiúscula",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    key: "number",
    label: "Pelo menos 1 número",
    test: (value) => /\d/.test(value),
  },
  {
    key: "special",
    label: "Pelo menos 1 caractere especial",
    test: (value) => /[@$!%*#?&]/.test(value),
  },
];

function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const senhaStatus = useMemo(() => {
    return passwordRules.map((rule) => ({
      ...rule,
      valid: rule.test(senha),
    }));
  }, [senha]);

  const handleValidation = () => {
    const errors = {};

    if (!nome.trim()) {
      errors.nome = "Informe seu nome completo.";
    }

    if (!emailRegex.test(email)) {
      errors.email = "Informe um e-mail institucional válido.";
    }

    if (!senha) {
      errors.senha = "Defina uma senha.";
    } else if (senhaStatus.some((rule) => !rule.valid)) {
      errors.senha = "A senha precisa atender a todos os requisitos.";
    }

    if (senha !== confirmarSenha) {
      errors.confirmarSenha = "A confirmação deve ser igual à senha.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!handleValidation()) return;

    setLoading(true);

    try {
      await registerUser({
        username: nome.trim(),
        email: email.trim(),
        password: senha,
      });

      setSucesso("Usuário cadastrado com sucesso! Redirecionando para login...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErro(error.message ?? "Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper register-page">
      <div className="login-left register-left">
        <div className="login-box register-box">
          <img
            src="/logo/prefcg1.png"
            alt="Prefeitura de Campo Grande"
            className="logo-prefeitura"
          />

          <h1 className="login-title">
            Criar acesso
            <br />
            Dashboard SEMADES
          </h1>

          <p className="login-instructions">
            Cadastre-se com seus dados institucionais para acessar os indicadores.
          </p>

          <form onSubmit={handleSubmit} className="register-form">
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            {fieldErrors.nome && (
              <p className="login-error">{fieldErrors.nome}</p>
            )}

            <input
              type="email"
              placeholder="E-mail institucional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {fieldErrors.email && (
              <p className="login-error">{fieldErrors.email}</p>
            )}

            <input
              type="password"
              placeholder="Senha segura"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            {fieldErrors.senha && (
              <p className="login-error">{fieldErrors.senha}</p>
            )}

            <input
              type="password"
              placeholder="Confirme a senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
            {fieldErrors.confirmarSenha && (
              <p className="login-error">{fieldErrors.confirmarSenha}</p>
            )}

            <div className="password-rules register-password-rules">
              {senhaStatus.map((rule) => (
                <div
                  key={rule.key}
                  className={`rule-item ${rule.valid ? "valid" : ""}`}
                >
                  <span className="rule-indicator">
                    {rule.valid ? "[OK]" : "[  ]"}
                  </span>
                  <span>{rule.label}</span>
                </div>
              ))}
            </div>

            {erro && <p className="login-error">{erro}</p>}
            {sucesso && <p className="login-success">{sucesso}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Cadastrar"}
            </button>
          </form>

          <p className="login-helper">
            Já possui acesso?
            <Link to="/">Ir para login</Link>
          </p>
        </div>
      </div>

      <div className="login-right register-right">
        <div className="carousel-loading">
          Complete os dados para liberar seu acesso.
        </div>
      </div>
    </div>
  );
}

export default Register;
