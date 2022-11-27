import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogIn } from "../utils/login";
import AuthContext from "../utils/AuthContext";
import Header from "./Header";
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
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const setUser = useContext(AuthContext)?.setUser;
  const navigate = useNavigate();

  const handleChange = ({ target: { value, id } }) => {
    setDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordGenChange = (e) => {
    const pass = hashPassword(e.target.value);
    setGeneratedPassword(pass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    postLogIn(details)
      .then((res) => {
        console.log("response: ", res);
        if (res.status === 201) {
          setUser(details);
          setError(null);
          navigate("/account");
        } else {
          console.log(res.message);
          setError(res.message);
        }
      })
      .catch((res) => {
        console.log(res.error);
        setError(res.error);
      });
  };

  const handlePasswordToggle = () => {
    setPasswordVisibility(
      passwordVisibility === "password" ? "text" : "password"
    );
  };

  return (
    <>
      <Header />
      <p className="login__title">Please enter your details below to</p>
      <div className="container">
        <form className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" onChange={handleChange} />
          <label htmlFor="email">Email</label>
          <input id="email" onChange={handleChange} />
          <label htmlFor="password">
            Password{"  "}
            <button type="button" onClick={handlePasswordToggle}>
              {passwordVisibility === "password" ? "Show " : "Hide "}Password
            </button>
          </label>
          <input
            id="password"
            type={passwordVisibility}
            onChange={handleChange}
          />
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
