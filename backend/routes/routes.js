import express from 'express';
import { verificarSesion, verificarRol } from '../middlewares/authMiddleware.js';

import {getCarreras, getCarreraById, crearCarrera, actualizarCarrera, eliminarCarrera} from '../controllers/carreraController.js';
import { getUsuarios, getUsuarioById, registrarUsuario, loginUsuario, eliminarUsuario, actualizarUsuario, logoutUsuario } from '../controllers/usuarioController.js';
import { getMaterias, getMateriaById, registrarMateria, editarMateria, eliminarMateria } from '../controllers/materiaController.js';
import { getProfesores, getProfesorById, registrarProfesor, editarProfesor, eliminarProfesor } from '../controllers/profesorController.js';
import { getAlumnos, getAlumnoById, registrarAlumno, editarAlumno, eliminarAlumno } from '../controllers/alumnoController.js';
import { getPE, getPEById, registrarPeriodo, editarPeriodo, eliminarPeriodo } from '../controllers/peController.js';
import { getGrupo, getGrupoById, registrarGrupo, editarGrupo, eliminarGrupo } from '../controllers/grupoController.js';
import { getAsig, getAsigById, registrarAsignacion, editarAsig, eliminarAsig } from '../controllers/asigController.js';
import { getCalificacion, getCalificacionById, registrarCalificacion, editarCalificacion, eliminarCalificacion } from '../controllers/calificacionController.js';
import { obtenerHistorialAlumno } from '../controllers/historialController.js';

const router = express.Router();

// Login
router.post('/login', loginUsuario);
router.post('/logout', verificarSesion, logoutUsuario);

/* */
// Usuarios
router.get('/usuarios', verificarSesion, verificarRol('administrador'), getUsuarios);
router.get('/usuarios/:id', verificarSesion, verificarRol('administrador'), getUsuarioById);
router.post('/usuarios', verificarSesion, verificarRol('administrador'), registrarUsuario);
router.put('/usuarios/:id', verificarSesion, verificarRol('administrador'), actualizarUsuario);
router.delete('/usuarios/:id', verificarSesion, verificarRol('administrador'), eliminarUsuario);

// Carreras
router.get('/carreras', verificarSesion, getCarreras);
router.get('/carreras/:id', verificarSesion, getCarreraById);
router.post('/carreras', verificarSesion, verificarRol('administrador'), crearCarrera);
router.put('/carreras/:id', verificarSesion, verificarRol('administrador'), actualizarCarrera);
router.delete('/carreras/:id', verificarSesion, verificarRol('administrador'), eliminarCarrera);

// Materias
router.get('/materias', verificarSesion, getMaterias);
router.get('/materias/:id', verificarSesion, getMateriaById);
router.post('/materias', verificarSesion, verificarRol('administrador'), registrarMateria);
router.put('/materias/:id', verificarSesion, verificarRol('administrador'), editarMateria);
router.delete('/materias/:id', verificarSesion, verificarRol('administrador'), eliminarMateria);

// Periodos escolares
router.get('/periodos', verificarSesion, getPE);
router.get('/periodos/:id', verificarSesion, getPEById);
router.post('/periodos', verificarSesion, verificarRol('administrador'), registrarPeriodo);
router.put('/periodos/:id', verificarSesion, verificarRol('administrador'), editarPeriodo);
router.delete('/periodos/:id', verificarSesion, verificarRol('administrador'), eliminarPeriodo);

// Grupos
router.get('/grupos', verificarSesion, getGrupo);
router.get('/grupos/:id', verificarSesion, getGrupoById);
router.post('/grupos', verificarSesion, verificarRol('administrador'), registrarGrupo);
router.put('/grupos/:id', verificarSesion, verificarRol('administrador'), editarGrupo);
router.delete('/grupos/:id', verificarSesion, verificarRol('administrador'), eliminarGrupo);

// Asignaciones profesor-materia
router.get('/asignaciones', verificarSesion, getAsig);
router.get('/asignaciones/:id', verificarSesion, getAsigById);
router.post('/asignaciones', verificarSesion, verificarRol('administrador'), registrarAsignacion);
router.put('/asignaciones/:id', verificarSesion, verificarRol('administrador'), editarAsig);
router.delete('/asignaciones/:id', verificarSesion, verificarRol('administrador'), eliminarAsig);

// PROFESOR
router.get('/profesores', verificarSesion, verificarRol('administrador'), getProfesores);
router.get('/profesores/:id', verificarSesion, verificarRol('administrador'), getProfesorById);
router.post('/profesores', verificarSesion, verificarRol('administrador'), registrarProfesor);
router.put('/profesores/:id', verificarSesion, verificarRol('administrador'), editarProfesor);
router.delete('/profesores/:id', verificarSesion, verificarRol('administrador'), eliminarProfesor);

// ALUMNO
router.get('/alumnos', verificarSesion, verificarRol('administrador','profesor'), getAlumnos);
router.get('/alumnos/:id', verificarSesion, verificarRol('administrador','profesor','alumno'), getAlumnoById);
router.post('/alumnos', verificarSesion, verificarRol('administrador'), registrarAlumno);
router.put('/alumnos/:id', verificarSesion, verificarRol('administrador'), editarAlumno);
router.delete('/alumnos/:id', verificarSesion, verificarRol('administrador'), eliminarAlumno);

// PROFESOR - CALIFICACIONES
router.get('/calificaciones', verificarSesion, verificarRol('administrador','profesor'), getCalificacion);
router.get('/calificaciones/:id', verificarSesion, verificarRol('administrador','profesor','alumno'), getCalificacionById);
router.post('/calificaciones', verificarSesion, verificarRol('administrador','profesor'), registrarCalificacion);
router.put('/calificaciones/:id', verificarSesion, verificarRol('administrador','profesor'), editarCalificacion);
router.delete('/calificaciones/:id', verificarSesion, verificarRol('administrador','profesor'), eliminarCalificacion);

// HISTORIAL ALUMNO
router.get('/historial', verificarSesion, verificarRol('administrador','profesor','alumno'), obtenerHistorialAlumno);

export default router;