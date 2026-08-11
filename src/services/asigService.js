import axios from "axios"; // Importar axios para hacer peticiones HTTP
axios.defaults.withCredentials = true;
const API = "https://controlescolar-1-dx30.onrender.com/api/asignaciones";

//Obtener asignaciones
export const obtenerAsignaciones = async()=>{
    const respuesta = await axios.get(API);
    return respuesta.data;
};

//Obtener asignación por ID
export const obtenerAsignacionPorId = async(id)=>{
    const respuesta = await axios.get(`${API}/${id}`);
    return respuesta.data;
};

//Registrar asignación
export const registrarAsignacion = async(asignacion)=>{
    const respuesta = await axios.post(
        API,
        asignacion
    );
    return respuesta.data;
};

//Eliminar asignación
export const eliminarAsignacion = async(id)=>{
    const respuesta = await axios.delete(
        `${API}/${id}`
    );
    return respuesta.data;
};

//Editar asignación
export const editarAsignacion = async(id, asignacion)=>{
    const respuesta = await axios.put(
        `${API}/${id}`,
        asignacion
    );
    return respuesta.data;
}
