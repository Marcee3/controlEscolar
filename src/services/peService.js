import axios from "axios"; // Importar axios para hacer peticiones HTTP

const API = "http://localhost:3000/api/periodos";

// Obtener periodos
export const obtenerPeriodos = async() =>{
    const respuesta = await axios.get(API);
    return respuesta.data;
};

//Obtener periodos por ID
export const obtenerPeriodosPorId = async(id) => {
    const respuesta = await axios.get(`${API}/${id}`);
    return respuesta.data;
};

//Crear periodo
export const crearPeriodo = async(periodo)=>{
    const respuesta = await axios.post(
        API,
        periodo
    );
    return respuesta.data;
};

// Eliminar periodo
export const eliminarPeriodo = async (id) => {
    const respuesta = await axios.delete(
        `${API}/${id}`
    );
    return respuesta.data;
};

// Editar carrera
export const editarPeriodo = async (id, periodo) => {
    const respuesta = await axios.put(
        `${API}/${id}`,
        periodo
    );
    return respuesta.data;
}