import Carrera from "./Carrera.js";
import Materia from "./Materia.js";

import Usuario from "./Usuario.js";
import Profesor from "./Profesor.js";
import Alumno from "./Alumno.js";

import Periodo_Escolar from "./Periodo_Escolar.js";
import Grupo from "./Grupo.js";
import Asignacion_Materia from "./Asignacion_Materia.js";
import Calificacion from "./Calificacion.js";


// Un usuario puede ser un profesor
Usuario.hasOne(Profesor, {
    foreignKey: "clave_u",
    as: "profesor"
});

// Un profesor pertenece a un usuario
Profesor.belongsTo(Usuario, {
    foreignKey: "clave_u",
    as: "usuario"
});

Usuario.hasOne(Alumno, {
    foreignKey: "clave_u",
    as: "alumno"
});

Alumno.belongsTo(Usuario, {
    foreignKey: "clave_u",
    as: "usuario"
});



Periodo_Escolar.hasMany(Grupo, {
    foreignKey: "clave_pe",
    as: "grupos"
});

Grupo.belongsTo(Periodo_Escolar, {
    foreignKey: "clave_pe",
    as: "periodo_escolar"
});

// Una carrera tiene muchas materias
Carrera.hasMany(Materia, {
    foreignKey: 'clave_c',
    as: 'materias'
});

// Una materia pertenece a una carrera
Materia.belongsTo(Carrera, {
    foreignKey: 'clave_c',
    as: 'carrera'
});

Carrera.hasMany(Alumno, {
    foreignKey: "clave_c",
    as: "alumnos"
});

Alumno.belongsTo(Carrera, {
    foreignKey: "clave_c",
    as: "carrera"
});

Grupo.hasMany(Alumno, {
    foreignKey: "clave_g",
    as: "alumnos"
});

Alumno.belongsTo(Grupo, {
    foreignKey: "clave_g",
    as: "grupo"
});



Carrera.hasMany(Grupo, {
    foreignKey: "clave_c",
    as: "grupos"
});

Grupo.belongsTo(Carrera, {
    foreignKey: "clave_c",
    as: "carrera"
});



Profesor.hasMany(Asignacion_Materia, {
    foreignKey: "clave_p",
    as: "asignaciones"
});

Asignacion_Materia.belongsTo(Profesor, {
    foreignKey: "clave_p",
    as: "profesor"
});

Materia.hasMany(Asignacion_Materia, {
    foreignKey: "clave_m",
    as: "asignaciones"
});

Asignacion_Materia.belongsTo(Materia, {
    foreignKey: "clave_m",
    as: "materia"
});

Grupo.hasMany(Asignacion_Materia, {
    foreignKey: "clave_g",
    as: "asignaciones"
});

Asignacion_Materia.belongsTo(Grupo, {
    foreignKey: "clave_g",
    as: "grupo"
});

Alumno.hasMany(Calificacion, {
    foreignKey: "clave_a",
    as: "calificaciones"
});

Calificacion.belongsTo(Alumno, {
    foreignKey: "clave_a",
    as: "alumno"
});

Asignacion_Materia.hasMany(Calificacion, {
    foreignKey: "clave_asig",
    as: "calificaciones"
});

Calificacion.belongsTo(Asignacion_Materia, {
    foreignKey: "clave_asig",
    as: "asignacion"
});

export {
    Carrera, Materia, Usuario, Profesor,
    Periodo_Escolar, Grupo, Alumno, Asignacion_Materia,
    Calificacion
};