import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
    obtenerAsignacionPorId,
    editarAsignacion
} from "../services/asigService";

import { obtenerProfesores } from "../services/profesorService";
import { obtenerMaterias } from "../services/materiaService";
import { obtenerGrupos } from "../services/grupoService";


function EditarAsignacion() {

    const { id } = useParams();
    const navigate = useNavigate();


    const [asignacion, setAsignacion] = useState({

        clave_p: "",
        clave_m: "",
        clave_g: ""

    });


    const [profesores, setProfesores] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [grupos, setGrupos] = useState([]);


    /* =========================================
       CARGAR INFORMACIÓN
    ========================================= */

    useEffect(() => {

        cargarAsignacion();
        cargarProfesores();
        cargarMaterias();
        cargarGrupos();

    }, [id]);


    const cargarAsignacion = async () => {

        try {

            const datos =
                await obtenerAsignacionPorId(id);


            setAsignacion({

                clave_p: datos.clave_p,
                clave_m: datos.clave_m,
                clave_g: datos.clave_g

            });

        } catch (error) {

            console.error(
                "Error al cargar asignación:",
                error
            );

        }

    };


    const cargarProfesores = async () => {

        try {

            const datos = await obtenerProfesores();

            setProfesores(datos);

        } catch (error) {

            console.error(
                "Error al cargar profesores:",
                error
            );

        }

    };


    const cargarMaterias = async () => {

        try {

            const datos = await obtenerMaterias();

            setMaterias(datos);

        } catch (error) {

            console.error(
                "Error al cargar materias:",
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


        setAsignacion(prev => ({

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

            await editarAsignacion(
                id,
                asignacion
            );


            navigate("/asignaciones");

        } catch (error) {

            console.error(
                "Error al editar asignación:",
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

                    <h1>Editar Asignación</h1>

                    <p>
                        Modifica el profesor, materia o
                        grupo asociado a la asignación.
                    </p>

                </div>


                <Link
                    to="/asignaciones"
                    className="back-button"
                >
                    ← Volver a asignaciones
                </Link>

            </div>


            {/* =========================================
                FORMULARIO
            ========================================= */}

            <section className="content-card form-card">

                <div className="content-card-header">

                    <div>

                        <h2>Datos de la asignación</h2>

                        <span>
                            Actualiza la información
                            correspondiente.
                        </span>

                    </div>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="management-form"
                >

                    {/* PROFESOR */}

                    <div className="form-field">

                        <label htmlFor="clave_p">
                            Profesor
                        </label>

                        <select
                            id="clave_p"
                            name="clave_p"
                            value={asignacion.clave_p}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Seleccione un profesor
                            </option>


                            {profesores.map(
                                (profesor) => (

                                    <option
                                        key={
                                            profesor.clave_p
                                        }
                                        value={
                                            profesor.clave_p
                                        }
                                    >

                                        {
                                            profesor
                                                .usuario
                                                ?.nombre
                                        }{" "}

                                        {
                                            profesor
                                                .usuario
                                                ?.apellidoP
                                        }

                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* MATERIA */}

                    <div className="form-field">

                        <label htmlFor="clave_m">
                            Materia
                        </label>

                        <select
                            id="clave_m"
                            name="clave_m"
                            value={asignacion.clave_m}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Seleccione una materia
                            </option>


                            {materias.map(
                                (materia) => (

                                    <option
                                        key={
                                            materia.clave_m
                                        }
                                        value={
                                            materia.clave_m
                                        }
                                    >

                                        {
                                            materia.nombre_m
                                        }

                                    </option>

                                )
                            )}

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
                            value={asignacion.clave_g}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Seleccione un grupo
                            </option>


                            {grupos.map(
                                (grupo) => (

                                    <option
                                        key={
                                            grupo.clave_g
                                        }
                                        value={
                                            grupo.clave_g
                                        }
                                    >

                                        {grupo.grado}
                                        {grupo.letra}

                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* BOTONES */}

                    <div className="form-actions">

                        <Link
                            to="/asignaciones"
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
export default EditarAsignacion;