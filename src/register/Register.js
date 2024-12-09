// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [distrito, setDistrito] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate
    // Opciones de departamentos
    const departamentos = ['Lima', 'Arequipa', 'Cusco', 'Piura', 'La Libertad'];

    // Opciones de distritos (ciudades) por departamento (simplificado, solo Lima como ejemplo)
    const distritosPorDepartamento = {
        Lima: ['Miraflores', 'San Isidro', 'Barranco', 'Callao', 'Villa Maria del triunfo'],
        Arequipa: ['Arequipa', 'Cayma', 'Yanahuara'],
        Cusco: ['Cusco', 'Santiago', 'San Sebastián'],
        Piura: ['Piura', 'Castilla', 'Sechura'],
        'La Libertad': ['Trujillo', 'Virú', 'El Porvenir'],
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !dni || !edad || !email || !password || !departamento || !distrito || !confirmPassword || !telefono) {
            Swal.fire({
                title: '¡Error!',
                text: 'Por favor, completa todos los campos.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        if (edad < 18) {
            Swal.fire({
                title: '¡Error!',
                text: 'Debes ser mayor de edad.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        if (password !== confirmPassword) {
            Swal.fire({
                title: '¡Error!',
                text: 'Las contraseñas no coinciden.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const userData = {
            nombre,
            apellido,
            dni,
            edad,
            email,
            password,
            departamento,
            distrito,
            telefono,
        };
    
        localStorage.setItem('userData', JSON.stringify(userData));


        Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Ahora puedes iniciar sesión.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            navigate('/'); // Redirige al login
        });


    };

    const handleGoToRLogin = () => {
        navigate('/'); // Redirige a la página de registro
    };

    return (
        <div className="register-container">
            <h2 className='title-register'>Registro</h2>
            <form onSubmit={handleRegister}>
                <div className='group-box-input'>
                    <div className='group-input'>
                        <label htmlFor="nombre">Nombres:</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className='group-input'>
                        <label htmlFor="apellido">Apellidos:</label>
                        <input
                            type="text"
                            id="apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='group-box-input'>
                    <div className='group-input'>
                        <label htmlFor="dni">Dni:</label>
                        <input
                            type="number"
                            id="dni"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                        />
                    </div>
                    <div className='group-input'>
                        <label htmlFor="edad">Edad:</label>
                        <input
                            type="number"
                            id="edad"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="group-input">
                    <label htmlFor="departamento">Departamento:</label>
                    <select
                        id="departamento"
                        value={departamento}
                        onChange={(e) => setDepartamento(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un departamento</option>
                        {departamentos.map((dep) => (
                            <option key={dep} value={dep}>
                                {dep}
                            </option>
                        ))}
                    </select>
                </div>
                {departamento && (
                    <div className="group-input">
                        <label htmlFor="distrito">Distrito:</label>
                        <select
                            id="distrito"
                            value={distrito}
                            onChange={(e) => setDistrito(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un distrito</option>
                            {distritosPorDepartamento[departamento]?.map((dist) => (
                                <option key={dist} value={dist}>
                                    {dist}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className='group-box-input'>
                    <div className='group-input'>
                        <label htmlFor="telefono">Telefono:</label>
                        <input
                            type="number"
                            id="telefono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>
                    <div className='group-input'>
                        <label htmlFor="email">Email (Este sera tu usuario):</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='group-box-input'>

                    <div className='group-input'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="group-input">
                        <label htmlFor="confirm-password">Confirmar Password:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit">Registrar</button>
            </form>
            <p>
                ¿Ya tienes cuenta?{' '}
                <button onClick={handleGoToRLogin}>Inicia sesión aquí</button>
            </p>
        </div>
    );
};

export default Register;
