import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    obtenerUsuarios,
    eliminarUsuario,
    cerrarSesion
} from "../services/usuarioService";

function Index() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const datos = await obtenerUsuarios();
            setUsuarios(datos);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    const borrarUsuario = async (id) => {
        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar este usuario?"
        );

        if (!confirmar) return;

        try {
            await eliminarUsuario(id);
            cargarUsuarios();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const modificarUsuario = (usuario) => {
        navigate(`/editarUsuario/${usuario.clave_u}`);
    };

    const logout = async () => {
        try {
            await cerrarSesion();
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="admin-layout">

            {/* MENÚ LATERAL */}
            <aside className="sidebar">

                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        🎓
                    </div>

                    <h2>Control Escolar</h2>
                    <span>Panel administrativo</span>
                </div>

                <nav className="sidebar-menu">

                    <Link to="/index" className="menu-item active">
                        🏠
                        <span>Inicio</span>
                    </Link>

                    <div className="menu-section">
                        <span>GESTIÓN ACADÉMICA</span>
                    </div>

                    <Link to="/carreras" className="menu-item">
                        🎓
                        <span>Carreras</span>
                    </Link>

                    <Link to="/materias" className="menu-item">
                        📚
                        <span>Materias</span>
                    </Link>

                    <Link to="/periodos" className="menu-item">
                        📅
                        <span>Periodos escolares</span>
                    </Link>

                    <Link to="/grupos" className="menu-item">
                        👥
                        <span>Grupos</span>
                    </Link>

                    <Link to="/asignaciones" className="menu-item">
                        📝
                        <span>Asignaciones</span>
                    </Link>

                    <div className="menu-section">
                        <span>USUARIOS</span>
                    </div>

                    <Link to="/registro" className="menu-item">
                        ➕
                        <span>Registrar usuario</span>
                    </Link>

                    <Link to="/profesores" className="menu-item">
                        👨‍🏫
                        <span>Profesores</span>
                    </Link>

                    <Link to="/alumnos" className="menu-item">
                        👨‍🎓
                        <span>Alumnos</span>
                    </Link>

                    <Link to="/calificaciones" className="menu-item">
                        📊
                        <span>Calificaciones</span>
                    </Link>

                </nav>

                <button className="logout-button" onClick={logout}>
                    <span className="logout-icon">🚪</span>
                    <span className="logout-text">Cerrar sesión</span>
                </button>

            </aside>


            {/* CONTENIDO PRINCIPAL */}
            <main className="admin-content">

                {/* ENCABEZADO */}
                <header className="dashboard-header">
                    <div>
                        <h1>Panel de administración</h1>
                        <p>
                            Bienvenido al Sistema de Control Escolar
                        </p>
                    </div>

                    <div className="admin-user">
                        <div className="admin-avatar">
                            A
                        </div>

                        <div>
                            <strong>Administrador</strong>
                            <span>Panel administrativo</span>
                        </div>
                    </div>
                </header>


                {/* TARJETAS */}
                <section className="dashboard-cards">

                    <div className="dashboard-card">
                        <div className="card-icon blue">
                            👥
                        </div>

                        <div>
                            <span>Usuarios registrados</span>
                            <strong>{usuarios.length}</strong>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon green">
                            👨‍🏫
                        </div>

                        <div>
                            <span>Profesores</span>
                            <strong>
                                {usuarios.filter(
                                    (usuario) => usuario.rol === "Profesor"
                                ).length}
                            </strong>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon blue">
                            👨‍🎓
                        </div>

                        <div>
                            <span>Alumnos</span>
                            <strong>
                                {usuarios.filter(
                                    (usuario) => usuario.rol === "Alumno"
                                ).length}
                            </strong>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-icon green">
                            🔐
                        </div>

                        <div>
                            <span>Administradores</span>
                            <strong>
                                {usuarios.filter(
                                    (usuario) => usuario.rol === "Administrador"
                                ).length}
                            </strong>
                        </div>
                    </div>

                </section>


                {/* TABLA DE USUARIOS */}
                <section className="dashboard-section">

                    <div className="section-header">

                        <div>
                            <h2>Usuarios registrados</h2>
                            <p>
                                Administración de las cuentas del sistema
                            </p>
                        </div>

                        <Link
                            to="/registro"
                            className="primary-link"
                        >
                            + Registrar usuario
                        </Link>

                    </div>


                    <div className="table-container">

                        <table className="admin-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Correo</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Teléfono</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                {usuarios.length > 0 ? (

                                    usuarios.map((usuario) => (

                                        <tr key={usuario.clave_u}>

                                            <td>
                                                {usuario.clave_u}
                                            </td>

                                            <td>
                                                {usuario.correo}
                                            </td>

                                            <td>
                                                {usuario.nombre}
                                            </td>

                                            <td>
                                                {usuario.apellidop}{" "}
                                                {usuario.apellidom}
                                            </td>

                                            <td>
                                                {usuario.telefono}
                                            </td>

                                            <td>
                                                <span
                                                    className={`role-badge ${
                                                        usuario.rol === "Administrador"
                                                            ? "admin"
                                                            : usuario.rol === "Profesor"
                                                            ? "teacher"
                                                            : "student"
                                                    }`}
                                                >
                                                    {usuario.rol}
                                                </span>
                                            </td>

                                            <td>

                                                <div className="table-actions">

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            modificarUsuario(usuario)
                                                        }
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            borrarUsuario(
                                                                usuario.clave_u
                                                            )
                                                        }
                                                    >
                                                        Eliminar
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="empty-table"
                                        >
                                            No hay usuarios registrados.
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Index;