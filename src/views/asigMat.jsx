import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    obtenerAsignaciones,
    registrarAsignacion,
    eliminarAsignacion
} from "../services/asigService";

import { obtenerProfesores } from "../services/profesorService";
import { obtenerMaterias } from "../services/materiaService";
import { obtenerGrupos } from "../services/grupoService";

function AsignacionMateria() {

    const navigate = useNavigate();

    const [asignaciones, setAsignaciones] = useState([]);

    const [profesores, setProfesores] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [grupos, setGrupos] = useState([]);

    const [clave_p, setClaveP] = useState("");
    const [clave_m, setClaveM] = useState("");
    const [clave_g, setClaveG] = useState("");

    useEffect(() => {
        cargarAsignaciones();
        cargarProfesores();
        cargarMaterias();
        cargarGrupos();
    }, []);

    const cargarAsignaciones = async () => {
        try {
            const datos = await obtenerAsignaciones();
            setAsignaciones(datos);
        } catch (error) {
            console.error("Error al cargar asignaciones:", error);
        }
    };

    const cargarProfesores = async () => {
        try {
            const datos = await obtenerProfesores();
            setProfesores(datos);
        } catch (error) {
            console.error("Error al cargar profesores:", error);
        }
    };

    const cargarMaterias = async () => {
        try {
            const datos = await obtenerMaterias();
            setMaterias(datos);
        } catch (error) {
            console.error("Error al cargar materias:", error);
        }
    };

    const cargarGrupos = async () => {
        try {
            const datos = await obtenerGrupos();
            setGrupos(datos);
        } catch (error) {
            console.error("Error al cargar grupos:", error);
        }
    };

    const agregarAsignacion = async (e) => {
        e.preventDefault();

        try {

            await registrarAsignacion({
                clave_p,
                clave_m,
                clave_g
            });

            setClaveP("");
            setClaveM("");
            setClaveG("");

            cargarAsignaciones();

        } catch (error) {
            console.error(
                "Error al registrar la asignación:",
                error
            );
        }
    };

    const borrarAsignacion = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar esta asignación?"
        );

        if (!confirmar) return;

        try {

            await eliminarAsignacion(id);
            cargarAsignaciones();

        } catch (error) {
            console.error(
                "Error al eliminar la asignación:",
                error
            );
        }
    };

    const modificarAsignacion = (asignacion) => {
        navigate(
            `/editarAsignacion/${asignacion.clave_asig}`
        );
    };

    return (

        <div className="admin-page">

            {/* =========================================
                ENCABEZADO
            ========================================= */}

            <div className="page-header">

                <div>

                    <h1>Administrar Asignaciones</h1>

                    <p>
                        Consulta y administra las materias
                        asignadas a profesores y grupos.
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
                LISTA DE ASIGNACIONES
            ========================================= */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Lista de asignaciones</h2>

                        <span>
                            {asignaciones.length} asignación(es)
                            registrada(s)
                        </span>

                    </div>

                </div>


                <div className="table-wrapper">

                    <table className="management-table">

                        <thead>

                            <tr>

                                <th>Profesor</th>
                                <th>Materia</th>
                                <th>Grupo</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {asignaciones.length > 0 ? (

                                asignaciones.map((asignacion) => (

                                    <tr
                                        key={asignacion.clave_asig}
                                    >

                                        <td>

                                            <strong>
                                                {asignacion.profesor?.usuario?.nombre}{" "}
                                                {asignacion.profesor?.usuario?.apellidoP}
                                            </strong>

                                        </td>


                                        <td>

                                            {asignacion.materia?.nombre_m || "—"}

                                        </td>


                                        <td>

                                            {asignacion.grupo
                                                ? `${asignacion.grupo.grado}${asignacion.grupo.letra}`
                                                : "—"
                                            }

                                        </td>


                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        modificarAsignacion(
                                                            asignacion
                                                        )
                                                    }
                                                >
                                                    Editar
                                                </button>


                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        borrarAsignacion(
                                                            asignacion.clave_asig
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
                                        No hay asignaciones
                                        registradas.
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

                        <h2>Nueva asignación</h2>

                        <span>
                            Asigna una materia a un profesor
                            y grupo.
                        </span>

                    </div>

                </div>


                <form
                    onSubmit={agregarAsignacion}
                    className="management-form"
                >

                    {/* PROFESOR */}

                    <div className="form-field">

                        <label htmlFor="profesor">
                            Profesor
                        </label>

                        <select
                            id="profesor"
                            value={clave_p}
                            onChange={(e) =>
                                setClaveP(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Seleccione un profesor
                            </option>

                            {profesores.map((profesor) => (

                                <option
                                    key={profesor.clave_p}
                                    value={profesor.clave_p}
                                >

                                    {profesor.usuario?.nombre}{" "}
                                    {profesor.usuario?.apellidoP}

                                </option>

                            ))}

                        </select>

                    </div>


                    {/* MATERIA */}

                    <div className="form-field">

                        <label htmlFor="materia">
                            Materia
                        </label>

                        <select
                            id="materia"
                            value={clave_m}
                            onChange={(e) =>
                                setClaveM(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Seleccione una materia
                            </option>

                            {materias.map((materia) => (

                                <option
                                    key={materia.clave_m}
                                    value={materia.clave_m}
                                >

                                    {materia.nombre_m}

                                </option>

                            ))}

                        </select>

                    </div>


                    {/* GRUPO */}

                    <div className="form-field">

                        <label htmlFor="grupo">
                            Grupo
                        </label>

                        <select
                            id="grupo"
                            value={clave_g}
                            onChange={(e) =>
                                setClaveG(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Seleccione un grupo
                            </option>

                            {grupos.map((grupo) => (

                                <option
                                    key={grupo.clave_g}
                                    value={grupo.clave_g}
                                >

                                    {grupo.grado}{grupo.letra}

                                </option>

                            ))}

                        </select>

                    </div>


                    {/* BOTÓN */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            + Registrar asignación
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}

export default AsignacionMateria;