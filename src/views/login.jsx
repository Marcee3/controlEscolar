import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/usuarioService";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const respuesta = await loginUsuario({
                correo: email,
                contrasena: password
            });
            const rol = respuesta.usuario.rol;
            if (rol === "Administrador") {
                navigate("/index");
            } else if (rol === "Profesor") {
                navigate("/dashboardProfesor");
            } else if (rol === "Alumno") {
                navigate("/historial");
            } else {
                setError("El usuario no tiene un rol válido.");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setError("Correo o contraseña incorrectos.");
        }
    };
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>Control Escolar</h1>
                    <p>
                        Sistema de gestión académica
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                >
                    <div className="form-group">
                        <label htmlFor="email">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Ingresa tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={5}
                            required
                        />
                    </div>
                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <div className="login-footer">
                    <span>
                        Sistema de Control Escolar
                    </span>
                </div>
            </div>
        </div>
    );
}
export default Login;