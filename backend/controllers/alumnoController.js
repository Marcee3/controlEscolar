import Alumno from "../models/Alumno.js";
import Usuario from "../models/Usuario.js";
import Carrera from "../models/Carrera.js";
import Grupo from "../models/Grupo.js"

//Obtener alumnos
export const getAlumnos = async (req, res) => {
    try{
        const alumnos = await Alumno.findAll({
    include: [
        {
            model: Usuario,
            as: "usuario"
        },
        {
            model: Carrera,
            as: "carrera"
        },
        {
            model: Grupo,
            as: "grupo"
        }
    ]
});
        res.json(alumnos);
    } catch(error){
        console.error('Error al obtener los alumnos:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

//Obtener alumno por ID
export const getAlumnoById = async (req, res) =>{
    try{
        const alumno = await Alumno.findByPk(req.params.id,{
            include:{
                model: Usuario,
                as:"usuario",
                attributes:[
                    "clave_u",
                    "correo",
                    "nombre",
                    "apellidop",
                    "apellidom",
                    "telefono",
                    "rol"
                ]
            }
        });
        if (!alumno){
            return res.status(404).json({
                mensaje :"Alumno no encontrado"
            });
        }
        res.json(alumno);
    } catch(error){
        console.error('Error al obtener el alumno:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//VERIFICAR 
export const registrarAlumno = async (req, res) => {
    try {

        const {
            clave_u,
            clave_c,
            clave_g,
            matricula,
            fecha_ingreso
        } = req.body;

        // Verificar que el usuario exista
        const usuario = await Usuario.findByPk(clave_u);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "El usuario no existe"
            });
        }

        // Verificar que tenga el rol Alumno
        if (usuario.rol !== "Alumno") {
            return res.status(400).json({
                mensaje: "El usuario no tiene el rol de Alumno"
            });
        }

        // Verificar que el usuario no esté registrado como alumno
        const existeAlumno = await Alumno.findOne({
            where: { clave_u }
        });

        if (existeAlumno) {
            return res.status(400).json({
                mensaje: "Este usuario ya está registrado como alumno"
            });
        }

        // Verificar que la carrera exista
        const carrera = await Carrera.findByPk(clave_c);

        if (!carrera) {
            return res.status(404).json({
                mensaje: "La carrera no existe"
            });
        }

        // Verificar que el grupo exista (solo si se envía)
        if (clave_g) {

            const grupo = await Grupo.findByPk(clave_g);

            if (!grupo) {
                return res.status(404).json({
                    mensaje: "El grupo no existe"
                });
            }
        }

        // Verificar que la matrícula no esté repetida
        const existeMatricula = await Alumno.findOne({
            where: { matricula }
        });

        if (existeMatricula) {
            return res.status(400).json({
                mensaje: "La matrícula ya está registrada"
            });
        }

        // Crear alumno
        const alumno = await Alumno.create({
            clave_u,
            clave_c,
            clave_g,
            matricula,
            fecha_ingreso
        });

        res.status(201).json(alumno);

    } catch (error) {

        console.error("Error al registrar alumno:", error);

        res.status(500).json({
            mensaje: "Error al registrar alumno"
        });

    }
};

export const editarAlumno = async (req,res) => {
    try {
        const { id } = req.params;
        const { clave_u, clave_c, clave_g, matricula, fecha_ingreso} = req.body;
        const alumno = await Alumno.findByPk(id);
        if(!alumno) {
           return res.status(404).json({
                mensaje: "Alumno no encontrado"
            }); 
        }
        await alumno.update({ clave_u, clave_c, clave_g, matricula, fecha_ingreso });
        res.json({
            mensaje: "Alumno actualizado",
            alumno
        });
    } catch(error){
        console.error("Error al editar alumno:", error);
        res.status(500).json({
            mensaje: "Error al editar alumno"
        });
    }
};

export const eliminarAlumno = async (req,res) => {
    try{
        const { id } = req.params;
        const alumno = await Alumno.findByPk(id);
        if(!alumno) {
           return res.status(404).json({
                mensaje: "Alumno no encontrado"
            }); 
        }
        await alumno.destroy();
        res.json({ mensaje: "Alumno elimnado"});
    } catch(error){
        console.error("Error al eliminar alumno:", error);
        res.status(500).json({
            mensaje: "Error al eliminar alumno"
        });
    }
}