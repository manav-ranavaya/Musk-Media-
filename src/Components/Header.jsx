import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Components/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("auth", false);
    navigate("/login");
  };

  return (
    <>
      <Navbar>
        <Nav className="ml-auto logout">
          <span style={{ cursor: "pointer" }} onClick={handleLogout}>
            LOGOUT
          </span>
        </Nav>
      </Navbar>

      <aside className="custom-sidebar">
        <div className="header-logo">
          <img
            className="square"
            //  src={square} alt="Logo"
          />
          <h6 className="header-title">Musk Media</h6>
        </div>
        <div className="menu-items">
          <Link
            to="/games"
            aria-current={
              window.location.pathname === "/games" ? "page" : undefined
            }
          >
            Games
          </Link>
          <Link
            to="/tournaments"
            aria-current={
              window.location.pathname === "/tournaments" ? "page" : undefined
            }
          >
            Tournaments
          </Link>
          <Link
            to="/gamedevelopers"
            aria-current={
              window.location.pathname === "/gamedevelopers"
                ? "page"
                : undefined
            }
          >
            Game Developers
          </Link>
        </div>
      </aside>

      <div className="nav-content"></div>
    </>
  );
};

export default Header;
