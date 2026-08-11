import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
    obtenerCarreraPorId,
    editarCarrera
} from "../services/carreraService";


function EditarCarrera() {

    const { id } = useParams();
    const navigate = useNavigate();


    const [carrera, setCarrera] = useState({

        nombre_c: "",
        duracion: ""

    });


    /* =========================================
       CARGAR CARRERA
    ========================================= */

    useEffect(() => {

        cargarCarrera();

    }, [id]);


    const cargarCarrera = async () => {

        try {

            const datos =
                await obtenerCarreraPorId(id);

            setCarrera(datos);

        } catch (error) {

            console.error(
                "Error al cargar carrera:",
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


        setCarrera(prevCarrera => ({

            ...prevCarrera,

            [name]: value

        }));

    };


    /* =========================================
       GUARDAR CAMBIOS
    ========================================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await editarCarrera(
                id,
                carrera
            );


            navigate("/carreras");

        } catch (error) {

            console.error(
                "Error al editar carrera:",
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

                    <h1>Editar Carrera</h1>

                    <p>
                        Modifica la información de la
                        carrera seleccionada.
                    </p>

                </div>


                <Link
                    to="/carreras"
                    className="back-button"
                >
                    ← Volver a carreras
                </Link>

            </div>


            {/* =========================================
                FORMULARIO
            ========================================= */}

            <section className="content-card form-card">

                <div className="content-card-header">

                    <div>

                        <h2>Datos de la carrera</h2>

                        <span>
                            Actualiza el nombre y la
                            duración de la carrera.
                        </span>

                    </div>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="management-form"
                >

                    {/* NOMBRE */}

                    <div className="form-field">

                        <label htmlFor="nombre_c">
                            Nombre de la carrera
                        </label>

                        <input
                            id="nombre_c"
                            type="text"
                            name="nombre_c"
                            value={carrera.nombre_c}
                            onChange={handleChange}
                            placeholder="Ej. Ingeniería en Desarrollo de Software"
                            required
                        />

                    </div>


                    {/* DURACIÓN */}

                    <div className="form-field">

                        <label htmlFor="duracion">
                            Duración
                        </label>

                        <input
                            id="duracion"
                            type="number"
                            name="duracion"
                            value={carrera.duracion}
                            onChange={handleChange}
                            placeholder="Ej. 11"
                            min="1"
                            required
                        />

                        <small className="form-help">
                            Indica la duración de la carrera
                            en cuatrimestres.
                        </small>

                    </div>


                    {/* BOTONES */}

                    <div className="form-actions">

                        <Link
                            to="/carreras"
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
export default EditarCarrera;