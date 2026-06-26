import { useEffect, useState } from "react";
import "./PaymentSuccess.css";
import logo from "../../assets/akame_logo_text_Text.svg";

export default function PaymentSuccess({ onContinue }) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(timer);
          onContinue();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="ps-bg">
      <div className="ps-card">
        <img src={logo} alt="Akame IoT" className="ps-logo" />
        <div className="ps-icon">✓</div>
        <h1 className="ps-title">¡Pago exitoso!</h1>
        <p className="ps-desc">
          Tu red ha sido renovada por 30 días adicionales.
          Los cambios pueden tardar unos segundos en reflejarse.
        </p>
        <p className="ps-count">
          Redirigiendo al dashboard en <strong>{count}</strong> segundos...
        </p>
        <button className="ps-btn" onClick={onContinue}>
          Ir al dashboard ahora
        </button>
      </div>
    </div>
  );
}