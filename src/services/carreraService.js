import axios from "axios"; // Importar axios para hacer peticiones HTTP

const API = "https://controlescolar-1-dx30.onrender.com/api/carreras";


// Obtener carreras
export const obtenerCarreras = async()=>{
    const respuesta = await axios.get(API);
    return respuesta.data;
};

// Obtener carrera por ID
export const obtenerCarreraPorId = async(id)=>{
    const respuesta = await axios.get(`${API}/${id}`);
    return respuesta.data;
};

// Crear carrera
export const crearCarrera = async(carrera)=>{
    const respuesta = await axios.post(
        API,
        carrera
    );
    return respuesta.data;
};

// Eliminar carrera
export const eliminarCarrera = async (id) => {
    const respuesta = await axios.delete(
        `${API}/${id}`
    );
    return respuesta.data;
};

// Editar carrera
export const editarCarrera = async (id, carrera) => {
    const respuesta = await axios.put(
        `${API}/${id}`,
        carrera
    );
    return respuesta.data;
}