import axios from "axios";
axios.defaults.withCredentials=true;

export const obtenerHistorial = async()=>{
    const respuesta = await axios.get(
        "http://localhost:3000/api/historial",
        {
            withCredentials:true
        }
    );

    return respuesta.data;
}