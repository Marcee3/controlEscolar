import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    obtenerPeriodos,
    crearPeriodo,
    eliminarPeriodo
} from "../services/peService";

function Periodos() {

    const navigate = useNavigate();

    const [periodos, setPeriodos] = useState([]);

    const [nombre, setNombre] = useState("");
    const [fechaI, setFechaI] = useState("");
    const [fechaF, setFechaF] = useState("");

    useEffect(() => {
        cargarPeriodos();
    }, []);

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

    const agregarPeriodo = async (e) => {

        e.preventDefault();

        try {

            await crearPeriodo({
                nombre_periodo: nombre,
                fecha_inicio: fechaI,
                fecha_fin: fechaF
            });

            setNombre("");
            setFechaI("");
            setFechaF("");

            cargarPeriodos();

        } catch (error) {

            console.error(
                "Error al crear periodo:",
                error
            );

        }
    };

    const borrarPeriodo = async (id) => {

        const confirmar = window.confirm(
            "¿Está seguro de eliminar este periodo escolar?"
        );

        if (!confirmar) return;

        try {

            await eliminarPeriodo(id);
            cargarPeriodos();

        } catch (error) {

            console.error(
                "Error al eliminar periodo:",
                error
            );

        }
    };

    const modificarPeriodo = (periodo) => {

        navigate(
            `/editarPeriodo/${periodo.clave_pe}`
        );

    };

    return (

        <div className="admin-page">

            {/* =========================================
                ENCABEZADO
            ========================================= */}

            <div className="page-header">

                <div>

                    <h1>Administrar Períodos Escolares</h1>

                    <p>
                        Consulta y administra los períodos
                        escolares registrados en el sistema.
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
                LISTA DE PERIODOS
            ========================================= */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Lista de períodos escolares</h2>

                        <span>
                            {periodos.length} período(s)
                            registrado(s)
                        </span>

                    </div>

                </div>


                <div className="table-wrapper">

                    <table className="management-table">

                        <thead>

                            <tr>

                                <th>Clave</th>
                                <th>Nombre del período</th>
                                <th>Fecha de inicio</th>
                                <th>Fecha de fin</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {periodos.length > 0 ? (

                                periodos.map((periodo) => (

                                    <tr
                                        key={periodo.clave_pe}
                                    >

                                        <td>
                                            {periodo.clave_pe}
                                        </td>


                                        <td>

                                            <strong>
                                                {periodo.nombre_periodo}
                                            </strong>

                                        </td>


                                        <td>
                                            {periodo.fecha_inicio}
                                        </td>


                                        <td>
                                            {periodo.fecha_fin}
                                        </td>


                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        modificarPeriodo(
                                                            periodo
                                                        )
                                                    }
                                                >
                                                    Editar
                                                </button>


                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        borrarPeriodo(
                                                            periodo.clave_pe
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
                                        No hay períodos escolares
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

                        <h2>Agregar período escolar</h2>

                        <span>
                            Registra un nuevo período escolar
                            en el sistema.
                        </span>

                    </div>

                </div>


                <form
                    onSubmit={agregarPeriodo}
                    className="management-form"
                >

                    {/* NOMBRE */}

                    <div className="form-field">

                        <label htmlFor="nombre_periodo">
                            Nombre del período
                        </label>

                        <input
                            id="nombre_periodo"
                            type="text"
                            placeholder="Ej. Enero - Abril 2026"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* FECHA DE INICIO */}

                    <div className="form-field">

                        <label htmlFor="fecha_inicio">
                            Fecha de inicio
                        </label>

                        <input
                            id="fecha_inicio"
                            type="date"
                            value={fechaI}
                            onChange={(e) =>
                                setFechaI(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* FECHA DE FIN */}

                    <div className="form-field">

                        <label htmlFor="fecha_fin">
                            Fecha de fin
                        </label>

                        <input
                            id="fecha_fin"
                            type="date"
                            value={fechaF}
                            onChange={(e) =>
                                setFechaF(e.target.value)
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
                            + Agregar período
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}

export default Periodos;