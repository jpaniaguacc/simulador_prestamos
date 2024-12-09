// src/login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUserData = JSON.parse(localStorage.getItem('userData'));

    if (!savedUserData) {
        alert('No hay usuarios registrados. Por favor, regístrate primero.');
        return;
    }

    if (email === savedUserData.email && password === savedUserData.password) {
        navigate('/simulador'); 
    } else {
        alert('Credenciales incorrectas');
    }
};


  const handleGoToRegister = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <div className="login-container">
      <h2 className="title-login">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="group-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="group-input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        No tienes cuenta?{' '}
        <button onClick={handleGoToRegister}>Regístrate aquí</button>
      </p>
    </div>
  );
};

export default Login;
