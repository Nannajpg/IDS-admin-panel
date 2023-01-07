import axios from "axios";
import { API_URL } from "../config.js";

const URL_LOGIN = API_URL+"/auth/login";
const URL_SIGNUP = API_URL+"/auth/register";

export const login = async ({ email, password }) => {
    try {
        const { data } = await axios.post(URL_LOGIN, { email, password });
        if (!data.user || !data.token){
            throw new Error ("Ha ocurrido un error con el backend");
        }
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(
              error?.response?.data?.message || "Error desconocido del servidor"
            );
        }
        throw error;
    }
}

export const signup = async (user) => {
    try {
        const res = await axios.post(URL_SIGNUP, user);
        if (!res.data.token || !res.data.user) {
            throw new Error("No se han recibido bien los datos del servidor :(");
        }
    } catch (error) {
        if (error.response) {
            throw new Error(
                error?.response?.data?.message || "Error al registrar"
            );
        } throw error;
    } 
}