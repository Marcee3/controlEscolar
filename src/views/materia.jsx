import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    obtenerMaterias,
    registrarMateria,
    eliminarMateria
} from "../services/materiaService";
import { obtenerCarreras } from "../services/carreraService";

function Materias() {
    const navigate = useNavigate();

    const [materias, setMaterias] = useState([]);
    const [carreras, setCarreras] = useState([]);

    const [nombre, setNombre] = useState("");
    const [coordinacion, setCoordinacion] = useState("");
    const [carrera, setCarrera] = useState("");

    useEffect(() => {
        cargarMaterias();
        cargarCarreras();
    }, []);

    const cargarMaterias = async () => {
        try {
            const datos = await obtenerMaterias();
            setMaterias(datos);
        } catch (error) {
            console.error("Error al cargar materias:", error);
        }
    };

    const cargarCarreras = async () => {
        try {
            const datos = await obtenerCarreras();
            setCarreras(datos);
        } catch (error) {
            console.error("Error al cargar carreras:", error);
        }
    };

    const agregarMateria = async (e) => {
        e.preventDefault();
        try {
            await registrarMateria({
                clave_c: carrera,
                nombre_m: nombre,
                coordinacion: coordinacion
            });

            setNombre("");
            setCoordinacion("");
            setCarrera("");

            cargarMaterias();

        } catch (error) {
            console.error("Error al registrar materia:", error);
        }
    };

    const borrarMateria = async (id) => {

        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar esta materia?"
        );

        if (!confirmar) return;

        try {
            await eliminarMateria(id);
            cargarMaterias();
        } catch (error) {
            console.error("Error al eliminar materia:", error);
        }
    };

    const modificarMateria = (materia) => {
        navigate(`/editarMateria/${materia.clave_m}`);
    };

    return (
        <div className="admin-page">

            {/* ENCABEZADO */}
            <div className="page-header">

                <div>
                    <h1>Administrar Materias</h1>

                    <p>
                        Consulta y administra las materias
                        disponibles en el sistema.
                    </p>
                </div>

                <Link
                    to="/index"
                    className="back-button"
                >
                    ← Volver al inicio
                </Link>

            </div>


            {/* LISTA DE MATERIAS */}
            <section className="content-card">

                <div className="content-card-header">

                    <div>
                        <h2>Lista de materias</h2>

                        <span>
                            {materias.length} materia(s)
                            registrada(s)
                        </span>
                    </div>

                </div>


                <div className="table-wrapper">

                    <table className="management-table">

                        <thead>
                            <tr>
                                <th>Clave</th>
                                <th>Materia</th>
                                <th>Coordinación</th>
                                <th>Carrera</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>


                        <tbody>

                            {materias.length > 0 ? (

                                materias.map((materia) => (

                                    <tr
                                        key={materia.clave_m}
                                    >

                                        <td>
                                            {materia.clave_m}
                                        </td>

                                        <td>
                                            <strong>
                                                {materia.nombre_m}
                                            </strong>
                                        </td>

                                        <td>
                                            {materia.coordinacion || "—"}
                                        </td>

                                        <td>
                                            {materia.carrera?.nombre_c || "—"}
                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        modificarMateria(
                                                            materia
                                                        )
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        borrarMateria(
                                                            materia.clave_m
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
                                        No hay materias registradas.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </section>


            {/* FORMULARIO */}
            <section className="content-card form-card">

                <div className="content-card-header">

                    <div>
                        <h2>Agregar materia</h2>

                        <span>
                            Registra una nueva materia
                            académica.
                        </span>
                    </div>

                </div>


                <form
                    onSubmit={agregarMateria}
                    className="management-form"
                >

                    {/* CARRERA */}
                    <div className="form-field">

                        <label htmlFor="carrera">
                            Carrera
                        </label>

                        <select
                            id="carrera"
                            value={carrera}
                            onChange={(e) =>
                                setCarrera(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Selecciona una carrera
                            </option>

                            {carreras.map((carrera) => (

                                <option
                                    key={carrera.clave_c}
                                    value={carrera.clave_c}
                                >
                                    {carrera.nombre_c}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* NOMBRE */}
                    <div className="form-field">

                        <label htmlFor="nombre">
                            Nombre de la materia
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ej. Programación Web"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* COORDINACIÓN */}
                    <div className="form-field">

                        <label htmlFor="coordinacion">
                            Coordinación
                        </label>

                        <input
                            id="coordinacion"
                            type="text"
                            placeholder="Ej. Desarrollo de Software"
                            value={coordinacion}
                            onChange={(e) =>
                                setCoordinacion(e.target.value)
                            }
                        />

                    </div>


                    {/* BOTÓN */}
                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            + Agregar materia
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}

export default Materias;