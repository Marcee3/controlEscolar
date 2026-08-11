import Periodo_Escolar from "../models/Periodo_Escolar.js";

//Obtener periodos escolares
export const getPE = async (req, res) => {
    try{
        const periodos = await Periodo_Escolar.findAll();
        res.json(periodos);
    } catch(error) {
        console.error('Error al obtener los periodos:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Obtener periodo por ID
export const getPEById = async (req,res) => {
    try {
        const periodos = await Periodo_Escolar.findByPk(req.params.id);
        if (!periodos) {
            return res.status(404).json({ message: 'Periodo no encontrado' });
        }
        res.json(periodos);
    } catch (error) {
        console.error('Error al obtener el periodos:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//Crear periodo escolar
export const registrarPeriodo = async (req,res) => {
    const { nombre_periodo, fecha_inicio, fecha_fin } = req.body;
    try {
        const nuevoPeriodo = await Periodo_Escolar.create({ nombre_periodo, fecha_inicio, fecha_fin });
        res.status(201).json(nuevoPeriodo);
    } catch(error) {
        console.error('Error al crear el periodo:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' }); 
    }
};

//Editar periodo
export const editarPeriodo = async(req, res) =>{
    const { id } = req.params;
    const { nombre_periodo, fecha_inicio, fecha_fin } = req.body;
    try {
        const periodo = await Periodo_Escolar.findByPk(id);
        if (!periodo) {
            return res.status(404).json({ message: 'Periodo no encontrado' });
        }
        await periodo.update({ nombre_periodo, fecha_inicio, fecha_fin });
        res.json(periodo);
    } catch (error) {
        console.error('Error al obtener el periodos:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Eliminar periodo
export const eliminarPeriodo = async (req,res) => {
    const {id} = req.params;
    try{
        const periodo = await Periodo_Escolar.findByPk(id);
        if(!periodo) {
            return res.status(404).json({ message : 'Periodo no encontrado'});
        }
        await periodo.destroy();
        res.json({ message: 'Periodo eliminado correctamente' });
    } catch(error){
        console.error('Error al eliminar el periodos:');
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}