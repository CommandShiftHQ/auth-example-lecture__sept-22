import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { attemptLogin, fetchHash } from "../utils/fakeLogin";
import AuthContext from "../utils/AuthContext";
import Header from "./Header";
import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
import bcrypt from "bcryptjs";
import "../styles/login.css";
import hashPassword from "../utils/hashPassword";

const Login = () => {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = ({ target: { value, id } }) => {
    setDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordGenChange = (e) => {
    const pass = hashPassword(e.target.value);
    setGeneratedPassword(pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchHashResult = fetchHash(details.username, details.email);
    console.log(fetchHashResult, "<-- fetchHashResult");
    if (fetchHashResult.error) {
      setError(fetchHashResult.error);
    } else {
      const correctHash = bcrypt.compareSync(
        details.password,
        fetchHashResult.hash
      );
      if (correctHash) {
        console.log('correct hash')
      } else {
        console.log('incorrect hash')
      }
    }

    const res = attemptLogin(details);
    if (res.error) {
      setError(res.error);
    } else {
      const currentUser = jwtDecode(res.token);
      console.log(currentUser, "<-- currentUser");
      setUser(currentUser);
      setError(null);
      // expiry date is expressed in days. 1/24 == 1 hour expiry time
      Cookie.set("token", res.token, { expires: 1 / 24 });
      navigate("/account");
    }
  };

  return (
    <>
      <Header />
      <p className="login__title">Please enter your details below to login</p>
      <div className="container">
        <form className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" onChange={handleChange} />
          <label htmlFor="email">Email</label>
          <input id="email" onChange={handleChange} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" onChange={handleChange} />
          <button className="login__form-button" type="submit">
            Login
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
      <div className="container">
        <label htmlFor="hashPassword">Password Hash Generator</label>
        <input
          id="hashPassword"
          type="text"
          onChange={handlePasswordGenChange}
        />
        <div>Hashed Password: {generatedPassword}</div>
      </div>
    </>
  );
};

export default Login;
