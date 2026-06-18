import { useState } from "react";
import "./LandingPage.css";

const NAV_LINKS = [
  { label: "Funciones", href: "#funciones" },
  { label: "Casos de uso", href: "#casos" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
];

const FEATURES = [
  {
    icon: "⬡",
    title: "Monitoreo en tiempo real",
    desc: "Visualiza el estado de tus sensores al instante desde cualquier lugar con conexión a internet.",
  },
  {
    icon: "☁",
    title: "Historial en la nube",
    desc: "Consulta mediciones pasadas almacenadas de forma segura. Exporta a CSV con un clic.",
  },
  {
    icon: "◈",
    title: "Múltiples redes",
    desc: "Gestiona todos tus dispositivos e instalaciones desde una sola cuenta unificada.",
  },
  {
    icon: "◎",
    title: "Alertas configurables",
    desc: "Define límites para cada métrica y recibe notificaciones cuando se superen.",
  },
  {
    icon: "⇄",
    title: "Sincronización automática",
    desc: "Tus datos siempre actualizados sin intervención manual.",
  },
  {
    icon: "⊕",
    title: "Acceso compartido",
    desc: "Comparte redes de forma segura con otros usuarios autorizados de tu equipo.",
  },
];

const USE_CASES = [
  {
    tag: "Agricultura",
    title: "Agricultura de precisión",
    desc: "Monitorea humedad del suelo, temperatura y condiciones climáticas en tus cultivos. Toma decisiones basadas en datos reales.",
    metrics: ["Humedad del suelo", "Temperatura", "Radiación solar"],
  },
  {
    tag: "Infraestructura",
    title: "Monitoreo de instalaciones",
    desc: "Supervisa condiciones críticas en plantas, bodegas o edificios. Detecta anomalías antes de que se conviertan en problemas.",
    metrics: ["Temperatura", "Presión", "Vibración"],
  },
  {
    tag: "Proyectos",
    title: "Proyectos a medida",
    desc: "Compatible con cualquier red de sensores IoT. Si puedes medirlo, Akame puede monitorearlo y almacenarlo.",
    metrics: ["Cualquier variable", "Cualquier sensor", "Cualquier escala"],
  },
];

const PRECIO_BASE = 500;

export default function LandingPage() {
  const [redes, setRedes] = useState(2);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleContacto(e) {
    e.preventDefault();
    setEnviado(true);
  }

  return (
    <div className="lp">
      {/* NAV */}
      <header className="lp-nav">
        <a href="#inicio" className="lp-logo">
          <span className="lp-logo-mark">▲</span>
          Akame <span className="lp-logo-iot">IoT</span>
        </a>
        <nav className="lp-nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="lp-nav-link">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="/dashboard" className="lp-btn lp-btn-primary">
          Acceder →
        </a>
      </header>

      {/* HERO */}
      <section className="lp-hero" id="inicio">
        <div className="lp-hero-grid">
          <div className="lp-hero-copy">
            <div className="lp-eyebrow">Monitoreo IoT en la nube</div>
            <h1 className="lp-hero-title">
              Tus sensores.<br />
              Tu información.<br />
              <span className="lp-hero-accent">Desde cualquier lugar.</span>
            </h1>
            <p className="lp-hero-sub">
              Akame IoT conecta tus redes de sensores con una plataforma simple
              para visualizar datos en tiempo real, consultar históricos y
              mantenerte informado sobre tus instalaciones o cultivos.
            </p>
            <div className="lp-hero-actions">
              <a href="#contacto" className="lp-btn lp-btn-primary lp-btn-lg">
                Solicitar demo
              </a>
              <a href="#funciones" className="lp-btn lp-btn-ghost lp-btn-lg">
                Ver funciones
              </a>
            </div>
          </div>
          <div className="lp-hero-visual">
            <div className="lp-dashboard-preview">
              <div className="lp-dp-bar">
                <span className="lp-dp-dot r" />
                <span className="lp-dp-dot y" />
                <span className="lp-dp-dot g" />
                <span className="lp-dp-url">akameiot.com/dashboard</span>
              </div>
              <div className="lp-dp-body">
                <div className="lp-dp-label">Red Norte — Sensor #04</div>
                <div className="lp-dp-metrics">
                  <div className="lp-dp-metric">
                    <div className="lp-dp-metric-val green">24.3°</div>
                    <div className="lp-dp-metric-key">Temperatura</div>
                  </div>
                  <div className="lp-dp-metric">
                    <div className="lp-dp-metric-val blue">68%</div>
                    <div className="lp-dp-metric-key">Humedad</div>
                  </div>
                  <div className="lp-dp-metric">
                    <div className="lp-dp-metric-val amber">1013</div>
                    <div className="lp-dp-metric-key">Presión hPa</div>
                  </div>
                </div>
                <div className="lp-dp-chart">
                  <svg viewBox="0 0 260 60" preserveAspectRatio="none">
                    <polyline
                      points="0,45 30,38 60,42 90,28 120,32 150,20 180,25 210,18 240,22 260,15"
                      fill="none"
                      stroke="#1D9E75"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="0,45 30,38 60,42 90,28 120,32 150,20 180,25 210,18 240,22 260,15"
                      fill="url(#chartFill)"
                      stroke="none"
                    />
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1D9E75" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#1D9E75" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="lp-dp-status">
                  <span className="lp-dp-online" />
                  En línea · Última lectura hace 12 s
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="lp-stats">
        {[
          { val: "99.9%", label: "Disponibilidad" },
          { val: "<2 s", label: "Latencia promedio" },
          { val: "CSV", label: "Exportación de datos" },
          { val: "∞", label: "Dispositivos por red" },
        ].map((s) => (
          <div key={s.label} className="lp-stat">
            <div className="lp-stat-val">{s.val}</div>
            <div className="lp-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <section className="lp-section" id="funciones">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-eyebrow">Funciones</div>
            <h2 className="lp-section-title">
              Todo lo que necesitas para monitorear
            </h2>
          </div>
          <div className="lp-features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="lp-feature-card">
                <div className="lp-feature-icon">{f.icon}</div>
                <div className="lp-feature-title">{f.title}</div>
                <div className="lp-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="lp-section lp-section-alt" id="casos">
        <div className="lp-section-inner">
          <div className="lp-section-header">
            <div className="lp-eyebrow">Casos de uso</div>
            <h2 className="lp-section-title">Diseñada para aplicaciones reales</h2>
          </div>
          <div className="lp-cases-grid">
            {USE_CASES.map((c) => (
              <div key={c.title} className="lp-case-card">
                <div className="lp-case-tag">{c.tag}</div>
                <h3 className="lp-case-title">{c.title}</h3>
                <p className="lp-case-desc">{c.desc}</p>
                <div className="lp-case-metrics">
                  {c.metrics.map((m) => (
                    <span key={m} className="lp-case-metric">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="lp-section" id="precios">
        <div className="lp-section-inner lp-pricing-inner">
          <div className="lp-section-header">
            <div className="lp-eyebrow">Precios</div>
            <h2 className="lp-section-title">Simple y predecible</h2>
            <p className="lp-section-sub">
              Pagas solo por las redes que tienes activas. Sin costos ocultos.
            </p>
          </div>
          <div className="lp-pricing-card">
            <div className="lp-pricing-top">
              <div className="lp-pricing-from">Desde</div>
              <div className="lp-pricing-price">
                ${PRECIO_BASE.toLocaleString()}
                <span className="lp-pricing-period">/ red / mes</span>
              </div>
              <p className="lp-pricing-note">
                Activa las redes que necesitas. El precio se ajusta automáticamente.
              </p>
            </div>
            <div className="lp-pricing-calc">
              <div className="lp-calc-label">
                <span>Calcula tu precio</span>
                <span className="lp-calc-redes">{redes} {redes === 1 ? "red" : "redes"}</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={redes}
                onChange={(e) => setRedes(Number(e.target.value))}
                className="lp-slider"
              />
              <div className="lp-calc-total">
                Total: <strong>${(redes * PRECIO_BASE).toLocaleString()} MXN / mes</strong>
              </div>
            </div>
            <ul className="lp-pricing-features">
              {[
                "Sin costo de instalación",
                "Cancela cuando quieras",
                "Soporte incluido",
                "Exportación CSV ilimitada",
                "Acceso compartido entre usuarios",
                "Historial completo en la nube",
              ].map((f) => (
                <li key={f} className="lp-pricing-feature">
                  <span className="lp-check">✓</span> {f}
                </li>
              ))}
            </ul>
            <a href="#contacto" className="lp-btn lp-btn-primary lp-btn-block">
              Solicitar acceso
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="lp-section lp-section-alt" id="contacto">
        <div className="lp-section-inner lp-contact-inner">
          <div className="lp-section-header">
            <div className="lp-eyebrow">Contacto</div>
            <h2 className="lp-section-title">¿Listo para empezar?</h2>
            <p className="lp-section-sub">
              Cuéntanos sobre tu proyecto y te contactamos para agendar una demo.
            </p>
          </div>
          {enviado ? (
            <div className="lp-contact-success">
              <div className="lp-success-icon">✓</div>
              <div className="lp-success-title">Mensaje recibido</div>
              <div className="lp-success-desc">
                Te contactaremos en menos de 24 horas.
              </div>
            </div>
          ) : (
            <form className="lp-contact-form" onSubmit={handleContacto}>
              <div className="lp-form-row">
                <div className="lp-form-group">
                  <label className="lp-form-label">Nombre</label>
                  <input
                    className="lp-form-input"
                    type="text"
                    placeholder="Juan Ramírez"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="lp-form-group">
                  <label className="lp-form-label">Correo electrónico</label>
                  <input
                    className="lp-form-input"
                    type="email"
                    placeholder="juan@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="lp-form-group">
                <label className="lp-form-label">
                  ¿Qué quieres monitorear?
                </label>
                <textarea
                  className="lp-form-input lp-form-textarea"
                  placeholder="Cuéntanos sobre tu proyecto, cuántas redes necesitas, qué tipo de sensores usas..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <button type="submit" className="lp-btn lp-btn-primary lp-btn-block">
                Enviar mensaje
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-logo">
            <span className="lp-logo-mark">▲</span>
            Akame <span className="lp-logo-iot">IoT</span>
          </div>
          <div className="lp-footer-links">
            <a href="#funciones">Funciones</a>
            <a href="#precios">Precios</a>
            <a href="#contacto">Contacto</a>
            <a href="/dashboard">Acceder</a>
          </div>
          <div className="lp-footer-copy">© 2026 Akame IoT</div>
        </div>
      </footer>
    </div>
  );
}