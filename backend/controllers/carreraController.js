import Carrera from '../models/Carrera.js';

// Obtener carreras
export const getCarreras = async (req, res) => {
    try {
        const carreras = await Carrera.findAll();
        res.json(carreras);
    } catch (error) {
        console.error('Error al obtener las carreras:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener carrera por ID
export const getCarreraById = async (req, res) => {
    try {
        const carrera = await Carrera.findByPk(req.params.id);
        if (!carrera) {
            return res.status(404).json({ message: 'Carrera no encontrada' });
        }
        res.json(carrera);
    } catch (error) {
        console.error('Error al obtener la carrera:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear carrera
export const crearCarrera = async (req, res) => {
    const { nombre_c, duracion } = req.body;
    try {
        const nuevaCarrera = await Carrera.create({ nombre_c, duracion });
        res.status(201).json(nuevaCarrera);
    } catch (error) {
        console.error('Error al crear la carrera:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar carrera
export const actualizarCarrera = async (req, res) => {
    const { id } = req.params;
    const { nombre_c, duracion } = req.body;
    try {
        const carrera = await Carrera.findByPk(id);
        if (!carrera) {
            return res.status(404).json({ 
                message: 'Carrera no encontrada' 
            });
        }
        await carrera.update({ nombre_c, duracion });
        res.json(carrera);
    } catch (error) {
        console.error('Error al actualizar la carrera:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar carrera
export const eliminarCarrera = async (req, res) => {
    const { id } = req.params;
    try {
        const carrera = await Carrera.findByPk(id);
        if (!carrera) {
            return res.status(404).json({ 
                message: 'Carrera no encontrada' 
            });
        }
        await carrera.destroy();
        res.json({ mensaje: "Carrera eliminada"});
    } catch(error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};
