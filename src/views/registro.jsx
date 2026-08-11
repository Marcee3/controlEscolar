import { useState } from "react";
import { registrarUsuario } from "../services/usuarioService";
import { Link } from "react-router-dom";

function Registro() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidop, setApellidop] = useState("");
    const [apellidom, setApellidom] = useState("");
    const [telefono, setTelefono] = useState("");
    const [rol, setRol] = useState("Alumno");

    const agregarUsuario = async (e) => {
        e.preventDefault();

        try {

            await registrarUsuario({
                correo: email,
                contrasena: password,
                nombre: nombre,
                apellidop: apellidop,
                apellidom: apellidom,
                telefono: telefono,
                rol: rol
            });

            setNombre("");
            setApellidop("");
            setApellidom("");
            setTelefono("");
            setEmail("");
            setPassword("");
            setRol("Alumno");

        } catch (error) {

            console.error(
                "Error al registrar usuario:",
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

                    <h1>Registrar Usuario</h1>

                    <p>
                        Registra nuevos usuarios en el
                        sistema de control escolar.
                    </p>

                </div>

                <Link
                    to="/index"
                    className="back-button"
                >
                    ← Volver al inicio
                </Link>

            </div>


            {/* =========================================
                FORMULARIO
            ========================================= */}

            <section className="content-card form-card">

                <div className="content-card-header">

                    <div>

                        <h2>Datos del usuario</h2>

                        <span>
                            Completa la información del nuevo
                            usuario.
                        </span>

                    </div>

                </div>


                <form
                    onSubmit={agregarUsuario}
                    className="management-form"
                >

                    {/* CORREO */}

                    <div className="form-field">

                        <label htmlFor="correo">
                            Correo electrónico
                        </label>

                        <input
                            id="correo"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            autoComplete="email"
                            required
                        />

                    </div>


                    {/* CONTRASEÑA */}

                    <div className="form-field">

                        <label htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Ingrese una contraseña"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="new-password"
                            minLength={5}
                            required
                        />

                    </div>


                    {/* NOMBRE */}

                    <div className="form-field">

                        <label htmlFor="nombre">
                            Nombre
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* APELLIDO PATERNO */}

                    <div className="form-field">

                        <label htmlFor="apellidop">
                            Apellido paterno
                        </label>

                        <input
                            id="apellidop"
                            type="text"
                            placeholder="Apellido paterno"
                            value={apellidop}
                            onChange={(e) =>
                                setApellidop(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* APELLIDO MATERNO */}

                    <div className="form-field">

                        <label htmlFor="apellidom">
                            Apellido materno
                        </label>

                        <input
                            id="apellidom"
                            type="text"
                            placeholder="Apellido materno"
                            value={apellidom}
                            onChange={(e) =>
                                setApellidom(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* TELÉFONO */}

                    <div className="form-field">

                        <label htmlFor="telefono">
                            Teléfono
                        </label>

                        <input
                            id="telefono"
                            type="tel"
                            placeholder="Ej. 4491234567"
                            value={telefono}
                            onChange={(e) =>
                                setTelefono(e.target.value)
                            }
                        />

                    </div>


                    {/* ROL */}

                    <div className="form-field">

                        <label htmlFor="rol">
                            Rol
                        </label>

                        <select
                            id="rol"
                            value={rol}
                            onChange={(e) =>
                                setRol(e.target.value)
                            }
                            required
                        >

                            <option value="Alumno">
                                Alumno
                            </option>

                            <option value="Profesor">
                                Profesor
                            </option>

                            <option value="Administrador">
                                Administrador
                            </option>

                        </select>

                    </div>


                    {/* BOTÓN */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            + Registrar usuario
                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}

export default Registro;

