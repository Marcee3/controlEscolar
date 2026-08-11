import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    obtenerProfesorPorId,
    editarProfesor
} from "../services/profesorService";

function EditarProfesor() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [profesor, setProfesor] = useState({
        especialidad: "",
        usuario: {
            nombre: "",
            apellidoP: "",
            apellidoM: "",
            correo: ""
        }
    });

    useEffect(() => {
        cargarProfesor();
    }, [id]);

    const cargarProfesor = async () => {

        try {

            const datos = await obtenerProfesorPorId(id);

            setProfesor(datos);

        } catch (error) {

            console.error("Error al cargar el profesor:", error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfesor((prevProfesor) => ({
            ...prevProfesor,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await editarProfesor(id, {
                especialidad: profesor.especialidad
            });

            navigate("/profesores");

        } catch (error) {

            console.error("Error al editar el profesor:", error);

        }

    };

    return (

        <div className="admin-page">

            {/* ENCABEZADO */}

            <div className="page-header">

                <div>

                    <h1>Editar Profesor</h1>

                    <p>
                        Modifica la información del profesor seleccionado.
                    </p>

                </div>

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/profesores")}
                >
                    ← Volver a profesores
                </button>

            </div>


            {/* FORMULARIO */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Información del profesor</h2>

                        <span>
                            Consulta los datos del usuario y actualiza su especialidad.
                        </span>

                    </div>

                </div>


                <form
                    className="admin-form"
                    onSubmit={handleSubmit}
                >

                    {/* NOMBRE */}

                    <div className="form-group">

                        <label htmlFor="nombre">
                            Nombre completo
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            value={
                                `${profesor.usuario?.nombre ?? ""} ${
                                    profesor.usuario?.apellidoP ?? ""
                                } ${
                                    profesor.usuario?.apellidoM ?? ""
                                }`
                            }
                            disabled
                        />

                    </div>


                    {/* CORREO */}

                    <div className="form-group">

                        <label htmlFor="correo">
                            Correo electrónico
                        </label>

                        <input
                            id="correo"
                            type="email"
                            value={profesor.usuario?.correo ?? ""}
                            disabled
                        />

                    </div>


                    {/* ESPECIALIDAD */}

                    <div className="form-group">

                        <label htmlFor="especialidad">
                            Especialidad
                        </label>

                        <input
                            id="especialidad"
                            type="text"
                            name="especialidad"
                            placeholder="Especialidad del profesor"
                            value={profesor.especialidad || ""}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* BOTONES */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate("/profesores")}
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

export default EditarProfesor;