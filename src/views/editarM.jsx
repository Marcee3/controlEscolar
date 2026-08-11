import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    obtenerMateriaPorId,
    editarMateria
} from "../services/materiaService";

import { obtenerCarreras } from "../services/carreraService";

function EditarMateria() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [materia, setMateria] = useState({
        nombre_m: "",
        coordinacion: "",
        clave_c: ""
    });

    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        cargarDatos();
    }, [id]);

    const cargarDatos = async () => {

        try {

            const datosMateria = await obtenerMateriaPorId(id);

            setMateria({
                nombre_m: datosMateria.nombre_m || "",
                coordinacion: datosMateria.coordinacion || "",
                clave_c: datosMateria.clave_c || ""
            });

            const datosCarreras = await obtenerCarreras();

            setCarreras(datosCarreras);

        } catch (error) {

            console.error("Error al cargar los datos de la materia:", error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setMateria((prevMateria) => ({
            ...prevMateria,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await editarMateria(id, materia);

            navigate("/materias");

        } catch (error) {

            console.error("Error al editar la materia:", error);

        }

    };

    return (

        <div className="admin-page">

            {/* ENCABEZADO */}

            <div className="page-header">

                <div>

                    <h1>Editar Materia</h1>

                    <p>
                        Modifica la información de la materia seleccionada.
                    </p>

                </div>

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/materias")}
                >
                    ← Volver a materias
                </button>

            </div>


            {/* FORMULARIO */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Información de la materia</h2>

                        <span>
                            Actualiza los datos correspondientes.
                        </span>

                    </div>

                </div>


                <form
                    className="admin-form"
                    onSubmit={handleSubmit}
                >

                    {/* CARRERA */}

                    <div className="form-group">

                        <label htmlFor="clave_c">
                            Carrera
                        </label>

                        <select
                            id="clave_c"
                            name="clave_c"
                            value={materia.clave_c}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Seleccione una carrera
                            </option>

                            {
                                carreras.map((carrera) => (

                                    <option
                                        key={carrera.clave_c}
                                        value={carrera.clave_c}
                                    >
                                        {carrera.nombre_c}
                                    </option>

                                ))
                            }

                        </select>

                    </div>


                    {/* NOMBRE */}

                    <div className="form-group">

                        <label htmlFor="nombre_m">
                            Nombre de la materia
                        </label>

                        <input
                            id="nombre_m"
                            type="text"
                            name="nombre_m"
                            placeholder="Nombre de la materia"
                            value={materia.nombre_m}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* COORDINACIÓN */}

                    <div className="form-group">

                        <label htmlFor="coordinacion">
                            Coordinación
                        </label>

                        <input
                            id="coordinacion"
                            type="text"
                            name="coordinacion"
                            placeholder="Coordinación"
                            value={materia.coordinacion}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* BOTONES */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate("/materias")}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            Guardar Cambios
                        </button>

                    </div>

                </form>

            </section>

        </div>

    );

}

export default EditarMateria;