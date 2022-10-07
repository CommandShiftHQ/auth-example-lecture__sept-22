import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../utils/AuthContext"

const Header = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="header">
    <div className="header__username">
      {user?.username}
      </div>
      <Link className="header__nav-link" to="/">
        Home
      </Link>
      <div className="header__nav-link" onClick={handleClick}>
        Account
      </div>
      <Link className="header__nav-link" to="/login">
        Login
      </Link>
    </nav>
  );
};

export default Header;
