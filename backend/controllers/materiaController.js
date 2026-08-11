import Materia from "../models/Materia.js";
import Carrera from "../models/Carrera.js";

//Obtener materias
export const getMaterias = async (req, res) => {
    try {
        const materias = await Materia.findAll({
            include : {
                model:Carrera,
                as: "carrera"
            }
        });
        res.json(materias);
    } catch(error) {
        console.error('Error al obtener las materias:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Obtener materia por ID
export const getMateriaById = async (req, res) => {
    try {
        const materia = await Materia.findByPk(req.params.id, {
            include : {
                model:Carrera,
                as: "carrera"
            }
        });

        if (!materia){
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            });
        }

        res.json(materia);
    } catch (error) {
        console.error('Error al obtener las materias:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Registrar materia
export const registrarMateria = async (req, res) => {
    try {

        const {
            clave_c,
            nombre_m,
            coordinacion
        } = req.body;

        const nuevaMateria = await Materia.create({
            clave_c,
            nombre_m,
            coordinacion
        });

        res.status(201).json({
            mensaje: "Materia registrada correctamente",
            materia: nuevaMateria
        });

    } catch (error) {
        console.error("Error al registrar materia:", error);

        res.status(500).json({
            mensaje: "Error al registrar materia"
        });
    }
};

// Editar materia
export const editarMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            clave_c,
            nombre_m,
            coordinacion
        } = req.body;
        const materia = await Materia.findByPk(id);

        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            });
        }

        await materia.update({
            clave_c,
            nombre_m,
            coordinacion
        });

        res.json({
            mensaje: "Materia actualizada correctamente",
            materia
        });

    } catch (error) {
        console.error("Error al editar materia:", error);
        res.status(500).json({
            mensaje: "Error al editar materia"
        });
    }
};

// Eliminar materia
export const eliminarMateria = async (req, res) => {
    try {
        const { id } = req.params;
        const materia = await Materia.findByPk(id);
        if (!materia) {
            return res.status(404).json({
                mensaje: "Materia no encontrada"
            });
        }
        await materia.destroy();
        res.json({
            mensaje: "Materia eliminada correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar materia:", error);

        res.status(500).json({
            mensaje: "Error al eliminar materia"
        });
    }
};