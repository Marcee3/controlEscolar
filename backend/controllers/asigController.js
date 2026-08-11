import Asignacion_Materia from "../models/Asignacion_Materia.js"
import Profesor from "../models/Profesor.js";
import Usuario from "../models/Usuario.js";
import Materia from "../models/Materia.js";
import Grupo from "../models/Grupo.js";

export const getAsig = async (req,res) =>{
    try{
        const asig = await Asignacion_Materia.findAll({
            include:[
    {
        model: Profesor,
        as:"profesor",
        include:{
            model: Usuario,
            as:"usuario"
        }
    },
    {
        model: Materia,
        as:"materia"
    },
    {
        model: Grupo,
        as:"grupo"
    }
]
        });
        res.json(asig);
    } catch(error){
        console.error("Error al obtener las asignaciones:", error);
        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

export const getAsigById = async (req, res) => {
    try {
        const asignacion = await Asignacion_Materia.findByPk(req.params.id, {
            include: [
                {
                    model: Profesor,
                    as: "profesor"
                },
                {
                    model: Materia,
                    as: "materia"
                },
                {
                    model: Grupo,
                    as: "grupo"
                }
            ]
        });
        if (!asignacion) {
            return res.status(404).json({
                mensaje: "Asignación no encontrada"
            });
        }
        res.json(asignacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener la asignación"
        });
    }
};

export const registrarAsignacion = async (req, res) => {
    try {
        const { clave_p, clave_m, clave_g } = req.body;
        const profesor = await Profesor.findByPk(clave_p);
        if (!profesor) {
            return res.status(404).json({
                mensaje: "El profesor no existe"
            });
        }
        const materia = await Materia.findByPk(clave_m);
        if (!materia) {
            return res.status(404).json({
                mensaje: "La materia no existe"
            });
        }
        const grupo = await Grupo.findByPk(clave_g);
        if (!grupo) {
            return res.status(404).json({
                mensaje: "El grupo no existe"
            });
        }
        const existeAsignacion = await Asignacion_Materia.findOne({
            where: { clave_p, clave_m, clave_g }
        });
        if (existeAsignacion) {
            return res.status(400).json({
                mensaje: "La asignación ya existe"
            });
        }
        const asignacion = await Asignacion_Materia.create({ clave_p, clave_m, clave_g });
        res.status(201).json(asignacion);
    } catch (error) {
        console.error("Error al registrar la asignación:", error);
        res.status(500).json({
            mensaje: "Error al registrar la asignación"
        });
    }
};
export const editarAsig = async (req, res) => {
    try {
        const asignacion = await Asignacion_Materia.findByPk(req.params.id);
        if (!asignacion) {
            return res.status(404).json({
                mensaje: "Asignación no encontrada"
            });
        }
        await asignacion.update(req.body);
        res.json(asignacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al editar la asignación"
        });
    }
};

export const eliminarAsig = async (req, res) => {
    try {
        const asignacion = await Asignacion_Materia.findByPk(req.params.id);
        if (!asignacion) {
            return res.status(404).json({
                mensaje: "Asignación no encontrada"
            });
        }
        await asignacion.destroy();
        res.json({
            mensaje: "Asignación eliminada correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar la asignación"
        });
    }
};