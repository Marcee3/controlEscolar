import axios from "axios"; // Importar axios para hacer peticiones HTTP
axios.defaults.withCredentials = true;
const API = "http://localhost:3000/api/materias";

//Obtener materias
export const obtenerMaterias = async()=>{
    const respuesta = await axios.get(API);
    return respuesta.data;
};

//Obtener materia por ID
export const obtenerMateriaPorId = async(id)=>{
    const respuesta = await axios.get(`${API}/${id}`);
    return respuesta.data;
};

//Registrar materia
export const registrarMateria = async(materia)=>{
    const respuesta = await axios.post(
        API,
        materia
    );
    return respuesta.data;
};

//Eliminar materia
export const eliminarMateria = async(id)=>{
    const respuesta = await axios.delete(
        `${API}/${id}`
    );
    return respuesta.data;
};

//Editar materia
export const editarMateria = async(id, materia)=>{
    const respuesta = await axios.put(
        `${API}/${id}`,
        materia
    );
    return respuesta.data;
}
