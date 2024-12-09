
import './App.css';
import React from 'react';
import Login from './login/Login';
import Principal from './Principal';
import Register from './register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Simulador from './simulador/Simulador';  // Componente del simulador de préstamos

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/simulador" element={<Simulador />} /> {/* Página del simulador */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
