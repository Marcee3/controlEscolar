import { Link, useNavigate } from "react-router-dom";
import { cerrarSesion } from "../services/usuarioService";

function DashboardProfesor() {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await cerrarSesion();
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };
    return (

        <div className="admin-page">

            <header>

                <h1>Panel del Profesor</h1>

                <button
                    className="logout-button"
                    onClick={logout}
                >
                    <span className="logout-icon">🚪</span>
                    <span className="logout-text">
                        Cerrar sesión
                    </span>
                </button>

            </header>


            <div className="dashboard-options">

                <div className="dashboard-card">

                    <h2>Alumnos</h2>

                    <p>
                        Consulta la información de los alumnos.
                    </p>

                    <Link to="/alumnos-profesor">

                        <button>
                            Consultar Alumnos
                        </button>

                    </Link>

                </div>


                <div className="dashboard-card">

                    <h2>Calificaciones</h2>

                    <p>
                        Registra, consulta, edita y elimina
                        calificaciones.
                    </p>

                    <Link to="/calificaciones-profesor">

                        <button>
                            Gestionar Calificaciones
                        </button>

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default DashboardProfesor;