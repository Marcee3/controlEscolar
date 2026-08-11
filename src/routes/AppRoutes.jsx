import { Routes, Route } from "react-router-dom";
import Index from '../views/index.jsx';
import Carreras from '../views/carrera.jsx';
import Login from '../views/login.jsx';
import Registro from '../views/registro.jsx';
import EditarUsuario from '../views/editarU.jsx';
import EditarCarrera from '../views/editarC.jsx';
import EditarMateria from "../views/editarM.jsx";
import Materias from "../views/materia.jsx";
import Periodos from "../views/periodoEscolar.jsx";
import EditarPeriodo from "../views/editarPe.jsx";
import Grupo from "../views/grupo.jsx";
import EditarGrupo from "../views/editarG.jsx";
import Profesor from "../views/profesor.jsx";
import EditarProfesor from "../views/editarP.jsx";
import Alumno from "../views/alumno.jsx";
import EditarAlumno from "../views/editarA.jsx";
import Asignacion from "../views/asigMat.jsx";
import EditarAsignacion from "../views/editarAsig.jsx";
import Calificacion from "../views/calificacion.jsx";
import EditarCalificacion from "../views/editarCal.jsx";
import Historial from "../views/historial.jsx";
import DashboardProfesor from "../views/dashboardProfesor.jsx";
import CalificacionesProfesor from "../views/calificacionesProfesor.jsx";
import EditarCalificacionProfesor from "../views/editarCProfesor.jsx";
import AlumnosProfesor from "../views/alumnosProfesor.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/index" element={<Index />} />
            <Route path="/carreras" element={<Carreras />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/editarUsuario/:id" element={<EditarUsuario />} />
            <Route path="/editarCarrera/:id" element={<EditarCarrera />} />
            <Route path="/materias" element={<Materias />} />
            <Route path="/editarMateria/:id" element={<EditarMateria />} />
            <Route path="/periodos" element={<Periodos />} />
            <Route path="/editarPeriodo/:id" element={<EditarPeriodo />} />
            <Route path="/grupos" element={<Grupo />} />
            <Route path="/editarGrupo/:id" element={<EditarGrupo />} />
            <Route path="/profesores" element={<Profesor />} />
            <Route path="/editarProfesor/:id" element={<EditarProfesor />} />
            <Route path="/alumnos" element={<Alumno />} />
            <Route path="/editarAlumno/:id" element={<EditarAlumno />} />
            <Route path="/asignaciones" element={<Asignacion />} />
            <Route path="/editarAsignacion/:id" element={<EditarAsignacion />} />
            <Route path="/calificaciones" element={<Calificacion />} />
            <Route path="/editarCalificacion/:id" element={<EditarCalificacion />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/dashboardProfesor" element={<DashboardProfesor />} />
            <Route path="/calificaciones-profesor" element={<CalificacionesProfesor />} />
            <Route path="/editarCProfesor/:id" element={<EditarCalificacionProfesor />} />
            <Route path="/alumnos-profesor" element={<AlumnosProfesor />} />
        </Routes>
    );
}

export default AppRoutes;