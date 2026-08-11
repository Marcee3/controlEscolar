import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    obtenerCarreras,
    crearCarrera,
    eliminarCarrera
} from "../services/carreraService";

function Carreras() {
    const navigate = useNavigate();

    const [carreras, setCarreras] = useState([]);
    const [nombre, setNombre] = useState("");
    const [duracion, setDuracion] = useState("");

    useEffect(() => {
        cargarCarreras();
    }, []);

    const cargarCarreras = async () => {
        const datos = await obtenerCarreras();
        setCarreras(datos);
    };

    const agregarCarrera = async (e) => {
        e.preventDefault();

        await crearCarrera({
            nombre_c: nombre,
            duracion: duracion
        });

        setNombre("");
        setDuracion("");

        cargarCarreras();
    };

    const borrarCarrera = async (id) => {
        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar esta carrera?"
        );

        if (!confirmar) return;

        await eliminarCarrera(id);
        cargarCarreras();
    };

    const modificarCarrera = (carrera) => {
        navigate(`/editarCarrera/${carrera.clave_c}`);
    };

    return (
        <div className="admin-page">

            {/* ENCABEZADO */}
            <div className="page-header">

                <div>
                    <h1>Administrar Carreras</h1>
                    <p>
                        Consulta y administra las carreras disponibles
                        en el sistema.
                    </p>
                </div>

                <Link to="/index" className="back-button">
                    ← Volver al inicio
                </Link>

            </div>


            {/* TABLA */}
            <section className="content-card">

                <div className="content-card-header">

                    <div>
                        <h2>Lista de carreras</h2>
                        <span>
                            {carreras.length} carrera(s) registrada(s)
                        </span>
                    </div>

                </div>

                <div className="table-wrapper">

                    <table className="management-table">

                        <thead>
                            <tr>
                                <th>Clave</th>
                                <th>Nombre</th>
                                <th>Duración</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {carreras.length > 0 ? (

                                carreras.map((carrera) => (

                                    <tr key={carrera.clave_c}>

                                        <td>
                                            {carrera.clave_c}
                                        </td>

                                        <td>
                                            <strong>
                                                {carrera.nombre_c}
                                            </strong>
                                        </td>

                                        <td>
                                            {carrera.duracion} años
                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        modificarCarrera(carrera)
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        borrarCarrera(
                                                            carrera.clave_c
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
                                        colSpan="4"
                                        className="empty-state"
                                    >
                                        No hay carreras registradas.
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
                        <h2>Agregar carrera</h2>
                        <span>
                            Registra una nueva carrera académica
                        </span>
                    </div>

                </div>


                <form
                    onSubmit={agregarCarrera}
                    className="management-form"
                >

                    <div className="form-field">

                        <label htmlFor="nombre">
                            Nombre de la carrera
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ej. Ingeniería en Software"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-field">

                        <label htmlFor="duracion">
                            Duración
                        </label>

                        <div className="input-with-suffix">

                            <input
                                id="duracion"
                                type="number"
                                min="1"
                                placeholder="Ej. 4"
                                value={duracion}
                                onChange={(e) =>
                                    setDuracion(e.target.value)
                                }
                                required
                            />

                            <span>años</span>

                        </div>

                    </div>


                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            + Agregar carrera
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}

export default Carreras;