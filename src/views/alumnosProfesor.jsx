import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { obtenerAlumnos } from "../services/alumnoService";

function AlumnosProfesor() {

    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        cargarAlumnos();
    }, []);

    const cargarAlumnos = async () => {

        try {

            const datos = await obtenerAlumnos();

            setAlumnos(datos);

        } catch (error) {

            console.error(
                "Error al cargar los alumnos:",
                error
            );

        }

    };


    return (

        <div className="admin-page">

            <h1>Consulta de Alumnos</h1>

            <p>
                Consulta la información académica básica de los alumnos.
            </p>


            <table>

                <thead>

                    <tr>

                        <th>Clave</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Matrícula</th>
                        <th>Carrera</th>
                        <th>Grupo</th>

                    </tr>

                </thead>


                <tbody>

                    {
                        alumnos.map((alumno) => (

                            <tr key={alumno.clave_a}>

                                <td>
                                    {alumno.clave_a}
                                </td>

                                <td>
                                    {alumno.usuario?.nombre}{" "}
                                    {alumno.usuario?.apellidoP}{" "}
                                    {alumno.usuario?.apellidoM}
                                </td>

                                <td>
                                    {alumno.usuario?.correo}
                                </td>

                                <td>
                                    {alumno.matricula}
                                </td>

                                <td>
                                    {alumno.carrera?.nombre_c}
                                </td>

                                <td>
                                    {alumno.grupo?.grado}
                                    {alumno.grupo?.letra}
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>


            <br />

            <Link to="/dashboardProfesor">
                Volver al panel del profesor
            </Link>

        </div>

    );

}

export default AlumnosProfesor;