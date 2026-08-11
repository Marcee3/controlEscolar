import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    obtenerCalificaciones,
    registrarCalificacion,
    eliminarCalificacion
} from "../services/calificacionService";

import { obtenerAlumnos } from "../services/alumnoService";
import { obtenerAsignaciones } from "../services/asigService";


function Calificaciones() {

    const navigate = useNavigate();

    const [calificaciones, setCalificaciones] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);

    const [clave_a, setClaveA] = useState("");
    const [clave_asig, setClaveAsig] = useState("");

    const [parcial_1, setParcial1] = useState("");
    const [parcial_2, setParcial2] = useState("");
    const [parcial_3, setParcial3] = useState("");


    useEffect(() => {

        cargarCalificaciones();
        cargarAlumnos();
        cargarAsignaciones();

    }, []);


    const cargarCalificaciones = async () => {

        try {

            const datos = await obtenerCalificaciones();
            setCalificaciones(datos);

        } catch (error) {

            console.error(
                "Error al cargar calificaciones:",
                error
            );

        }

    };


    const cargarAlumnos = async () => {

        try {

            const datos = await obtenerAlumnos();
            setAlumnos(datos);

        } catch (error) {

            console.error(
                "Error al cargar alumnos:",
                error
            );

        }

    };


    const cargarAsignaciones = async () => {

        try {

            const datos = await obtenerAsignaciones();
            setAsignaciones(datos);

        } catch (error) {

            console.error(
                "Error al cargar asignaciones:",
                error
            );

        }

    };


    /* =========================================
       CALCULAR PROMEDIO
    ========================================= */

    const calcularPromedio = () => {

        if (
            parcial_1 === "" ||
            parcial_2 === "" ||
            parcial_3 === ""
        ) {

            return "—";

        }


        return (

            (
                (
                    Number(parcial_1) +
                    Number(parcial_2) +
                    Number(parcial_3)
                ) / 3
            ).toFixed(2)

        );

    };


    /* =========================================
       REGISTRAR CALIFICACIÓN
    ========================================= */

    const agregarCalificacion = async (e) => {

        e.preventDefault();

        try {

            await registrarCalificacion({

                clave_a,
                clave_asig,

                parcial_1,
                parcial_2,
                parcial_3,

                promedio_final: calcularPromedio()

            });


            setClaveA("");
            setClaveAsig("");
            setParcial1("");
            setParcial2("");
            setParcial3("");

            cargarCalificaciones();

        } catch (error) {

            console.error(
                "Error al registrar calificación:",
                error
            );

        }

    };


    /* =========================================
       ELIMINAR CALIFICACIÓN
    ========================================= */

    const borrarCalificacion = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar esta calificación?"
        );

        if (!confirmar) return;


        try {

            await eliminarCalificacion(id);

            cargarCalificaciones();

        } catch (error) {

            console.error(
                "Error al eliminar calificación:",
                error
            );

        }

    };


    /* =========================================
       EDITAR CALIFICACIÓN
    ========================================= */

    const modificarCalificacion = (calificacion) => {

        navigate(
            `/editarCalificacion/${calificacion.clave_cf}`
        );

    };


    return (

        <div className="admin-page">

            {/* =========================================
                ENCABEZADO
            ========================================= */}

            <div className="page-header">

                <div>

                    <h1>Administrar Calificaciones</h1>

                    <p>
                        Consulta y administra las
                        calificaciones de los alumnos.
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
                LISTA DE CALIFICACIONES
            ========================================= */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Lista de calificaciones</h2>

                        <span>
                            {calificaciones.length} calificación(es)
                            registrada(s)
                        </span>

                    </div>

                </div>


                <div className="table-wrapper">

                    <table className="management-table">

                        <thead>

                            <tr>

                                <th>Alumno</th>
                                <th>Materia</th>
                                <th>P1</th>
                                <th>P2</th>
                                <th>P3</th>
                                <th>Promedio</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {calificaciones.length > 0 ? (

                                calificaciones.map(
                                    (calificacion) => (

                                        <tr
                                            key={
                                                calificacion.clave_cf
                                            }
                                        >

                                            {/* ALUMNO */}

                                            <td>

                                                <strong>

                                                    {
                                                        calificacion
                                                            .alumno
                                                            ?.usuario
                                                            ?.nombre
                                                    }{" "}

                                                    {
                                                        calificacion
                                                            .alumno
                                                            ?.usuario
                                                            ?.apellidoP
                                                    }

                                                </strong>

                                            </td>


                                            {/* MATERIA */}

                                            <td>

                                                {
                                                    calificacion
                                                        .asignacion
                                                        ?.materia
                                                        ?.nombre_m
                                                }

                                            </td>


                                            {/* PARCIALES */}

                                            <td>
                                                {
                                                    calificacion
                                                        .parcial_1
                                                }
                                            </td>


                                            <td>
                                                {
                                                    calificacion
                                                        .parcial_2
                                                }
                                            </td>


                                            <td>
                                                {
                                                    calificacion
                                                        .parcial_3
                                                }
                                            </td>


                                            {/* PROMEDIO */}

                                            <td>

                                                <span className="grade-average">

                                                    {
                                                        calificacion
                                                            .promedio_final
                                                    }

                                                </span>

                                            </td>


                                            {/* ACCIONES */}

                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            modificarCalificacion(
                                                                calificacion
                                                            )
                                                        }
                                                    >
                                                        Editar
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            borrarCalificacion(
                                                                calificacion
                                                                    .clave_cf
                                                            )
                                                        }
                                                    >
                                                        Eliminar
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="empty-state"
                                    >
                                        No hay calificaciones
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

                        <h2>Registrar calificación</h2>

                        <span>
                            Registra las calificaciones
                            parciales de un alumno.
                        </span>

                    </div>

                </div>


                <form
                    onSubmit={agregarCalificacion}
                    className="management-form"
                >

                    {/* ALUMNO */}

                    <div className="form-field">

                        <label htmlFor="alumno">
                            Alumno
                        </label>

                        <select
                            id="alumno"
                            value={clave_a}
                            onChange={(e) =>
                                setClaveA(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Seleccione un alumno
                            </option>


                            {alumnos.map((alumno) => (

                                <option
                                    key={alumno.clave_a}
                                    value={alumno.clave_a}
                                >

                                    {
                                        alumno.usuario?.nombre
                                    }{" "}

                                    {
                                        alumno.usuario?.apellidoP
                                    }

                                </option>

                            ))}

                        </select>

                    </div>


                    {/* ASIGNACIÓN */}

                    <div className="form-field">

                        <label htmlFor="asignacion">
                            Materia y grupo
                        </label>

                        <select
                            id="asignacion"
                            value={clave_asig}
                            onChange={(e) =>
                                setClaveAsig(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Seleccione una materia
                            </option>


                            {asignaciones.map((asig) => (

                                <option
                                    key={asig.clave_asig}
                                    value={asig.clave_asig}
                                >

                                    {asig.materia?.nombre_m}
                                    {" - "}
                                    Grupo:{" "}
                                    {asig.grupo?.grado}
                                    {asig.grupo?.letra}

                                </option>

                            ))}

                        </select>

                    </div>


                    {/* PARCIAL 1 */}

                    <div className="form-field">

                        <label htmlFor="parcial_1">
                            Parcial 1
                        </label>

                        <input
                            id="parcial_1"
                            type="number"
                            min="0"
                            max="10"
                            step="0.01"
                            placeholder="0 - 10"
                            value={parcial_1}
                            onChange={(e) =>
                                setParcial1(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* PARCIAL 2 */}

                    <div className="form-field">

                        <label htmlFor="parcial_2">
                            Parcial 2
                        </label>

                        <input
                            id="parcial_2"
                            type="number"
                            min="0"
                            max="10"
                            step="0.01"
                            placeholder="0 - 10"
                            value={parcial_2}
                            onChange={(e) =>
                                setParcial2(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* PARCIAL 3 */}

                    <div className="form-field">

                        <label htmlFor="parcial_3">
                            Parcial 3
                        </label>

                        <input
                            id="parcial_3"
                            type="number"
                            min="0"
                            max="10"
                            step="0.01"
                            placeholder="0 - 10"
                            value={parcial_3}
                            onChange={(e) =>
                                setParcial3(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* PROMEDIO */}

                    <div className="average-preview">

                        <span>
                            Promedio final
                        </span>

                        <strong>
                            {calcularPromedio()}
                        </strong>

                    </div>


                    {/* BOTÓN */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            + Registrar calificación
                        </button>

                    </div>

                </form>

            </section>

        </div>

    );

}
export default Calificaciones;