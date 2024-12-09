import React, { useState, useEffect } from 'react';
import SolicitarForm from './solicitar';
import Prestamos from './prestamos';
import { useNavigate } from 'react-router-dom';


const Simulador = () => {

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('solicitar');
  const [formData, setFormData] = useState({
    monto: '',
    sueldo: '',
    plazo: '',
    nivelEstudio: '',
    motivoPrestamo: '',
    estaLaborando: false,
    noEstaLaborando: false,
    terminosAceptados: false,
  });
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [laborando, setLaborando] = useState("");
  const [propiedades, setPropiedades] = useState("");
  const [prestamos, setPrestamos] = useState([]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Solo se ejecuta una vez, después del primer renderizado
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setNombre(userData.nombre);
      setApellido(userData.apellido);
      setEmail(userData.email);
    } else {
      console.log('No se encontró información userData en localStorage.');
    }
  }, []);


  const nivelesEstudio = ['Primaria', 'Secundaria', 'Universitario', 'Postgrado'];
  const motivosPrestamo = ['Compra de vivienda', 'Remodelar vivienda', 'Compra de vehiculo', 'Educación', 'Salud'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setIsApproved(false);

    // Validaciones
    if (formData.monto < 500 || formData.monto > 10000) {
      setErrorMessage('El monto debe estar entre 500 y 10,000 soles.');
      setLoading(false);
      return;
    }

    if (!formData.terminosAceptados) {
      setErrorMessage('Debes aceptar los términos y condiciones.');
      setLoading(false);
      return;
    }
    const fechaHoy = new Date();
    const dia = fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1; // Los meses empiezan desde 0
    const anio = fechaHoy.getFullYear();
    const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;

    // Guardar el préstamo
    const newPrestamo = {
      ...formData,
      laborando,
      propiedades,
      id: Date.now(), // Generar un ID único para cada préstamo
      estado: isApproved ? "Aprobado" : "Desaprobado",
      fecha: fechaFormateada,
      cuota: obtenerCuotaMenual(formData.monto, formData.plazo)
    };

    // Actualizar el estado local de préstamos
    const updatedPrestamos = [...prestamos, newPrestamo];
    setPrestamos(updatedPrestamos);

    // Guardar los préstamos en localStorage
    localStorage.setItem('prestamos', JSON.stringify(updatedPrestamos));

    setTimeout(() => {
      if (formData.estaLaborando == 'No' || formData.sueldo < 1025) {
        setIsApproved(false);
        setLoading(false);
        setSelectedOption('verPrestamos'); // Cambiar la vista a "Ver mis préstamos"
      }
      setIsApproved(true);
      setLoading(false);
      setSelectedOption('verPrestamos'); // Cambiar la vista a "Ver mis préstamos"
    }, 3000);

    cleanForm();
  };

  const obtenerCuotaMenual = (monto, plazo) => {

    const montoConInteres = monto * 0.141; // Aplica el interés
    const cuotas = plazo / 30; // Número de cuotas según el plazo
    return montoConInteres / cuotas;
  };


  const cleanForm = () => {
    setFormData("");
    setPropiedades("");
    setLaborando("");
  }
  const renderMenu = () => {


    const handleLogout = () => {
      navigate('/'); // Redirige al login
    };

    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" onClick={() => setSelectedOption('solicitar')}>Solicitar préstamo</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={() => setSelectedOption('verPrestamos')}>Ver mis préstamos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={() => setSelectedOption('historial')}>Historial de pagos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={() => setSelectedOption('configuracion')}>Configuración</a>
              </li>
            </ul>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                USUARIO
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li class="text-center"><a class="dropdown-item center" >{nombre + " " + apellido}</a></li>
                <li class="text-center"><a class="dropdown-item" >{email}</a></li>
                <li class="text-center"><a class="dropdown-item" onClick={() => handleLogout()}>Salir</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

    );
  }

  return (
    <div>
      {renderMenu()}
      <h1 className='text-center'>Simulador de Préstamos</h1>
      <p>Bienvenido al simulador de préstamos.</p>
      <p>Obtén tu préstamo 100% online!</p>
      {selectedOption === 'solicitar' && (
        <div>
          <h2>Formulario de Solicitud de Préstamo</h2>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          {isApproved && <div style={{ color: 'green' }}>¡Préstamo aprobado!</div>}
          <SolicitarForm
            formData={formData}
            laborando={laborando}
            propiedades={propiedades}
            nivelesEstudio={nivelesEstudio}
            motivosPrestamo={motivosPrestamo}
            handleChange={handleChange}
            setLaborando={setLaborando}
            setPropiedades={setPropiedades}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      )}
      {selectedOption === 'verPrestamos' && (
        <div>
          <h2>Mis prestamos</h2>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <Prestamos
            prestamos={prestamos}
          />
        </div>
      )}
      {selectedOption === 'historial' && <p>Historial de pagos</p>}
      {selectedOption === 'configuracion' && <p>Configuración</p>}
    </div>
  );
};

export default Simulador;