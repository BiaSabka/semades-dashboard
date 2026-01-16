import React, { useEffect } from "react";

export default function GoogleAuth({ onSuccess, onError }) {
  useEffect(() => {
    // Carrega o script do Google Identity Services
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Substitua pelo seu Client ID do Google
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          {
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            width: 280,
          }
        );
      }
    };

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleCredentialResponse = (response) => {
    try {
      // Decodifica o JWT token do Google
      const credential = response.credential;
      const payload = JSON.parse(atob(credential.split(".")[1]));

      const profile = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };

      onSuccess({ credential, profile });
    } catch (error) {
      console.error("Erro ao processar login Google:", error);
      onError("Erro ao processar autenticação. Tente novamente.");
    }
  };

  return (
    <div className="google-auth-container">
      <div id="google-signin-button"></div>
    </div>
  );
}
