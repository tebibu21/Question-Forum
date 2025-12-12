import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppState } from "../App";
import "../styles/Header.css";

function Header() {
  const { user, setUser } = useContext(AppState);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setUser({});
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          Question-Forum
        </Link>

        {/* Navigation */}
        <nav className="nav">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {user && user.userid ? (
            <>
              <Link to="/ask" className="nav-link">
                Ask Question
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
