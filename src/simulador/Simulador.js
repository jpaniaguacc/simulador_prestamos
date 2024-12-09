import React, { useState, useEffect } from 'react';
import SolicitarForm from './solicitar';
import Prestamos from './prestamos';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Simulador = () => {

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('solicitar');
  const [formData, setFormData] = useState({
    monto: '',
    sueldo: '',
    plazo: '',
    nivelEstudio: '',
    motivoPrestamo: '',
    laborando: false,
    propiedades: false,
    terminosAceptados: false,
  });
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [laborando, setLaborando] = useState(false);
  const [propiedades, setPropiedades] = useState(false);
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

    // Si es un checkbox, se actualiza como booleano, si es otro tipo de input, se toma el valor del input.
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleLaborandoChange = (e) => {
    const value = e.target.value === "true"; // Convierte a booleano
    setFormData((prevData) => ({
      ...prevData,
      laborando: value,
    }));
  };
  
  const handlePropiedadesChange = (e) => {
    const value = e.target.value === "true"; // Convierte a booleano
    setFormData((prevData) => ({
      ...prevData,
      propiedades: value,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

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

    setTimeout(() => {
      if (!formData.laborando || Number(formData.sueldo) < 1025) {
        setIsApproved(false);
        setLoading(false);
        Swal.fire({
          title: 'Lo Sentimos!',
          text: 'Tu préstamo no fue aprobado',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      } else {
        setIsApproved(true);
        procesaAprobado();
      }
      
    }, 3000);
  };

  const procesaAprobado = () => {

    const fechaHoy = new Date();
    const dia = fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1;
    const anio = fechaHoy.getFullYear();
    const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;

    console.log("isApproved: ",  isApproved);
    // Guardar el préstamo
    const newPrestamo = {
      ...formData,
      laborando: formData.laborando, // Usa los valores actualizados
      propiedades: formData.propiedades,
      id: Date.now(),
      estado: "Aprobado",
      fecha: fechaFormateada,
      cuota: obtenerCuotaMensual(formData.monto, formData.plazo),
    };
    

    const updatedPrestamos = [...prestamos, newPrestamo];
    setPrestamos(updatedPrestamos);

    localStorage.setItem('prestamos', JSON.stringify(updatedPrestamos));


    setLoading(false);
    setSelectedOption('verPrestamos');
    cleanForm();
  }
  const obtenerCuotaMensual = (monto, plazo) => {
    const montoConInteres = monto * 0.141; // Aplica el interés
    const cuotas = plazo / 30; // Número de cuotas según el plazo
    const cuotaMensual = montoConInteres / cuotas;
    return parseFloat(cuotaMensual.toFixed(2)); // Limita a 2 decimales y lo convierte de nuevo a número
  };



  const cleanForm = () => {
    // Restablecer los campos del formulario a sus valores iniciales
    setFormData({
      monto: '',
      sueldo: '',
      plazo: '',
      nivelEstudio: '',
      motivoPrestamo: '',
      laborando: false,
      propiedades: false,
      terminosAceptados: false,
    });
    setLaborando('');
    setPropiedades('');
  };

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
                <a class="nav-link pointer" onClick={() => setSelectedOption('solicitar')}>Solicitar préstamo</a>
              </li>
              <li class="nav-item">
                <a class="nav-link pointer" onClick={() => setSelectedOption('verPrestamos')}>Ver mis préstamos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link pointer" onClick={() => setSelectedOption('historial')}>Historial de pagos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link pointer" onClick={() => setSelectedOption('configuracion')}>Configuración</a>
              </li>
            </ul>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {nombre}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li class="text-center"><a class="dropdown-item center pointer" >{nombre + " " + apellido}</a></li>
                <li class="text-center"><a class="dropdown-item pointer" >{email}</a></li>
                <li class="text-center"><a class="dropdown-item pointer" onClick={() => handleLogout()}>Salir</a></li>
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
      <h1 className='text-center'>Bienvenido al Simulador de Préstamos</h1>
      <p>Obtén tu préstamo 100% online!</p>
      {selectedOption === 'solicitar' && (
        <div>
          <h3>Formulario de Solicitud de Préstamo</h3>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
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
            handleLaborandoChange={handleLaborandoChange}
            handlePropiedadesChange={handlePropiedadesChange}

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
