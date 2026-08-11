import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    obtenerGrupos,
    crearGrupo,
    eliminarGrupo
} from "../services/grupoService";

import { obtenerCarreras } from "../services/carreraService";
import { obtenerPeriodos } from "../services/peService";

function Grupo() {

    const navigate = useNavigate();

    const [grupos, setGrupos] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [periodos, setPeriodos] = useState([]);

    const [clave_c, setClaveC] = useState("");
    const [clave_pe, setClavePe] = useState("");
    const [grado, setGrado] = useState("");
    const [letra, setLetra] = useState("");

    useEffect(() => {
        cargarGrupos();
        cargarCarreras();
        cargarPeriodos();
    }, []);

    const cargarGrupos = async () => {

        try {

            const datos = await obtenerGrupos();
            setGrupos(datos);

        } catch (error) {

            console.error(
                "Error al cargar grupos:",
                error
            );

        }
    };

    const cargarCarreras = async () => {

        try {

            const datos = await obtenerCarreras();
            setCarreras(datos);

        } catch (error) {

            console.error(
                "Error al cargar carreras:",
                error
            );

        }
    };

    const cargarPeriodos = async () => {

        try {

            const datos = await obtenerPeriodos();
            setPeriodos(datos);

        } catch (error) {

            console.error(
                "Error al cargar periodos:",
                error
            );

        }
    };

    const agregarGrupo = async (e) => {

        e.preventDefault();

        try {

            await crearGrupo({
                clave_c,
                clave_pe,
                grado,
                letra
            });

            setClaveC("");
            setClavePe("");
            setGrado("");
            setLetra("");

            cargarGrupos();

        } catch (error) {

            console.error(
                "Error al registrar grupo:",
                error
            );

        }
    };

    const borrarGrupo = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar este grupo?"
        );

        if (!confirmar) return;

        try {

            await eliminarGrupo(id);
            cargarGrupos();

        } catch (error) {

            console.error(
                "Error al eliminar grupo:",
                error
            );

        }
    };

    const modificarGrupo = (grupo) => {

        navigate(
            `/editarGrupo/${grupo.clave_g}`
        );

    };

    return (

        <div className="admin-page">

            {/* =========================================
                ENCABEZADO
            ========================================= */}

            <div className="page-header">

                <div>

                    <h1>Administrar Grupos</h1>

                    <p>
                        Consulta y administra los grupos
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
                LISTA DE GRUPOS
            ========================================= */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Lista de grupos</h2>

                        <span>
                            {grupos.length} grupo(s)
                            registrado(s)
                        </span>

                    </div>

                </div>


                <div className="table-wrapper">

                    <table className="management-table">

                        <thead>

                            <tr>

                                <th>Clave</th>
                                <th>Carrera</th>
                                <th>Período</th>
                                <th>Grado</th>
                                <th>Letra</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {grupos.length > 0 ? (

                                grupos.map((grupo) => (

                                    <tr
                                        key={grupo.clave_g}
                                    >

                                        <td>
                                            {grupo.clave_g}
                                        </td>


                                        <td>
                                            {grupo.carrera?.nombre_c || "—"}
                                        </td>


                                        <td>
                                            {grupo.periodo_escolar?.nombre_periodo || "—"}
                                        </td>


                                        <td>
                                            {grupo.grado}
                                        </td>


                                        <td>

                                            <strong>
                                                {grupo.letra}
                                            </strong>

                                        </td>


                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        modificarGrupo(
                                                            grupo
                                                        )
                                                    }
                                                >
                                                    Editar
                                                </button>


                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        borrarGrupo(
                                                            grupo.clave_g
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
                                        No hay grupos registrados.
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

                        <h2>Agregar grupo</h2>

                        <span>
                            Registra un nuevo grupo y
                            asígnalo a una carrera y período.
                        </span>

                    </div>

                </div>


                <form
                    onSubmit={agregarGrupo}
                    className="management-form"
                >

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


                    {/* PERIODO */}

                    <div className="form-field">

                        <label htmlFor="periodo">
                            Período escolar
                        </label>

                        <select
                            id="periodo"
                            value={clave_pe}
                            onChange={(e) =>
                                setClavePe(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Seleccione un período
                            </option>

                            {periodos.map((periodo) => (

                                <option
                                    key={periodo.clave_pe}
                                    value={periodo.clave_pe}
                                >

                                    {periodo.nombre_periodo}

                                </option>

                            ))}

                        </select>

                    </div>


                    {/* GRADO */}

                    <div className="form-field">

                        <label htmlFor="grado">
                            Grado
                        </label>

                        <input
                            id="grado"
                            type="number"
                            min="1"
                            value={grado}
                            onChange={(e) =>
                                setGrado(e.target.value)
                            }
                            placeholder="Ej. 1"
                            required
                        />

                    </div>


                    {/* LETRA */}

                    <div className="form-field">

                        <label htmlFor="letra">
                            Letra
                        </label>

                        <input
                            id="letra"
                            type="text"
                            maxLength="1"
                            value={letra}
                            onChange={(e) =>
                                setLetra(
                                    e.target.value.toUpperCase()
                                )
                            }
                            placeholder="Ej. A"
                            required
                        />

                    </div>


                    {/* BOTÓN */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            + Agregar grupo
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}

export default Grupo;