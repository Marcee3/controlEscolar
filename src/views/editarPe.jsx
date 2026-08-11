import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    obtenerPeriodosPorId,
    editarPeriodo
} from "../services/peService";

function EditarPeriodo() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [periodo, setPeriodo] = useState({
        nombre_periodo: "",
        fecha_inicio: "",
        fecha_fin: ""
    });

    useEffect(() => {
        cargarPeriodo();
    }, [id]);

    const cargarPeriodo = async () => {

        try {

            const datos = await obtenerPeriodosPorId(id);

            setPeriodo({
                nombre_periodo: datos.nombre_periodo || "",
                fecha_inicio: datos.fecha_inicio || "",
                fecha_fin: datos.fecha_fin || ""
            });

        } catch (error) {

            console.error("Error al cargar el período escolar:", error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setPeriodo((prevPeriodo) => ({
            ...prevPeriodo,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validar que la fecha final no sea anterior a la inicial
        if (periodo.fecha_fin < periodo.fecha_inicio) {

            alert("La fecha de fin no puede ser anterior a la fecha de inicio.");

            return;

        }

        try {

            await editarPeriodo(id, periodo);

            navigate("/periodos");

        } catch (error) {

            console.error("Error al editar el período escolar:", error);

        }

    };

    return (

        <div className="admin-page">

            {/* ENCABEZADO */}

            <div className="page-header">

                <div>

                    <h1>Editar Período Escolar</h1>

                    <p>
                        Modifica la información del período escolar seleccionado.
                    </p>

                </div>

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/periodos")}
                >
                    ← Volver a períodos
                </button>

            </div>


            {/* FORMULARIO */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Información del período</h2>

                        <span>
                            Actualiza las fechas y el nombre del período escolar.
                        </span>

                    </div>

                </div>


                <form
                    className="admin-form"
                    onSubmit={handleSubmit}
                >

                    {/* NOMBRE */}

                    <div className="form-group">

                        <label htmlFor="nombre_periodo">
                            Nombre del período
                        </label>

                        <input
                            id="nombre_periodo"
                            type="text"
                            name="nombre_periodo"
                            placeholder="Ej. Enero - Abril 2026"
                            value={periodo.nombre_periodo}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* FECHA DE INICIO */}

                    <div className="form-group">

                        <label htmlFor="fecha_inicio">
                            Fecha de inicio
                        </label>

                        <input
                            id="fecha_inicio"
                            type="date"
                            name="fecha_inicio"
                            value={periodo.fecha_inicio}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* FECHA DE FIN */}

                    <div className="form-group">

                        <label htmlFor="fecha_fin">
                            Fecha de fin
                        </label>

                        <input
                            id="fecha_fin"
                            type="date"
                            name="fecha_fin"
                            value={periodo.fecha_fin}
                            min={periodo.fecha_inicio}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* BOTONES */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate("/periodos")}
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

export default EditarPeriodo;
