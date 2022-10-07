import "../styles/app.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthContext from "../utils/AuthContext";
import Home from "./Home";
import Account from "./Account";
import Login from "./Login";
import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      const currentUser = jwtDecode(token);
      setUser(currentUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
