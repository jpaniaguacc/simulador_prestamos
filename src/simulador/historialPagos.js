import React from 'react';

const HistorialPagos = () => {
    // Datos estáticos para el historial de pagos
    const pagos = [
        {
            id: 1,
            cod_prestamo: '1733773110934',
            fechaPago: '01/12/2024',
            monto: 200,
            estado: 'Pagado',
            descripcion: 'Cuota mensual - Préstamo vivienda',
        },
        {
            id: 2,
            cod_prestamo: '1733773110934',
            fechaPago: '01/11/2024',
            monto: 200,
            estado: 'Pagado',
            descripcion: 'Cuota mensual - Préstamo vivienda',
        },
        {
            id: 3,
            cod_prestamo: '1733773110934',
            fechaPago: '01/10/2024',
            monto: 200,
            estado: 'Pendiente',
            descripcion: 'Cuota mensual - Préstamo educación',
        },
        {
            id: 4,
            cod_prestamo: '1733773110935',
            fechaPago: '01/09/2024',
            monto: 200,
            estado: 'Pagado',
            descripcion: 'Cuota mensual - Préstamo vivienda',
        },
        {
            id: 5,
            cod_prestamo: '1733773110935',
            fechaPago: '01/08/2024',
            monto: 200,
            estado: 'Pagado',
            descripcion: 'Cuota mensual - Préstamo vivienda',
        },
        {
            id: 6,
            cod_prestamo: '1733773110935',
            fechaPago: '01/07/2024',
            monto: 200,
            estado: 'Pendiente',
            descripcion: 'Cuota mensual - Préstamo educación',
        },
        {
            id: 7,
            cod_prestamo: '1733773110936',
            fechaPago: '01/06/2024',
            monto: 200,
            estado: 'Pagado',
            descripcion: 'Cuota mensual - Préstamo vivienda',
        },
        {
            id: 8,
            cod_prestamo: '1733773110936',
            fechaPago: '01/05/2024',
            monto: 200,
            estado: 'Pagado',
            descripcion: 'Cuota mensual - Préstamo vivienda',
        },
        {
            id: 9,
            cod_prestamo: '1733773110936',
            fechaPago: '01/04/2024',
            monto: 200,
            estado: 'Pendiente',
            descripcion: 'Cuota mensual - Préstamo educación',
        },
        {
            id: 10,
            cod_prestamo: '1733773110936',
            fechaPago: '01/03/2024',
            monto: 200,
            estado: 'Pagado',
            descripcion: 'Cuota mensual - Préstamo vivienda',
        },
        {
            id: 11,
            cod_prestamo: '1733773110936',
            fechaPago: '01/02/2024',
            monto: 200,
            estado: 'Pagado',
            descripcion: 'Cuota mensual - Préstamo vivienda',
        },
        {
            id: 12,
            cod_prestamo: '1733773110936',
            fechaPago: '01/01/2024',
            monto: 200,
            estado: 'Pendiente',
            descripcion: 'Cuota mensual - Préstamo educación',
        },
    ];

    return (
        <div>
            {pagos.length === 0 ? (
                <p>No tienes pagos registrados.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cod. de Préstamo</th>
                            <th>Fecha de Pago</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagos.map((pago, index) => (
                            <tr key={pago.id}>
                                <td>{pago.id}</td>
                                <td>{pago.cod_prestamo}</td>
                                <td>{pago.fechaPago}</td>
                                <td>S/{pago.monto.toFixed(2)}</td>
                                <td>
                                    <span
                                        className={`badge ${pago.estado === 'Pagado' ? 'bg-success' : 'bg-warning'
                                            }`}
                                    >
                                        {pago.estado}
                                    </span>
                                </td>
                                <td>{pago.descripcion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HistorialPagos;
