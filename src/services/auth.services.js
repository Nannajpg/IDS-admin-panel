import axios from "axios";
const URL_LOGIN = "https://backend-staging.playoffside.online/auth/login";
const URL_SIGNUP = "https://backend-staging.playoffside.online/auth/register";

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
        console.log(res);
        if (!res.ok) {
            throw Error("Fetch fallido");
        }
    } catch (error) {
        console.log(error.message);
    }
}