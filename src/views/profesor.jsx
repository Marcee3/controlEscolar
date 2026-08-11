import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    obtenerProfesores,
    registrarProfesor,
    eliminarProfesor
} from "../services/profesorService";

import { obtenerUsuarios } from "../services/usuarioService";

function Profesor() {

    const navigate = useNavigate();

    const [profesores, setProfesores] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const [clave_u, setClaveU] = useState("");
    const [especialidad, setEspecialidad] = useState("");

    useEffect(() => {
        cargarProfesores();
        cargarUsuarios();
    }, []);

    const cargarProfesores = async () => {

        try {

            const datos = await obtenerProfesores();
            setProfesores(datos);

        } catch (error) {

            console.error(
                "Error al cargar profesores:",
                error
            );

        }
    };

    const cargarUsuarios = async () => {

        try {

            const datos = await obtenerUsuarios();

            const profesores = datos.filter(
                usuario => usuario.rol === "Profesor"
            );

            setUsuarios(profesores);

        } catch (error) {

            console.error(
                "Error al cargar usuarios:",
                error
            );

        }
    };

    const agregarProfesor = async (e) => {

        e.preventDefault();

        try {

            await registrarProfesor({
                clave_u,
                especialidad
            });

            setClaveU("");
            setEspecialidad("");

            cargarProfesores();

        } catch (error) {

            console.error(
                "Error al registrar profesor:",
                error
            );

        }
    };

    const borrarProfesor = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar este profesor?"
        );

        if (!confirmar) return;

        try {

            await eliminarProfesor(id);
            cargarProfesores();

        } catch (error) {

            console.error(
                "Error al eliminar profesor:",
                error
            );

        }
    };

    const modificarProfesor = (profesor) => {

        navigate(
            `/editarProfesor/${profesor.clave_p}`
        );

    };

    return (

        <div className="admin-page">

            {/* =========================================
                ENCABEZADO
            ========================================= */}

            <div className="page-header">

                <div>

                    <h1>Administrar Profesores</h1>

                    <p>
                        Consulta y administra los profesores
                        registrados en el sistema.
                    </p>

                </div>

                <Link
                    to="/index"
                    className="back-button"
                >
                    ← Volver al inicio
                </Link>

            </div>


            {/* =========================================
                LISTA DE PROFESORES
            ========================================= */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Lista de profesores</h2>

                        <span>
                            {profesores.length} profesor(es)
                            registrado(s)
                        </span>

                    </div>

                </div>


                <div className="table-wrapper">

                    <table className="management-table">

                        <thead>

                            <tr>

                                <th>Clave</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Especialidad</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {profesores.length > 0 ? (

                                profesores.map((profesor) => (

                                    <tr
                                        key={profesor.clave_p}
                                    >

                                        <td>
                                            {profesor.clave_p}
                                        </td>


                                        <td>

                                            <strong>
                                                {profesor.usuario?.nombre}{" "}
                                                {profesor.usuario?.apellidoP}{" "}
                                                {profesor.usuario?.apellidoM}
                                            </strong>

                                        </td>


                                        <td>
                                            {profesor.usuario?.correo || "—"}
                                        </td>


                                        <td>
                                            {profesor.especialidad || "—"}
                                        </td>


                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        modificarProfesor(
                                                            profesor
                                                        )
                                                    }
                                                >
                                                    Editar
                                                </button>


                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        borrarProfesor(
                                                            profesor.clave_p
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="empty-state"
                                    >
                                        No hay profesores
                                        registrados.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </section>


            {/* =========================================
                FORMULARIO
            ========================================= */}

            <section className="content-card form-card">

                <div className="content-card-header">

                    <div>

                        <h2>Registrar profesor</h2>

                        <span>
                            Asocia un usuario con rol de
                            profesor a su información académica.
                        </span>

                    </div>

                </div>


                <form
                    onSubmit={agregarProfesor}
                    className="management-form"
                >

                    {/* USUARIO */}

                    <div className="form-field">

                        <label htmlFor="usuario">
                            Usuario
                        </label>

                        <select
                            id="usuario"
                            value={clave_u}
                            onChange={(e) =>
                                setClaveU(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Seleccione un profesor
                            </option>

                            {usuarios.map((usuario) => (

                                <option
                                    key={usuario.clave_u}
                                    value={usuario.clave_u}
                                >

                                    {usuario.nombre}{" "}
                                    {usuario.apellidoP}{" "}
                                    {usuario.apellidoM}

                                </option>

                            ))}

                        </select>

                    </div>


                    {/* ESPECIALIDAD */}

                    <div className="form-field">

                        <label htmlFor="especialidad">
                            Especialidad
                        </label>

                        <input
                            id="especialidad"
                            type="text"
                            placeholder="Ej. Desarrollo de Software"
                            value={especialidad}
                            onChange={(e) =>
                                setEspecialidad(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* BOTÓN */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            + Registrar profesor
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}

export default Profesor;
