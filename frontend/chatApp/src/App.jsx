import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ActivationEmailSend from "./pages/auth/ActivationEmailSend";
import Home from "./pages/home/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activation-email-send" element={<ActivationEmailSend />} />


          <Route path="/home" element={<Home />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
