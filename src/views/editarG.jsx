import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    obtenerGruposPorId,
    editarGrupo
} from "../services/grupoService";

import { obtenerCarreras } from "../services/carreraService";
import { obtenerPeriodos } from "../services/peService";

function EditarGrupo() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [grupo, setGrupo] = useState({
        clave_c: "",
        clave_pe: "",
        grado: "",
        letra: ""
    });

    const [carreras, setCarreras] = useState([]);
    const [periodos, setPeriodos] = useState([]);

    useEffect(() => {
        cargarGrupo();
        cargarCarreras();
        cargarPeriodos();
    }, [id]);

    const cargarGrupo = async () => {

        try {

            const datos = await obtenerGruposPorId(id);

            setGrupo({
                clave_c: datos.clave_c,
                clave_pe: datos.clave_pe,
                grado: datos.grado,
                letra: datos.letra
            });

        } catch (error) {

            console.error("Error al cargar el grupo:", error);

        }

    };

    const cargarCarreras = async () => {

        try {

            const datos = await obtenerCarreras();

            setCarreras(datos);

        } catch (error) {

            console.error("Error al cargar las carreras:", error);

        }

    };

    const cargarPeriodos = async () => {

        try {

            const datos = await obtenerPeriodos();

            setPeriodos(datos);

        } catch (error) {

            console.error("Error al cargar los períodos:", error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setGrupo((prevGrupo) => ({
            ...prevGrupo,
            [name]: name === "letra"
                ? value.toUpperCase()
                : value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await editarGrupo(id, grupo);

            navigate("/grupos");

        } catch (error) {

            console.error("Error al editar el grupo:", error);

        }

    };

    return (

        <div className="admin-page">

            {/* ENCABEZADO */}

            <div className="page-header">

                <div>

                    <h1>Editar Grupo</h1>

                    <p>
                        Modifica la información del grupo seleccionado.
                    </p>

                </div>

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/grupos")}
                >
                    ← Volver a grupos
                </button>

            </div>


            {/* FORMULARIO */}

            <section className="content-card">

                <div className="content-card-header">

                    <div>

                        <h2>Información del grupo</h2>

                        <span>
                            Actualiza los datos del grupo.
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
                            value={grupo.clave_c}
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


                    {/* PERÍODO ESCOLAR */}

                    <div className="form-group">

                        <label htmlFor="clave_pe">
                            Período Escolar
                        </label>

                        <select
                            id="clave_pe"
                            name="clave_pe"
                            value={grupo.clave_pe}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Seleccione un período
                            </option>

                            {
                                periodos.map((periodo) => (

                                    <option
                                        key={periodo.clave_pe}
                                        value={periodo.clave_pe}
                                    >
                                        {periodo.nombre_periodo}
                                    </option>

                                ))
                            }

                        </select>

                    </div>


                    {/* GRADO */}

                    <div className="form-group">

                        <label htmlFor="grado">
                            Grado
                        </label>

                        <input
                            id="grado"
                            type="number"
                            name="grado"
                            min="1"
                            value={grupo.grado}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* LETRA */}

                    <div className="form-group">

                        <label htmlFor="letra">
                            Letra
                        </label>

                        <input
                            id="letra"
                            type="text"
                            name="letra"
                            maxLength="1"
                            value={grupo.letra}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* BOTONES */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate("/grupos")}
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

export default EditarGrupo;