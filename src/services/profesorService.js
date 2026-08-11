import axios from "axios"; // Importar axios para hacer peticiones HTTP
axios.defaults.withCredentials = true;
const API = "http://localhost:3000/api/profesores";

//Obtener profesores
export const obtenerProfesores = async()=>{
    const respuesta = await axios.get(API);
    return respuesta.data;
};

//Obtener profesor por ID
export const obtenerProfesorPorId = async(id)=>{
    const respuesta = await axios.get(`${API}/${id}`);
    return respuesta.data;
};

//Registrar profesor
export const registrarProfesor = async(profesor)=>{
    const respuesta = await axios.post(
        API,
        profesor
    );
    return respuesta.data;
};

//Eliminar profesor
export const eliminarProfesor = async(id)=>{
    const respuesta = await axios.delete(
        `${API}/${id}`
    );
    return respuesta.data;
};

//Editar profesor
export const editarProfesor = async(id, profesor)=>{
    const respuesta = await axios.put(
        `${API}/${id}`,
        profesor
    );
    return respuesta.data;
}
