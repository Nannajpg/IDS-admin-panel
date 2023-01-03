import axios from "axios";
import { API_URL } from "../config.js";

const URL_LOGIN = API_URL+"/auth/login";
const URL_SIGNUP = API_URL+"/auth/register";

export const login = async ({ email, password }) => {
    try {
        const { data } = await axios.post(URL_LOGIN, { email, password });
        return data;
    } catch (error) {
        throw new Error('Datos incorrectos');
    }
}

export const signup = async (user) => {
    try {
        const res = await axios.post(URL_SIGNUP, user);
        if (!res.ok) {
            throw Error("Fetch fallido");
        }
    } catch (error) {
        console.log(error.message);
    }
}