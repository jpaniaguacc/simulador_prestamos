import React, { useState } from 'react';

const Simulador = () => {
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

  // Opciones para el select
  const nivelesEstudio = ['Primaria', 'Secundaria', 'Universitario', 'Postgrado'];
  const motivosPrestamo = ['Compra de vivienda', 'Educación', 'Salud', 'Otros'];

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

    // Validación de monto
    if (formData.monto < 500 || formData.monto > 10000) {
      setErrorMessage('El monto debe estar entre 500 y 10,000 soles.');
      setLoading(false);
      return;
    }

    // Validación de sueldo
    if (formData.sueldo < 0) {
      setErrorMessage('El sueldo no puede ser negativo.');
      setLoading(false);
      return;
    }

    // Validación de plazo
    if (!formData.plazo) {
      setErrorMessage('Elige un plazo.');
      setLoading(false);
      return;
    }

    // Validación de términos y condiciones
    if (!formData.terminosAceptados) {
      setErrorMessage('Debes aceptar los términos y condiciones.');
      setLoading(false);
      return;
    }

    // Simulación de aprobación
    setTimeout(() => {
      setIsApproved(true);
      setLoading(false);
    }, 3000); // Simulamos un proceso de 2 segundos
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='group-box-input'>
          <div className='group-input'>
            <label htmlFor="estadoCivil">Estado Civil:</label>
            <select
              id="estadoCivil"
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un estado civil</option>
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              <option value="Divorciado">Divorciado</option>
              <option value="Viudo">Viudo</option>
            </select>
          </div>

          <div className='group-input'>
            <label htmlFor="monto">Monto del préstamo:</label>
            <input
              type="number"
              id="monto"
              name="monto"
              value={formData.monto}
              onChange={handleChange}
              min="500"
              max="10000"
              required
            />
          </div>
        </div>
        <div className='group-box-input'>
          <div className='group-input'>
            <label htmlFor="sueldo">Sueldo actual:</label>
            <input
              type="number"
              id="sueldo"
              name="sueldo"
              value={formData.sueldo}
              onChange={handleChange}
              required
            />
          </div>

          <div className='group-input'>
            <label htmlFor="plazo">Plazo (días):</label>
            <select
              id="plazo"
              name="plazo"
              value={formData.plazo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un plazo</option>
              <option value="30">30 días</option>
              <option value="60">60 días</option>
              <option value="90">90 días</option>
            </select>
          </div>
        </div>
        <div className='group-box-input'>
          <div className='group-input'>
            <label htmlFor="nivelEstudio">Nivel de estudio:</label>
            <select
              id="nivelEstudio"
              name="nivelEstudio"
              value={formData.nivelEstudio}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un nivel</option>
              {nivelesEstudio.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>
          <div className='group-input'>
            <label htmlFor="motivoPrestamo">Motivo del préstamo:</label>
            <select
              id="motivoPrestamo"
              name="motivoPrestamo"
              value={formData.motivoPrestamo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un motivo</option>
              {motivosPrestamo.map((motivo) => (
                <option key={motivo} value={motivo}>
                  {motivo}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='group-box-input'>
          <div className="group-input">
            <label htmlFor="estáLaborando">¿Está laborando?</label>
            <div className="group-input-radio">
              <input
                className="input-radio"
                type="radio"
                id="laborandoSí"
                name="estáLaborando"
                value="Sí"
                checked={laborando === "Sí"}
                onChange={(e) => setLaborando(e.target.value)}
                required
              />
              <label htmlFor="laborandoSí">Sí</label>

              <input
                className="input-radio"
                type="radio"
                id="laborandoNo"
                name="estáLaborando"
                value="No"
                checked={laborando === "No"}
                onChange={(e) => setLaborando(e.target.value)}
                required
              />
              <label htmlFor="laborandoNo">No</label>
            </div>
          </div>

          <div className="group-input">
            <label htmlFor="propiedades">¿Posees propiedades a tu nombre?</label>
            <div className="group-input-radio">
              <input
                className="input-radio"
                type="radio"
                id="propiedadesSi"
                name="propiedades"  
                value="Sí"
                checked={propiedades === "Sí"}
                onChange={(e) => setPropiedades(e.target.value)}  
                required
              />
              <label htmlFor="propiedadesSi">Sí</label>

              <input
                className="input-radio"
                type="radio"
                id="propiedadesNo"
                name="propiedades"  
                value="No"
                checked={propiedades === "No"}
                onChange={(e) => setPropiedades(e.target.value)}  
                required
              />
              <label htmlFor="propiedadesNo">No</label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="terminosAceptados">
            Acepto los términos y condiciones
          </label>
          <input
            type="checkbox"
            id="terminosAceptados"
            name="terminosAceptados"
            checked={formData.terminosAceptados}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? (
            <span>Loading...</span> // Aquí podrías agregar un spinner
          ) : (
            'Solicitar préstamo'
          )}
        </button>
      </form>
    );
  };

  // Menú horizontal
  const renderMenu = () => {
    return (
      <nav className="menu">
        <ul>
          <li><button onClick={() => setSelectedOption('solicitar')}>Solicitar préstamo</button></li>
          <li><button onClick={() => setSelectedOption('verPrestamos')}>Ver mis préstamos</button></li>
          <li><button onClick={() => setSelectedOption('historial')}>Historial de pagos</button></li>
          <li><button onClick={() => setSelectedOption('configuracion')}>Configuración</button></li>
          <li><button onClick={() => alert('Saliendo...')}>Salir</button></li>
        </ul>
      </nav>
    );
  };

  return (
    <div>
      <h1>Simulador de Préstamos</h1>
      <p>Bienvenido al simulador de préstamos.</p>

      {renderMenu()}

      {selectedOption === 'solicitar' && (
        <div>
          <h2>Formulario de Solicitud de Préstamo</h2>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          {isApproved && <div style={{ color: 'green' }}>¡Préstamo aprobado!</div>}
          {renderForm()}
        </div>
      )}

      {selectedOption === 'verPrestamos' && <p>Ver mis préstamos</p>}
      {selectedOption === 'historial' && <p>Historial de pagos</p>}
      {selectedOption === 'configuracion' && <p>Configuración</p>}
    </div>
  );
};

export default Simulador;
