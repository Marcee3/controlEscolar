import axios from "axios"; // Importar axios para hacer peticiones HTTP
axios.defaults.withCredentials = true;
const API = "http://localhost:3000/api/alumnos";

//Obtener alumnos
export const obtenerAlumnos = async()=>{
    const respuesta = await axios.get(API);
    return respuesta.data;
};

//Obtener alumno por ID
export const obtenerAlumnoPorId = async(id)=>{
    const respuesta = await axios.get(`${API}/${id}`);
    return respuesta.data;
};

//Registrar alumno
export const registrarAlumno = async(alumno)=>{
    const respuesta = await axios.post(
        API,
        alumno
    );
    return respuesta.data;
};

//Eliminar alumno
export const eliminarAlumno = async(id)=>{
    const respuesta = await axios.delete(
        `${API}/${id}`
    );
    return respuesta.data;
};

//Editar alumno
export const editarAlumno = async(id, alumno)=>{
    const respuesta = await axios.put(
        `${API}/${id}`,
        alumno
    );
    return respuesta.data;
}
