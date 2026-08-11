import axios from "axios";
axios.defaults.withCredentials=true;

export const obtenerHistorial = async()=>{
    const respuesta = await axios.get(
        "https://controlescolar-1-dx30.onrender.com/api/historial",
        {
            withCredentials:true
        }
    );

    return respuesta.data;
}