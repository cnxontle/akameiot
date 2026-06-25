import { useEffect, useState } from "react";
import { signOut } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import "./Dashboard.css";
import logo from "../../assets/akame_logo_text_Text.svg";

const API_URL = "https://9asnsxxi5l.execute-api.us-east-2.amazonaws.com/meshes";
const CHECKOUT_URL = "https://ajmbuteci6.execute-api.us-east-2.amazonaws.com/create-checkout-session";

function statusInfo(lifecycleStatus) {
  if (!lifecycleStatus) return { label: "Desconocido", cls: "unknown" };
  if (lifecycleStatus.startsWith("ACTIVE")) return { label: "Activa", cls: "active" };
  if (lifecycleStatus.startsWith("EXPIRED")) return { label: "Vencida", cls: "expired" };
  return { label: lifecycleStatus, cls: "unknown" };
}

function formatDate(ts) {
  if (!ts) return "—";
  return new Date(Number(ts) * 1000).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Dashboard({ onLogout }) {
  const [meshes, setMeshes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMeshes();
  }, []);

  async function loadMeshes() {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();

      const resp = await fetch(API_URL, {
        headers: { Authorization: token },
      });

      if (!resp.ok) throw new Error(`Error ${resp.status}`);

      const data = await resp.json();
      setMeshes(data.meshes || []);
    } catch (err) {
      setError("No se pudieron cargar las redes. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout(meshId, planId) {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens.idToken.toString();

      const resp = await fetch(CHECKOUT_URL, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meshId, planId }),
      });

      const data = await resp.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Error al iniciar el pago. Intenta de nuevo.");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor de pagos.");
    }
  }

  async function handleLogout() {
    await signOut();
    onLogout();
  }

  return (
    <div className="dash">
      <header className="dash-nav">
        <img src={logo} alt="Akame IoT" className="dash-logo" />
        <button onClick={handleLogout} className="dash-logout">
          Cerrar sesión
        </button>
      </header>

      <main className="dash-body">
        {loading && (
          <div className="dash-state">
            <div className="dash-spinner" />
            <p>Cargando redes...</p>
          </div>
        )}

        {!loading && error && (
          <div className="dash-state">
            <div className="dash-state-icon">⚠</div>
            <p className="dash-state-msg">{error}</p>
            <button className="dash-retry" onClick={loadMeshes}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && meshes.length === 0 && (
          <div className="dash-state">
            <div className="dash-state-icon">◈</div>
            <p className="dash-state-msg">No tienes redes activas todavía.</p>
          </div>
        )}

        {!loading && !error && meshes.length > 0 && (
          <div className="dash-content">
            <div className="dash-header">
              <h1 className="dash-title">Mis redes</h1>
              <span className="dash-count">{meshes.length} {meshes.length === 1 ? "red" : "redes"}</span>
            </div>
            <div className="dash-grid">
              {meshes.map((mesh) => {
                const status = statusInfo(mesh.lifecycleStatus);
                return (
                  <div key={mesh.meshId} className={`dash-card dash-card--${status.cls}`}>
                    <div className="dash-card-head">
                      <span className="dash-card-name">{mesh.displayName}</span>
                      <span className={`dash-card-badge dash-card-badge--${status.cls}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="dash-card-meta">
                      <div className="dash-card-row">
                        <span className="dash-card-label">Vence</span>
                        <span className="dash-card-val">{formatDate(mesh.expiresAt)}</span>
                      </div>
                      <div className="dash-card-row">
                        <span className="dash-card-label">Última renovación</span>
                        <span className="dash-card-val">{formatDate(mesh.lastRenewalDate)}</span>
                      </div>
                      <div className="dash-card-row">
                        <span className="dash-card-label">ID</span>
                        <span className="dash-card-val dash-card-id">···{mesh.meshId.slice(-4)}</span>
                      </div>
                    </div>
                   <div className="dash-card-actions">
                    <button
                      className="dash-card-btn dash-card-btn--primary"
                      onClick={() => handleCheckout(mesh.meshId, "monthly_onetime")}
                    >
                      Renovar +30 días
                    </button>
                    {mesh.isRecurring ? (
                      <button className="dash-card-btn dash-card-btn--danger">
                        Cancelar suscripción
                      </button>
                    ) : (
                      <button
                        className="dash-card-btn dash-card-btn--secondary"
                        onClick={() => handleCheckout(mesh.meshId, "monthly_recurring")}
                      >
                        Activar recurrente
                      </button>
                    )}
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}