import Calificacion from "../models/Calificacion.js";
import Alumno from "../models/Alumno.js";
import Usuario from "../models/Usuario.js";
import Asignacion_Materia from "../models/Asignacion_Materia.js";
import Materia from "../models/Materia.js";
import Grupo from "../models/Grupo.js";
import { Op } from "sequelize";

export const getCalificacion = async (req , res) => {
    try {
        const calificaciones = await Calificacion.findAll({
            include:[
    {
        model: Alumno,
        as:"alumno",
        include:{
            model: Usuario,
            as:"usuario"
        }
    },
    {
        model: Asignacion_Materia,
        as:"asignacion",
        include:[
            {
                model: Materia,
                as:"materia"
            },
            {
                model: Grupo,
                as:"grupo"
            }
        ]
    }
]
        });
        res.json(calificaciones);
    } catch(error){
        console.error("Error al obtener las calificaciones:", error);
        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

export const getCalificacionById = async (req , res) => {
    try {
        const calificacion = await Calificacion.findByPk(req.params.id,{
            include: [
                {
                    model: Alumno,
                    as: "alumno"
                }, {
                    model: Asignacion_Materia,
                    as: "asignacion"
                }
            ]
        });
        if (!calificacion){
            return res.status(404).json({
                mensaje: "Calificacion no encontrada"
            });
        }
        res.json(calificacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener la calificacion"
        });
    }
};

export const registrarCalificacion = async (req, res) => {
    try {
        const { clave_a, clave_asig, parcial_1, parcial_2, parcial_3} = req.body;
        // Verificar que exista el alumno
        const alumno = await Alumno.findByPk(clave_a);
        if (!alumno) {
            return res.status(404).json({
                mensaje: "El alumno no existe"
            });
        }
        // Verificar que exista la asignación
        const asignacion = await Asignacion_Materia.findByPk(clave_asig);
        if (!asignacion) {
            return res.status(404).json({
                mensaje: "La asignación no existe"
            });
        }
        // Verificar que el alumno no tenga ya registrada esta materia
        const existeCalificacion = await Calificacion.findOne({
            where: {
                clave_a,
                clave_asig
            }
        });
        if (existeCalificacion) {
            return res.status(400).json({
                mensaje: "La calificación ya está registrada para este alumno."
            });
        }
        // Calcular promedio
        const promedio_final = (Number(parcial_1) + Number(parcial_2) + Number(parcial_3)) / 3;
        const calificacion = await Calificacion.create({
            clave_a,
            clave_asig,
            parcial_1,
            parcial_2,
            parcial_3,
            promedio_final
        });
        res.status(201).json(calificacion);
    } catch (error) {
        console.error("Error al registrar la calificación:", error);
        res.status(500).json({
            mensaje: "Error al registrar la calificación"
        });
    }
};

export const editarCalificacion = async (req, res) => {

    try {

        const { id } = req.params;

        const calificacion = await Calificacion.findByPk(id);

        if (!calificacion) {
            return res.status(404).json({
                mensaje: "Calificación no encontrada"
            });
        }


        const { 
            clave_a, 
            clave_asig, 
            parcial_1, 
            parcial_2, 
            parcial_3 
        } = req.body;



        // Verificar que exista el alumno
        const alumno = await Alumno.findByPk(clave_a);

        if (!alumno) {
            return res.status(404).json({
                mensaje: "El alumno no existe"
            });
        }



        // Verificar que exista la asignación
        const asignacion = await Asignacion_Materia.findByPk(clave_asig);

        if (!asignacion) {
            return res.status(404).json({
                mensaje: "La asignación no existe"
            });
        }



        // Evitar que un alumno tenga dos calificaciones de la misma materia
        const existeCalificacion = await Calificacion.findOne({

            where:{
                clave_a,
                clave_asig,

                clave_cf:{
                    [Op.ne]: id
                }
            }

        });


        if (existeCalificacion) {

            return res.status(400).json({
                mensaje: "El alumno ya tiene una calificación registrada en esa asignación"
            });

        }



        // Calcular promedio
        const promedio_final = 
        (
            Number(parcial_1) +
            Number(parcial_2) +
            Number(parcial_3)

        ) / 3;



        await calificacion.update({

            clave_a,
            clave_asig,

            parcial_1,
            parcial_2,
            parcial_3,

            promedio_final

        });



        res.json(calificacion);


    } catch (error) {

        console.error("Error al editar la calificación:", error);

        res.status(500).json({
            mensaje: "Error al editar la calificación"
        });

    }

};

export const eliminarCalificacion = async (req, res) => {
    try {
        const calificacion = await Calificacion.findByPk(req.params.id);
        if (!calificacion) {
            return res.status(404).json({
                mensaje: "Calificación no encontrada"
            });
        }
        await calificacion.destroy();
        res.json({
            mensaje: "Calificación eliminada correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al eliminar la calificación"
        });
    }
};