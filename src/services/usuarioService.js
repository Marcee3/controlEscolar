import axios from "axios"; // Importar axios para hacer peticiones HTTP
axios.defaults.withCredentials = true;
const API = "http://localhost:3000/api/usuarios";

//Obtener usuarios
export const obtenerUsuarios = async()=>{
    const respuesta = await axios.get(API);
    return respuesta.data;
};

//Obtener usuario por ID
export const obtenerUsuarioPorId = async(id)=>{
    const respuesta = await axios.get(`${API}/${id}`);
    return respuesta.data;
};

//Registrar usuario
export const registrarUsuario = async(usuario)=>{
    const respuesta = await axios.post(
        API,
        usuario
    );
    return respuesta.data;
};

//Eliminar usuario
export const eliminarUsuario = async(id)=>{
    const respuesta = await axios.delete(
        `${API}/${id}`
    );
    return respuesta.data;
};

//Editar usuario
export const editarUsuario = async(id, usuario)=>{
    const respuesta = await axios.put(
        `${API}/${id}`,
        usuario
    );
    return respuesta.data;
}

//Login usuario
export const loginUsuario = async(usuario)=>{
    try {
        const respuesta = await axios.post(
        "http://localhost:3000/api/login",
        usuario,
        {
            withCredentials: true, // Permite enviar cookies con la solicitud
        }
    );    
    return respuesta.data;
} catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
}
};

// Cerrar sesion
export const cerrarSesion = async()=>{
    const respuesta = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        {
            withCredentials:true
        }
    );

    return respuesta.data;
};