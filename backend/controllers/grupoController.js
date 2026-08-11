import Grupo from "../models/Grupo.js";
import Carrera from "../models/Carrera.js";
import Periodo_Escolar from "../models/Periodo_Escolar.js";

export const getGrupo = async (req, res) => {
    try {
        const grupos = await Grupo.findAll({
            include: [
                {
                    model: Carrera,
                    as: "carrera",
                    attributes: [
                        "clave_c",
                        "nombre_c"
                    ]
                },
                {
                    model: Periodo_Escolar,
                    as: "periodo_escolar",
                    attributes: [
                        "clave_pe",
                        "nombre_periodo"
                    ]
                }
            ]
        });
        res.json(grupos);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

export const getGrupoById = async (req, res) => {
    try {
        const grupo = await Grupo.findByPk(req.params.id, {
            include: [
                {
                    model: Carrera,
                    as: "carrera",
                    attributes: ["clave_c", "nombre_c"]
                },
                {
                    model: Periodo_Escolar,
                    as: "periodo_escolar",
                    attributes: ["clave_pe", "nombre_periodo"]
                }
            ]
        });
        if (!grupo) {
            return res.status(404).json({
                mensaje: "Grupo no encontrado"
            });
        }
        res.json(grupo);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener el grupo"
        });
    }
};

export const registrarGrupo = async (req, res) => {
    try {
        const { clave_c, clave_pe, grado, letra } = req.body;
        const carrera = await Carrera.findByPk(clave_c);
        if (!carrera) {
            return res.status(404).json({
                mensaje: "La carrera no existe"
            });
        }
        const periodo = await Periodo_Escolar.findByPk(clave_pe);
        if (!periodo) {
            return res.status(404).json({
                mensaje: "El periodo escolar no existe"
            });
        }
        const existeGrupo = await Grupo.findOne({
            where: {
                clave_c,
                clave_pe,
                grado,
                letra
            }
        });
        if (existeGrupo) {
            return res.status(400).json({
                mensaje: "Ese grupo ya está registrado para esa carrera y periodo."
            });
        }
        const grupo = await Grupo.create({ clave_c, clave_pe, grado, letra });
        res.status(201).json(grupo);
    } catch (error) {
        console.error("Error al registrar grupo:", error);
        res.status(500).json({
            mensaje: "Error al registrar grupo"
        });
    }
};

export const editarGrupo = async (req, res) => {
    try {
        const grupo = await Grupo.findByPk(req.params.id);
        if (!grupo) {
            return res.status(404).json({
                mensaje: "Grupo no encontrado"
            });
        }
        await grupo.update(req.body);
        res.json(grupo);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al editar el grupo"
        });
    }
};

export const eliminarGrupo = async (req, res) => {
    try {
        const grupo = await Grupo.findByPk(req.params.id);
        if (!grupo) {
            return res.status(404).json({
                mensaje: "Grupo no encontrado"
            });
        }
        await grupo.destroy();
        res.json({
            mensaje: "Grupo eliminado correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar el grupo"
        });
    }
};