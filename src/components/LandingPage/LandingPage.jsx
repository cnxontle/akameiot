import { useState } from "react";
import "./LandingPage.css";
import logo from "../../assets/akame_logo_text_Text.svg";



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

const SENSOR_NUM_1 = Math.floor(Math.random() * 99) + 1;
const SENSOR_NUM_2 = Math.floor(Math.random() * 99) + 1;
const HUMEDAD_ACTUAL = (Math.random() * (70 - 30) + 30).toFixed(2);

const SENSOR_PREVIEW = [
  {
    id: 1,
    name: `Antártida · ${SENSOR_NUM_1}`,
    time: new Date().toLocaleString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
    metrics: [
       { label: "Humedad", value: `${HUMEDAD_ACTUAL} %`, trend: "down" },
    ],
  },
];

function getLast7Days() {
  const labels = ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."];
  const today = new Date().getDay(); // 0 = domingo ... 6 = sábado
  const days = [];
  for (let i = 6; i >= 0; i--) {
    days.push(labels[(today - i + 7) % 7]);
  }
  return days;
}

const CHART_DAYS = getLast7Days();

const CHART_PREVIEW = {
  name: `Antártida · ${SENSOR_NUM_2}`,
  metric: "Humedad",
  unit: "%",
  min: 12.49,
  max: 53.40,
  yAxis: [60, 45, 30, 15],
  points: (() => {
    // 7 días, 8 lecturas por día. Cada día tiene su propio nivel base
    // (varía un poco respecto al anterior, como el clima real) más el
    // ciclo diario habitual y ruido de sensor.
    const days = 7;
    const perDay = 8;
    let dayBase = 26;
    const pts = [];

    for (let d = 0; d < days; d++) {
      // el nivel base del día se mueve respecto al día anterior (random walk)
      dayBase += (Math.random() - 0.5) * 10;
      dayBase = Math.min(40, Math.max(18, dayBase));

      for (let h = 0; h < perDay; h++) {
        const cycle = Math.sin((h / perDay) * Math.PI * 2 - 1.5) * 9;
        const noise = (Math.random() - 0.5) * 5;
        let v = dayBase + cycle + noise;
        pts.push(v);
      }
    }

    // un pico anómalo en algún punto intermedio, como sensor real
    const spikeIndex = 25 + Math.floor(Math.random() * 8);
    pts[spikeIndex] = 53.4;

    // clamp final a los límites declarados
    return pts.map((v) => Math.min(53.4, Math.max(12.49, Math.round(v * 100) / 100)));
  })(),
};




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
          <img src={logo} alt="Akame IoT" className="lp-logo-full" />
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
          <div className="lp-dp-body">
          {SENSOR_PREVIEW.map((s) => (
            <div key={s.id} className="lp-sensor-card">
              <div className="lp-sensor-head">
                <span className="lp-sensor-name">{s.name}</span>
                <span className="lp-sensor-time">{s.time}</span>
              </div>
              <div className="lp-sensor-metrics">
                {s.metrics.map((m) => (
                  <div key={m.label} className="lp-sensor-metric">
                    <span className="lp-sensor-metric-label">{m.label}</span>
                    <span className={`lp-sensor-metric-val ${m.trend}`}>
                      <span className="lp-trend-arrow">
                        {m.trend === "up" ? "↑" : "↓"}
                      </span>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="lp-chart-card">
            <div className="lp-chart-head">
              <div>
                <div className="lp-chart-name">{CHART_PREVIEW.name}</div>
                <div className="lp-chart-metric">{CHART_PREVIEW.metric}</div>
              </div>
              <div className="lp-chart-range">
                <span>Min: {CHART_PREVIEW.min.toFixed(2)}</span>
                <span>Max: {CHART_PREVIEW.max.toFixed(2)}</span>
              </div>
            </div>
            <div className="lp-chart-svg-wrap">
            <div className="lp-chart-yaxis">
              {CHART_PREVIEW.yAxis.map((v) => (
                <span key={v}>{v}{CHART_PREVIEW.unit}</span>
              ))}
            </div>
            <svg
              className="lp-chart-svg"
              viewBox="0 0 320 110"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartAreaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#66BB6A" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#66BB6A" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="0"
                  x2="320"
                  y1={10 + i * 25}
                  y2={10 + i * 25}
                  className="lp-chart-gridline"
                />
              ))}
              {(() => {
                const pts = CHART_PREVIEW.points;
                const w = 320;
                const h = 90;
                const top = 10;
                const max = Math.max(...pts);
                const min = Math.min(...pts);
                const range = max - min || 1;
                const coords = pts.map((v, i) => {
                  const x = (i / (pts.length - 1)) * w;
                  const y = top + h - ((v - min) / range) * h;
                  return `${x},${y}`;
                });
                const line = coords.join(" ");
                const area = `0,${top + h} ${line} ${w},${top + h}`;
                return (
                  <>
                    <polygon points={area} fill="url(#chartAreaFill)" />
                    <polyline
                      points={line}
                      fill="none"
                      stroke="#66BB6A"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </>
                );
              })()}
            </svg>
          </div>
            <div className="lp-chart-days">
              {CHART_DAYS.map((d, i) => (
                <span key={i}>{d}</span>
              ))}
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
          { val: "100", label: "Dispositivos por red" },
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
                "Cancela cuando quieras",
                "Soporte incluido",
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
            <img src={logo} alt="Akame IoT" className="lp-logo-full" />
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