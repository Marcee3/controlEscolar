import axios from "axios"; // Importar axios para hacer peticiones HTTP
axios.defaults.withCredentials = true;
const API = "http://localhost:3000/api/grupos";

// Obtener grupos
export const obtenerGrupos = async() =>{
    const respuesta = await axios.get(API);
    return respuesta.data;
};

//Obtener grupos por ID
export const obtenerGruposPorId = async(id) => {
    const respuesta = await axios.get(`${API}/${id}`);
    return respuesta.data;
};

//Crear grupo
export const crearGrupo = async(grupo)=>{
    const respuesta = await axios.post(
        API,
        grupo
    );
    return respuesta.data;
};

// Eliminar Grupo
export const eliminarGrupo = async (id) => {
    const respuesta = await axios.delete(
        `${API}/${id}`
    );
    return respuesta.data;
};

// Editar grupo
export const editarGrupo = async (id, grupo) => {
    const respuesta = await axios.put(
        `${API}/${id}`,
        grupo
    );
    return respuesta.data;
}