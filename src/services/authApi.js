const HOSTNAME =
  typeof window !== "undefined" && window.location?.hostname ? window.location.hostname : "";

const defaultApiBase =
  HOSTNAME && HOSTNAME !== "localhost" && HOSTNAME !== "127.0.0.1" && HOSTNAME !== "::1"
    ? "https://semades-auth-api-215168468499.southamerica-east1.run.app/usuarios"
    : "http://localhost:3000/usuarios";

const API_BASE_URL = (import.meta.env.VITE_AUTH_API_URL ?? defaultApiBase).replace(/\/$/, "");

const defaultHeaders = {
  "Content-Type": "application/json",
};

async function request(path, options = {}) {
  const target = `${API_BASE_URL}${path}`;

  try {
    const response = await fetch(target, {
      headers: defaultHeaders,
      ...options,
    });

    const rawBody = await response.text();
    let data = null;
    if (rawBody) {
      try {
        data = JSON.parse(rawBody);
      } catch {
        data = null;
      }
    }

    if (!response.ok) {
      const detail =
        data?.message || response.statusText || rawBody || "Falha ao comunicar com o servidor.";
      throw new Error(`[${response.status}] ${detail}`);
    }

    return (data ?? {}) || {};
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        `Não foi possível conectar ao serviço de autenticação (${error.message}). Verifique se a API está ativa.`
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro inesperado ao chamar a API de autenticação.");
  }
}

export function login(credentials) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function registerUser(payload) {
  return request("/cadastro", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
