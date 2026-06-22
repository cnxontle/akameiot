import { signOut } from "aws-amplify/auth";
import "./Dashboard.css";
import logo from "../../assets/akame_logo_text_Text.svg";

export default function Dashboard({ onLogout }) {
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
      <div className="dash-body">
        <div className="dash-empty">
          <div className="dash-empty-icon">◈</div>
          <div className="dash-empty-title">Dashboard</div>
          <div className="dash-empty-desc">Aquí van tus redes. Próximamente...</div>
        </div>
      </div>
    </div>
  );
}