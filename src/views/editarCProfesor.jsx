import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
    obtenerCalificacionPorId,
    editarCalificacion
} from "../services/calificacionService";

import { obtenerAlumnos } from "../services/alumnoService";
import { obtenerAsignaciones } from "../services/asigService";

function EditarCalificacionProfesor() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [alumnos, setAlumnos] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);

    const [calificacion, setCalificacion] = useState({
        clave_a: "",
        clave_asig: "",
        parcial_1: "",
        parcial_2: "",
        parcial_3: "",
        promedio_final: ""
    });


    useEffect(() => {
        cargarCalificacion();
        cargarAlumnos();
        cargarAsignaciones();
    }, [id]);


    const cargarCalificacion = async () => {

        try {

            const datos = await obtenerCalificacionPorId(id);

            setCalificacion({
                clave_a: datos.clave_a,
                clave_asig: datos.clave_asig,
                parcial_1: datos.parcial_1,
                parcial_2: datos.parcial_2,
                parcial_3: datos.parcial_3,
                promedio_final: datos.promedio_final
            });

        } catch (error) {

            console.error(
                "Error al cargar la calificación:",
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


    const handleChange = (e) => {

        const { name, value } = e.target;

        setCalificacion(prev => ({
            ...prev,
            [name]: value
        }));

    };


    const calcularPromedio = () => {

        if (
            calificacion.parcial_1 === "" ||
            calificacion.parcial_2 === "" ||
            calificacion.parcial_3 === ""
        ) {
            return "";
        }

        const p1 = Number(calificacion.parcial_1);
        const p2 = Number(calificacion.parcial_2);
        const p3 = Number(calificacion.parcial_3);

        return ((p1 + p2 + p3) / 3).toFixed(2);

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await editarCalificacion(
                id,
                {
                    clave_a: calificacion.clave_a,
                    clave_asig: calificacion.clave_asig,
                    parcial_1: calificacion.parcial_1,
                    parcial_2: calificacion.parcial_2,
                    parcial_3: calificacion.parcial_3,
                }
            );

            navigate("/calificaciones-profesor");

        } catch (error) {

            console.error(
                "Error al editar la calificación:",
                error
            );

        }

    };


    const alumnoActual = alumnos.find(
        alumno => alumno.clave_a == calificacion.clave_a
    );


    const asignacionActual = asignaciones.find(
        asignacion => asignacion.clave_asig == calificacion.clave_asig
    );


    return (

        <div className="admin-page">

            {/* ENCABEZADO */}

            <div className="page-header">

                <div>

                    <h1>Editar Calificación</h1>

                    <p>
                        Modifica las calificaciones parciales
                        del alumno seleccionado.
                    </p>

                </div>

                <Link
                    to="/calificaciones-profesor"
                    className="back-button"
                >
                    ← Volver a calificaciones
                </Link>

            </div>


            {/* FORMULARIO */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Información de la calificación</h2>

                        <span>
                            Actualiza los parciales y guarda
                            los cambios realizados.
                        </span>

                    </div>

                </div>


                <form
                    className="admin-form"
                    onSubmit={handleSubmit}
                >

                    {/* ALUMNO */}

                    <div className="form-group">

                        <label>Alumno</label>

                        <input
                            type="text"
                            disabled
                            value={
                                alumnoActual
                                    ? `${alumnoActual.usuario?.nombre ?? ""} ${alumnoActual.usuario?.apellidoP ?? ""}`
                                    : "Cargando..."
                            }
                        />

                    </div>


                    {/* ASIGNACIÓN */}

                    <div className="form-group">

                        <label>Materia y grupo</label>

                        <input
                            type="text"
                            disabled
                            value={
                                asignacionActual
                                    ? `${asignacionActual.materia?.nombre_m ?? ""} - Grupo: ${asignacionActual.grupo?.grado ?? ""}${asignacionActual.grupo?.letra ?? ""}`
                                    : "Cargando..."
                            }
                        />

                    </div>


                    {/* PARCIALES */}

                    <div className="form-grid">

                        <div className="form-group">

                            <label>Parcial 1</label>

                            <input
                                type="number"
                                name="parcial_1"
                                min="0"
                                max="10"
                                step="0.01"
                                value={calificacion.parcial_1}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Parcial 2</label>

                            <input
                                type="number"
                                name="parcial_2"
                                min="0"
                                max="10"
                                step="0.01"
                                value={calificacion.parcial_2}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>Parcial 3</label>

                            <input
                                type="number"
                                name="parcial_3"
                                min="0"
                                max="10"
                                step="0.01"
                                value={calificacion.parcial_3}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    {/* PROMEDIO */}

                    <div className="average-box">

                        <span>Promedio final</span>

                        <strong>
                            {calcularPromedio() || "--"}
                        </strong>

                    </div>


                    {/* BOTONES */}

                    <div className="form-actions">

                        <Link
                            to="/calificaciones-profesor"
                            className="cancel-button"
                        >
                            Cancelar
                        </Link>

                        <button type="submit">
                            Guardar cambios
                        </button>

                    </div>

                </form>

            </section>

        </div>

    );

}
export default EditarCalificacionProfesor;