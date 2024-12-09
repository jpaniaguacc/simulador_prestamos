import React from 'react';

const SolicitarForm = ({
  formData,
  laborando,
  propiedades,
  nivelesEstudio,
  motivosPrestamo,
  handleChange,
  setLaborando,
  setPropiedades,
  handleSubmit,
  loading,
  handleLaborandoChange,
  handlePropiedadesChange,
}) => {
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
          <span>Min. S/. 500.00 | Max. S/. 10,000.00</span>
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
          <label htmlFor="laborando">¿Está laborando?</label>
          <div className="group-input-radio">
            <input
              className="input-radio"
              type="radio"
              id="laborandoSí"
              name="laborando"
              value="true"
              checked={formData.laborando === true}
              onChange={handleLaborandoChange}
              required
            />
            <label htmlFor="laborandoSí">Sí</label>

            <input
              className="input-radio"
              type="radio"
              id="laborandoNo"
              name="laborando"
              value="false"
              checked={formData.laborando === false}
              onChange={handleLaborandoChange}
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
              value="true"
              checked={formData.propiedades === true}
              onChange={handlePropiedadesChange}
              required
            />
            <label htmlFor="propiedadesSi">Sí</label>

            <input
              className="input-radio"
              type="radio"
              id="propiedadesNo"
              name="propiedades"
              value="false"
              checked={formData.propiedades === false}
              onChange={handlePropiedadesChange}
              required
            />
            <label htmlFor="propiedadesNo">No</label>
          </div>
        </div>
      </div>

      <div className='contenedor-terminos'>
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

      <button type="submit" disabled={loading} className="btn btn-success">
        {loading ? <span>Loading...</span> : 'Solicitar préstamo'}
      </button>
    </form>
  );
};

export default SolicitarForm;
