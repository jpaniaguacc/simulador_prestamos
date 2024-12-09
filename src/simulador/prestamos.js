import React from 'react';

const Prestamos = ({ prestamos }) => {
  return (
    <div>
      <h2>Detalle de Préstamos Realizados</h2>
      {prestamos.length === 0 ? (
        <p>No tienes préstamos registrados.</p>
      ) : (
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Monto Prestado</th>
              <th>Plazo (días)</th>
              <th>Cuota Mensual</th>
              <th>Motivo</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((prestamo) => (
              <tr key={prestamo.id}>
                <td>{prestamo.id}</td>
                <td>S/. {prestamo.monto}</td>
                <td>{prestamo.plazo}</td>
                <td>S/. {prestamo.cuota}</td>
                <td>{prestamo.motivoPrestamo}</td>
                <td>{prestamo.estado}</td>
                <td>{prestamo.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Prestamos;
