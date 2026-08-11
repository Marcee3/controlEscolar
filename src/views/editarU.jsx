import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
    obtenerUsuarioPorId,
    editarUsuario
} from "../services/usuarioService";

function EditarUsuario() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        correo: "",
        contrasena: "",
        nombre: "",
        apellidop: "",
        apellidom: "",
        telefono: "",
        rol: ""
    });

    useEffect(() => {

        const cargarUsuario = async () => {

            const datos = await obtenerUsuarioPorId(id);

            setUsuario(datos);

        };

        cargarUsuario();

    }, [id]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        await editarUsuario(id, usuario);

        navigate("/index");

    };


    return (

        <div className="admin-page">

            {/* ENCABEZADO */}

            <div className="page-header">

                <div>

                    <h1>Editar Usuario</h1>

                    <p>
                        Modifica la información del usuario
                        registrado en el sistema.
                    </p>

                </div>

                <Link
                    to="/index"
                    className="back-button"
                >
                    ← Volver al inicio
                </Link>

            </div>


            {/* FORMULARIO */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Información del usuario</h2>

                        <span>
                            Actualiza los datos necesarios
                        </span>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div>

                        <label>Correo electrónico</label>

                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo electrónico"
                            value={usuario.correo}
                            onChange={handleChange}
                        />

                    </div>


                    <div>

                        <label>Contraseña</label>

                        <input
                            type="password"
                            name="contrasena"
                            placeholder="Contraseña"
                            value={usuario.contrasena}
                            onChange={handleChange}
                        />

                    </div>


                    <div>

                        <label>Nombre</label>

                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={usuario.nombre}
                            onChange={handleChange}
                        />

                    </div>


                    <div>

                        <label>Apellido paterno</label>

                        <input
                            type="text"
                            name="apellidop"
                            placeholder="Apellido paterno"
                            value={usuario.apellidop}
                            onChange={handleChange}
                        />

                    </div>


                    <div>

                        <label>Apellido materno</label>

                        <input
                            type="text"
                            name="apellidom"
                            placeholder="Apellido materno"
                            value={usuario.apellidom}
                            onChange={handleChange}
                        />

                    </div>


                    <div>

                        <label>Teléfono</label>

                        <input
                            type="text"
                            name="telefono"
                            placeholder="Teléfono"
                            value={usuario.telefono}
                            onChange={handleChange}
                        />

                    </div>


                    <div>

                        <label>Rol</label>

                        <select
                            name="rol"
                            value={usuario.rol}
                            onChange={handleChange}
                        >

                            <option value="Alumno">
                                Alumno
                            </option>

                            <option value="Profesor">
                                Profesor
                            </option>

                            <option value="Administrador">
                                Administrador
                            </option>

                        </select>

                    </div>


                    <div className="form-actions">

                        <button type="submit">
                            Guardar Cambios
                        </button>

                        <Link
                            to="/index"
                            className="back-button"
                        >
                            Cancelar
                        </Link>

                    </div>

                </form>

            </section>

        </div>

    );

}

export default EditarUsuario;