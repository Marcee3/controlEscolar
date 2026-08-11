import Profesor from "../models/Profesor.js";
import Usuario from "../models/Usuario.js";

//Obtener profesores
export const getProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.findAll({
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
        res.json(profesores);
    } catch(error) {
        console.error('Error al obtener los profesores:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Obtener profesor por ID
export const getProfesorById = async (req, res) =>{
    try{
        const profesor = await Profesor.findByPk(req.params.id,{
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
        if (!profesor){
            return res.status(404).json({
                mensaje :"Profesor no encontrado"
            });
        }
        res.json(profesor);
    } catch(error){
        console.error('Error al obtener el profesor:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//PENDIENTE REVISAR
export const registrarProfesor = async (req, res) => {
    try {

        const { clave_u, especialidad } = req.body;

        // Verificar que el usuario exista
        const usuario = await Usuario.findByPk(clave_u);

        if (!usuario) {
            return res.status(404).json({
                mensaje: "El usuario no existe"
            });
        }

        // Verificar que tenga el rol Profesor
        if (usuario.rol !== "Profesor") {
            return res.status(400).json({
                mensaje: "El usuario no tiene el rol de Profesor"
            });
        }

        // Verificar que aún no esté registrado como profesor
        const existeProfesor = await Profesor.findOne({
            where: { clave_u }
        });

        if (existeProfesor) {
            return res.status(400).json({
                mensaje: "Este usuario ya está registrado como profesor"
            });
        }

        const profesor = await Profesor.create({
            clave_u,
            especialidad
        });

        res.status(201).json(profesor);

    } catch (error) {

        console.error("Error al registrar profesor:", error);

        res.status(500).json({
            mensaje: "Error al registrar profesor"
        });

    }
};

export const editarProfesor = async (req, res) =>{
    try {
        const { id } = req.params;
        const { clave_u, especialidad} = req.body;
        const profesor = await Profesor.findByPk(id);
        if (!profesor) {
            return res.status(404).json({
                mensaje: "Profesor no encontrado"
            });
        }
        await profesor.update({
            clave_u,
            especialidad
        });
        res.json({
            mensaje: "Profesor actualizado correctamente",
            profesor
        });
    } catch(error){
        console.error("Error al editar profesor:", error);
        res.status(500).json({
            mensaje: "Error al editar profesor"
        });
    }
};

export const eliminarProfesor = async (req, res) =>{
    try{
        const { id } = req.params;
        const profesor = await Profesor.findByPk(id);
        if(!profesor){
            return res.status(404).json({
                mensaje: "Profesor no encontrado"
            });
        }
        await profesor.destroy();
        res.json({ mensaje: "Profesor elimnado"});
    } catch (error){
        console.error("Error al eliminar profesor:", error);
        res.status(500).json({
            mensaje: "Error al eliminar profesor"
        });
    }
}