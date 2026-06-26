import { useState, useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess";

export default function App() {
  const [route, setRoute] = useState("landing");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // detectar retorno de Stripe
    if (window.location.pathname === "/payment-success") {
      setRoute("payment-success");
      setChecking(false);
      return;
    }

    getCurrentUser()
      .then(() => setRoute("dashboard"))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  if (checking) return null;

  if (route === "login")
    return <LoginPage onLogin={() => setRoute("dashboard")} onBack={() => setRoute("landing")} />;

  if (route === "dashboard")
    return <Dashboard onLogout={() => setRoute("landing")} />;

  if (route === "payment-success")
    return <PaymentSuccess onContinue={() => setRoute("dashboard")} />;

  return <LandingPage onLogin={() => setRoute("login")} />;
}