import Calificacion from "../models/Calificacion.js";
import Asignacion_Materia from "../models/Asignacion_Materia.js";
import Materia from "../models/Materia.js";
import Grupo from "../models/Grupo.js";
import Alumno from '../models/Alumno.js';

export const obtenerHistorialAlumno = async(req,res)=>{
    try{

        let clave_a;

        const usuarigito = req.session.usuario;

        if(usuario.rol === "Alumno"){

            const alumno = await Alumno.findOne({
                where:{
                    clave_u: usuario.id
                }
            });

            if(!alumno){
                return res.status(404).json({
                    mensaje:"No se encontró información del alumno"
                });
            }

            clave_a = alumno.clave_a;

        }else{

            return res.status(403).json({
                mensaje:"Solo alumnos pueden consultar este historial"
            });

        }

        const historial = await Calificacion.findAll({
            where:{
                clave_a
            },
            include:[
                {
                    model:Asignacion_Materia,
                    as:"asignacion",
                    include:[
                        {
                            model:Materia,
                            as:"materia"
                        },
                        {
                            model:Grupo,
                            as:"grupo"
                        }
                    ]
                }
            ]
        });

        res.json(historial);

    }catch(error){
        console.error(
            "Error al obtener historial:",
            error
        );

        res.status(500).json({
            mensaje:"Error al obtener historial académico"
        });
    }
};