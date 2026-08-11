import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

//Obtener usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}; 

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {

    try {

        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {

            return res.status(404).json({
                message: "Usuario no encontrado"
            });

        }

        const datosUsuario = {
            clave_u: usuario.clave_u,
            correo: usuario.correo,
            nombre: usuario.nombre,
            apellidop: usuario.apellidop,
            apellidom: usuario.apellidom,
            telefono: usuario.telefono,
            rol: usuario.rol,
            contrasena: ""
        };

        res.json(datosUsuario);

    } catch (error) {

        console.error("Error al obtener el usuario:", error);

        res.status(500).json({
            message: "Error interno del servidor"
        });

    }
};

// Crear usuario
export const registrarUsuario = async (req, res) => {
    const { correo, contrasena, nombre, apellidop, apellidom, telefono, rol } = req.body;
    try {
        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const nuevoUsuario = await Usuario.create({ correo, contrasena: hashedPassword, nombre, apellidop, apellidom, telefono, rol });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear el usuario:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Login
export const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const usuario = await Usuario.findOne({ 
            where: { correo } 
        });
        if (!usuario) {
            return res.status(401).json({
            mensaje:"Correo o contraseña incorrectos"
            });
        }
        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({
                mensaje:"Correo o contraseña incorrectos"
            });
        }
        // Guardar el usuario en la sesión
        req.session.usuario = {
            id: usuario.clave_u,
            correo: usuario.correo,
            nombre: usuario.nombre,
            rol: usuario.rol
        };
        res.json({
            mensaje:"Inicio de sesión correcto",
            usuario: req.session.usuario
        });
    } catch (error) {
        console.error('Error al iniciar sesión:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Logout
export const logoutUsuario = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error('Error al cerrar sesión:');
            console.log(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.json({ message: 'Sesión cerrada correctamente' });
        }
    });
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
    const {id} = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await usuario.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {

    const { id } = req.params;

    const {
        correo,
        contrasena,
        nombre,
        apellidop,
        apellidom,
        telefono,
        rol
    } = req.body;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        // Datos que siempre se pueden actualizar
        const datosActualizar = {
            correo,
            nombre,
            apellidop,
            apellidom,
            telefono,
            rol
        };

        // Si se escribió una nueva contraseña,
        // generar un nuevo hash
        if (contrasena && contrasena.trim() !== "") {

            datosActualizar.contrasena =
                await bcrypt.hash(contrasena, 10);

        }

        await usuario.update(datosActualizar);

        res.json({
            message: "Usuario actualizado correctamente",
            usuario
        });

    } catch (error) {

        console.error("Error al actualizar el usuario:", error);

        res.status(500).json({
            message: "Error interno del servidor"
        });

    }
};