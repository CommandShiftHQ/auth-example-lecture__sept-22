import "../styles/app.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import AuthContext from "../utils/AuthContext";
import Home from "./Home";
import Account from "./Account";
import Login from "./Login";

const App = () => {
  const [user, setUser] = useState(null);

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
