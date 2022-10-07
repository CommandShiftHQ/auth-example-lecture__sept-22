import "../styles/header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../utils/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="header">
      <div className="header__username">{user?.username}</div>
      <Link className="header__nav-link" to="/">
        Home
      </Link>
      <Link className="header__nav-link" to="/account">Account</Link>
      <Link className="header__nav-link" to="/login">
        Login
      </Link>
    </nav>
  );
};

export default Header;
