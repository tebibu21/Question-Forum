import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">AskMe</h3>
          <p className="footer-desc">
            A simple Q&A platform where users ask and answer questions.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Navigation</h4>
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/ask" className="footer-link">
            Ask Question
          </Link>
          <Link to="/profile" className="footer-link">
            Profile
          </Link>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Account</h4>
          <Link to="/login" className="footer-link">
            Login
          </Link>
          <Link to="/register" className="footer-link">
            Register
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AskMe. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
