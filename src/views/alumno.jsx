import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    obtenerAlumnos,
    registrarAlumno,
    eliminarAlumno
} from "../services/alumnoService";

import { obtenerUsuarios } from "../services/usuarioService";
import { obtenerCarreras } from "../services/carreraService";
import { obtenerGrupos } from "../services/grupoService";

function Alumno() {

    const navigate = useNavigate();

    const [alumnos, setAlumnos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [grupos, setGrupos] = useState([]);

    const [clave_u, setClaveU] = useState("");
    const [clave_c, setClaveC] = useState("");
    const [clave_g, setClaveG] = useState("");
    const [matricula, setMatricula] = useState("");
    const [fecha_ingreso, setFechaIngreso] = useState("");

    /* Filtros para alumnos */
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroMatricula, setFiltroMatricula] = useState("");
    const [filtroCarrera, setFiltroCarrera] = useState("");
    const [filtroGrupo, setFiltroGrupo] = useState("");

    useEffect(() => {
        cargarAlumnos();
        cargarUsuarios();
        cargarCarreras();
        cargarGrupos();
    }, []);

    const cargarAlumnos = async () => {
        try {
            const datos = await obtenerAlumnos();
            setAlumnos(datos);
        } catch (error) {
            console.error("Error al cargar alumnos:", error);
        }
    };

    const cargarUsuarios = async () => {
        try {
            const datos = await obtenerUsuarios();

            setUsuarios(
                datos.filter(usuario => usuario.rol === "Alumno")
            );
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
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

    const cargarGrupos = async () => {
        try {
            const datos = await obtenerGrupos();
            setGrupos(datos);
        } catch (error) {
            console.error("Error al cargar grupos:", error);
        }
    };

    const crearAlumno = async (e) => {
        e.preventDefault();

        try {

            await registrarAlumno({
                clave_u,
                clave_c,
                clave_g,
                matricula,
                fecha_ingreso
            });

            setClaveU("");
            setClaveC("");
            setClaveG("");
            setMatricula("");
            setFechaIngreso("");

            cargarAlumnos();

        } catch (error) {
            console.error("Error al registrar alumno:", error);
        }
    };

    const borrarAlumno = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar este alumno?"
        );

        if (!confirmar) return;

        try {

            await eliminarAlumno(id);
            cargarAlumnos();

        } catch (error) {
            console.error("Error al eliminar alumno:", error);
        }
    };

    const modificarAlumno = (alumno) => {
        navigate(`/editarAlumno/${alumno.clave_a}`);
    };

    const alumnosFiltrados = alumnos.filter((alumno) => {

    const nombreCompleto = `
        ${alumno.usuario?.nombre || ""}
        ${alumno.usuario?.apellidop || ""}
        ${alumno.usuario?.apellidom || ""}
    `.toLowerCase();

    const nombreCoincide =
        nombreCompleto.includes(filtroNombre.toLowerCase());

    const matriculaCoincide =
        (alumno.matricula || "")
            .toLowerCase()
            .includes(filtroMatricula.toLowerCase());

    const carreraCoincide =
        filtroCarrera === "" ||
        String(alumno.clave_c) === String(filtroCarrera);

    const grupoCoincide =
        filtroGrupo === "" ||
        String(alumno.clave_g) === String(filtroGrupo);

    return (
        nombreCoincide &&
        matriculaCoincide &&
        carreraCoincide &&
        grupoCoincide
    );
});

    return (

        <div className="admin-page">

            {/* =========================================
                ENCABEZADO
            ========================================= */}

            <div className="page-header">

                <div>

                    <h1>Administrar Alumnos</h1>

                    <p>
                        Consulta y administra los alumnos
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
                LISTA DE ALUMNOS
            ========================================= */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Lista de alumnos</h2>

                        <span>
                            {alumnos.length} alumno(s)
                            registrado(s)
                        </span>
                        <span>
                            Mostrando {alumnosFiltrados.length} de {alumnos.length} alumno(s)
                        </span>
                    </div>

                </div>

                <div className="filters-container">
                    <div className="filter-field">
                        <label htmlFor="filtroNombre">
                            Nombre
                        </label>
                        <input
                            id="filtroNombre"
                            type="text"
                            placeholder="Buscar alumno..."
                            value={filtroNombre}
                            onChange={(e) =>
                                setFiltroNombre(e.target.value)
                            }
                        />
                    </div>


                    <div className="filter-field">

                        <label htmlFor="filtroMatricula">
                            Matrícula
                        </label>

                        <input
                            id="filtroMatricula"
                            type="text"
                            placeholder="Ej. 20260001"
                            value={filtroMatricula}
                            onChange={(e) =>
                                setFiltroMatricula(e.target.value)
                            }
                        />

                    </div>


                    <div className="filter-field">

                        <label htmlFor="filtroCarrera">
                            Carrera
                        </label>

                        <select
                            id="filtroCarrera"
                            value={filtroCarrera}
                            onChange={(e) =>
                                setFiltroCarrera(e.target.value)
                            }
                        >

                            <option value="">
                                Todas las carreras
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

                    <div className="filter-field">
                        <label htmlFor="filtroGrupo">
                            Grupo
                        </label>

                        <select
                            id="filtroGrupo"
                            value={filtroGrupo}
                            onChange={(e) =>
                                setFiltroGrupo(e.target.value)
                            }
                        >

                            <option value="">
                                Todos los grupos
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


                    <button
                        type="button"
                        className="clear-filters-button"
                        onClick={() => {
                            setFiltroNombre("");
                            setFiltroMatricula("");
                            setFiltroCarrera("");
                            setFiltroGrupo("");
                        }}
                    >
                        Limpiar filtros
                    </button>

                </div>

                <div className="table-wrapper">

                    <table className="management-table">

                        <thead>

                            <tr>

                                <th>Clave</th>
                                <th>Nombre</th>
                                <th>Matrícula</th>
                                <th>Carrera</th>
                                <th>Grupo</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {alumnos.length > 0 ? (

                                alumnosFiltrados.map((alumno) => (

                                    <tr
                                        key={alumno.clave_a}
                                    >

                                        <td>
                                            {alumno.clave_a}
                                        </td>


                                        <td>

                                            <strong>
                                                {alumno.usuario?.nombre}{" "}
                                                {alumno.usuario?.apellidoP}
                                            </strong>

                                        </td>


                                        <td>
                                            {alumno.matricula}
                                        </td>


                                        <td>
                                            {alumno.carrera?.nombre_c || "—"}
                                        </td>


                                        <td>

                                            {alumno.grupo
                                                ? `${alumno.grupo.grado}${alumno.grupo.letra}`
                                                : "—"
                                            }

                                        </td>


                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        modificarAlumno(alumno)
                                                    }
                                                >
                                                    Editar
                                                </button>


                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        borrarAlumno(
                                                            alumno.clave_a
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
                                        colSpan="6"
                                        className="empty-state"
                                    >
                                        No hay alumnos registrados.
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

                        <h2>Registrar alumno</h2>

                        <span>
                            Registra la información académica
                            de un nuevo alumno.
                        </span>

                    </div>

                </div>


                <form
                    onSubmit={crearAlumno}
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
                                Seleccione un alumno
                            </option>

                            {usuarios.map((usuario) => (

                                <option
                                    key={usuario.clave_u}
                                    value={usuario.clave_u}
                                >
                                    {usuario.nombre}{" "}
                                    {usuario.apellidoP}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* CARRERA */}

                    <div className="form-field">

                        <label htmlFor="carrera">
                            Carrera
                        </label>

                        <select
                            id="carrera"
                            value={clave_c}
                            onChange={(e) =>
                                setClaveC(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Seleccione una carrera
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


                    {/* MATRÍCULA */}

                    <div className="form-field">

                        <label htmlFor="matricula">
                            Matrícula
                        </label>

                        <input
                            id="matricula"
                            type="text"
                            placeholder="Ej. 20260001"
                            value={matricula}
                            onChange={(e) =>
                                setMatricula(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* FECHA DE INGRESO */}

                    <div className="form-field">

                        <label htmlFor="fecha_ingreso">
                            Fecha de ingreso
                        </label>

                        <input
                            id="fecha_ingreso"
                            type="date"
                            value={fecha_ingreso}
                            onChange={(e) =>
                                setFechaIngreso(e.target.value)
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
                            + Registrar alumno
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}

export default Alumno;