import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { obtenerHistorial } from "../services/historialService";
import { cerrarSesion } from "../services/usuarioService";

function Historial() {
    const navigate = useNavigate();

    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        cargarHistorial();
    }, []);

    const cargarHistorial = async () => {

        const datos = await obtenerHistorial();

        setHistorial(datos);

    };

    const logout = async () => {
        try {
            await cerrarSesion();
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (

        <div className="admin-page">

            {/* ENCABEZADO */}

            <div className="page-header">

                <div>

                    <h1>Historial Académico</h1>

                    <p>
                        Consulta el historial académico y las
                        calificaciones registradas.
                    </p>

                    <button
                    className="logout-button"
                    onClick={logout}
                >
                    <span className="logout-icon">🚪</span>
                    <span className="logout-text">
                        Cerrar sesión
                    </span>
                </button>

                </div>
            </div>


            {/* HISTORIAL */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Calificaciones</h2>

                        <span>
                            {historial.length} registro(s)
                            encontrado(s)
                        </span>

                    </div>

                </div>


                <table>

                    <thead>

                        <tr>

                            <th>Materia</th>

                            <th>Grupo</th>

                            <th>Parcial 1</th>

                            <th>Parcial 2</th>

                            <th>Parcial 3</th>

                            <th>Promedio</th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            historial.length > 0 ? (

                                historial.map((calificacion) => (

                                    <tr key={calificacion.clave_cf}>

                                        <td>
                                            {
                                                calificacion.asignacion
                                                    ?.materia
                                                    ?.nombre_m
                                            }
                                        </td>


                                        <td>

                                            {
                                                calificacion.asignacion
                                                    ?.grupo
                                                    ?.grado
                                            }

                                            {
                                                calificacion.asignacion
                                                    ?.grupo
                                                    ?.letra
                                            }

                                        </td>


                                        <td>
                                            {calificacion.parcial_1}
                                        </td>


                                        <td>
                                            {calificacion.parcial_2}
                                        </td>


                                        <td>
                                            {calificacion.parcial_3}
                                        </td>


                                        <td>
                                            {calificacion.promedio_final}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="6">
                                        No hay calificaciones registradas.
                                    </td>

                                </tr>

                            )
                        }

                    </tbody>

                </table>

            </section>

        </div>

    );

}

export default Historial;
