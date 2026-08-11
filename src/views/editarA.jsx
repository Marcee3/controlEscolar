import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    obtenerAlumnoPorId,
    editarAlumno
} from "../services/alumnoService";

import { obtenerCarreras } from "../services/carreraService";
import { obtenerGrupos } from "../services/grupoService";


function EditarAlumno() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [carreras, setCarreras] = useState([]);
    const [grupos, setGrupos] = useState([]);

    const [alumno, setAlumno] = useState({

        clave_c: "",
        clave_g: "",
        matricula: "",
        fecha_ingreso: "",

        usuario: {
            nombre: "",
            apellidoP: "",
            apellidoM: "",
            correo: ""
        }

    });


    /* =========================================
       CARGAR INFORMACIÓN
    ========================================= */

    useEffect(() => {

        cargarAlumno();
        cargarCarreras();
        cargarGrupos();

    }, [id]);


    const cargarAlumno = async () => {

        try {

            const datos = await obtenerAlumnoPorId(id);

            setAlumno(datos);

        } catch (error) {

            console.error(
                "Error al cargar alumno:",
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


    /* =========================================
       CAMBIAR CAMPOS
    ========================================= */

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setAlumno(prev => ({

            ...prev,

            [name]: value

        }));

    };


    /* =========================================
       GUARDAR CAMBIOS
    ========================================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await editarAlumno(id, {

                clave_c: alumno.clave_c,
                clave_g: alumno.clave_g,
                matricula: alumno.matricula,
                fecha_ingreso: alumno.fecha_ingreso

            });


            navigate("/alumnos");

        } catch (error) {

            console.error(
                "Error al editar alumno:",
                error
            );

        }

    };


    return (

        <div className="admin-page">

            {/* =========================================
                ENCABEZADO
            ========================================= */}

            <div className="page-header">

                <div>

                    <h1>Editar Alumno</h1>

                    <p>
                        Modifica la información académica
                        del alumno.
                    </p>

                </div>


                <Link
                    to="/alumnos"
                    className="back-button"
                >
                    ← Volver a alumnos
                </Link>

            </div>


            {/* =========================================
                INFORMACIÓN DEL ALUMNO
            ========================================= */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Información del alumno</h2>

                        <span>
                            Datos asociados al usuario registrado.
                        </span>

                    </div>

                </div>


                <div className="user-info-grid">

                    <div className="form-field">

                        <label>
                            Nombre completo
                        </label>

                        <input
                            type="text"
                            disabled
                            value={`
                                ${alumno.usuario?.nombre ?? ""}
                                ${alumno.usuario?.apellidoP ?? ""}
                                ${alumno.usuario?.apellidoM ?? ""}
                            `.trim()}
                        />

                    </div>


                    <div className="form-field">

                        <label>
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            disabled
                            value={
                                alumno.usuario?.correo ?? ""
                            }
                        />

                    </div>

                </div>

            </section>


            {/* =========================================
                DATOS ACADÉMICOS
            ========================================= */}

            <section className="content-card form-card">

                <div className="content-card-header">

                    <div>

                        <h2>Datos académicos</h2>

                        <span>
                            Actualiza la información
                            académica del alumno.
                        </span>

                    </div>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="management-form"
                >

                    {/* CARRERA */}

                    <div className="form-field">

                        <label htmlFor="clave_c">
                            Carrera
                        </label>

                        <select
                            id="clave_c"
                            name="clave_c"
                            value={alumno.clave_c}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Seleccione una carrera
                            </option>


                            {carreras.map(carrera => (

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

                        <label htmlFor="clave_g">
                            Grupo
                        </label>

                        <select
                            id="clave_g"
                            name="clave_g"
                            value={alumno.clave_g}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Seleccione un grupo
                            </option>


                            {grupos.map(grupo => (

                                <option
                                    key={grupo.clave_g}
                                    value={grupo.clave_g}
                                >

                                    {grupo.grado}
                                    {grupo.letra}

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
                            name="matricula"
                            value={alumno.matricula}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* FECHA */}

                    <div className="form-field">

                        <label htmlFor="fecha_ingreso">
                            Fecha de ingreso
                        </label>

                        <input
                            id="fecha_ingreso"
                            type="date"
                            name="fecha_ingreso"
                            value={alumno.fecha_ingreso}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* BOTONES */}

                    <div className="form-actions">

                        <Link
                            to="/alumnos"
                            className="secondary-button"
                        >
                            Cancelar
                        </Link>


                        <button
                            type="submit"
                            className="primary-button"
                        >
                            Guardar cambios
                        </button>

                    </div>

                </form>

            </section>

        </div>

    );

}


export default EditarAlumno;