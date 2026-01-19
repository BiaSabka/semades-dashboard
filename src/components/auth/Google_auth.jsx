import React, { useEffect, useRef, useState } from "react";

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

const loadGoogleScript = () =>
  new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google);
      return;
    }

    const existing = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", () =>
        reject(new Error("Falha ao carregar o script do Google."))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve(window.google));
    script.addEventListener("error", () =>
      reject(new Error("Falha ao carregar o script do Google."))
    );
    document.head.appendChild(script);
  });

const decodeJwt = (token) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

export default function GoogleAuth({ onSuccess, onError }) {
  const buttonRef = useRef(null);
  const [error, setError] = useState("");
  // necessita ler a variavel de ambiente a partir do runtime
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    let active = true;

    if (!clientId) {
      setError("Google Client ID nao configurado.");
      return () => {
        active = false;
      };
    }

    loadGoogleScript()
      .then((google) => {
        if (!active || !google?.accounts?.id || !buttonRef.current) return;

        google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (!response?.credential) {
              const err = new Error("Token do Google nao recebido.");
              setError(err.message);
              onError?.(err);
              return;
            }
            const profile = decodeJwt(response.credential);
            onSuccess?.({
              credential: response.credential,
              profile,
            });
          },
        });

        google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "pill",
          width: 280,
        });
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        onError?.(err);
      });

    return () => {
      active = false;
    };
  }, [clientId, onError, onSuccess]);

  return (
    <div>
      <div ref={buttonRef} />
      {error ? <p className="login-error">{error}</p> : null}
    </div>
  );
}
