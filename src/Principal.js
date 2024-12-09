import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const Principal = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
    const handleGoToLogin = () =>{
        navigate('/login');
    }

  return (
    <div className="container-fluid p-0">
      {/* Header con imagen de fondo */}
      <div 
        className="bg-light text-white text-center d-flex align-items-center justify-content-center" 
        style={{
          backgroundImage: "url('https://via.placeholder.com/1200x400')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
        }}
      >
        <div className="bg-fondo-azul bg-opacity-50 p-4 rounded">
          <img
            src="/crediya.jpeg" // Cambia esta URL por el logo de CREDIYA
            alt="Logo CREDIYA"
            className="mb-3"
            style={{ width: '120px' }}
          />
          <h1 className="display-4 fw-bold">¡Bienvenido a CREDIYA!</h1>
          <p className="lead">Préstamos rápidos, fáciles y confiables</p>
          <p className="lead"><button class="nav-link pointer text-warning fw-bold" onClick={handleGoToLogin}>Solicita tu prestamo AQUI.</button></p>
        </div>
      </div>

      {/* Sección de información */}
      <div className="container py-5">
        <h2 className="text-center mb-4">¿Por qué elegir CREDIYA?</h2>
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <i className="bi bi-currency-dollar display-4 text-primary"></i>
            <h5 className="mt-3">Dinero rápido</h5>
            <p>Recibe tu dinero en menos de 24 horas, sin complicaciones.</p>
            <img
            src="/dinero.png" // Cambia esta URL por el logo de CREDIYA
            alt="Logo CREDIYA"
            className="mb-3"
            style={{ width: '120px' }}
          />
          </div>
          <div className="col-md-4 text-center">
            <i className="bi bi-hand-thumbs-up display-4 text-success"></i>
            <h5 className="mt-3">Proceso fácil</h5>
            <p>Solicita tu préstamo desde cualquier dispositivo, en minutos.</p>
            <img
            src="/proceso.png" // Cambia esta URL por el logo de CREDIYA
            alt="Logo CREDIYA"
            className="mb-3"
            style={{ width: '120px' }}
          />
          </div>
          <div className="col-md-4 text-center">
            <i className="bi bi-shield-check display-4 text-warning"></i>
            <h5 className="mt-3">Confiabilidad</h5>
            <p>Tu seguridad y confianza son nuestra prioridad.</p>
            <img
            src="/confiable.png" // Cambia esta URL por el logo de CREDIYA
            alt="Logo CREDIYA"
            className="mb-3"
            style={{ width: '120px' }}
          />
          </div>
        </div>
      </div>

      {/* Pie de página */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          © {new Date().getFullYear()} CREDIYA. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Principal;
