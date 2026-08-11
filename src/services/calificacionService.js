import axios from "axios"; // Importar axios para hacer peticiones HTTP
axios.defaults.withCredentials = true;
const API = "http://localhost:3000/api/calificaciones";

//Obtener calificaciones
export const obtenerCalificaciones = async()=>{
    const respuesta = await axios.get(API);
    return respuesta.data;
};

//Obtener calificación por ID
export const obtenerCalificacionPorId = async(id)=>{
    const respuesta = await axios.get(`${API}/${id}`);
    return respuesta.data;
};

//Registrar calificación
export const registrarCalificacion = async(calificacion)=>{
    const respuesta = await axios.post(
        API,
        calificacion
    );
    return respuesta.data;
};

//Eliminar calificación
export const eliminarCalificacion = async(id)=>{
    const respuesta = await axios.delete(
        `${API}/${id}`
    );
    return respuesta.data;
};

//Editar calificación
export const editarCalificacion = async(id, calificacion)=>{
    const respuesta = await axios.put(
        `${API}/${id}`,
        calificacion
    );
    return respuesta.data;
}
