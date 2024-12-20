// src/login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import Swal from 'sweetalert2';
import useIsMobile from "../useIsMobile";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUserData = JSON.parse(localStorage.getItem('userData'));

    if (!savedUserData) {
      Swal.fire({
        title: 'Alerta!',
        text: 'No hay usuarios registrados. Por favor, regístrate primero.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (email === savedUserData.email && password === savedUserData.password) {
      navigate('/simulador');
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Credenciales incorrectas.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
  };


  const handleGoToRegister = () => {
    navigate('/register');
  };

  const handleGoToPagPrincipal = () => {
    navigate('/');
  };

  const handleGoToFinalizar = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('prestamos');
  };
  const isMobile = useIsMobile();
  return (
    <div className={isMobile ? "login-container-mobile" : "login-container"}>
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
      <p>
        <button className='btn btn-success' onClick={handleGoToPagPrincipal}>Pagina principal</button>
      </p>
      <p>
      <label class="pointer text-warning fw-bold" onClick={handleGoToFinalizar}>Finalizar simulación</label>
      </p>
    </div>
  );
};

export default Login;
