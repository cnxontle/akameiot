import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import "./LoginPage.css";
import logo from "../../assets/akame_logo_text_Text.svg";

export default function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn({ username: email, password });
      onLogin();
    } catch (err) {
      setError(getErrorMessage(err.name));
    } finally {
      setLoading(false);
    }
  }

  function getErrorMessage(code) {
    switch (code) {
      case "NotAuthorizedException":
        return "Correo o contraseña incorrectos.";
      case "UserNotFoundException":
        return "No existe una cuenta con ese correo.";
      case "UserNotConfirmedException":
        return "Tu cuenta no ha sido verificada.";
      default:
        return "Ocurrió un error. Intenta de nuevo.";
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <button className="login-back" onClick={onBack}>← Volver</button>
        <img src={logo} alt="Akame IoT" className="login-logo" />
        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-sub">Accede a tus redes y suscripciones</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-group">
            <label className="login-label">Correo electrónico</label>
            <input
              className="login-input"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="login-group">
            <label className="login-label">Contraseña</label>
            <input
              className="login-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}