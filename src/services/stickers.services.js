import axios from "axios";

import { API_URL } from "../config.js";

const BASE_URL = API_URL+"/stickers";

export const getAllStickers = async (token, page = 0) => {
    try {
        const res = await axios.get(BASE_URL+"?size=4&page="+page, {
            headers:{
                Authorization: "Bearer " + token,
            }
        });
        if (!res.data.items || !res.data.success) {
            throw new Error("No se han recibido bien los datos del servidor :(");
        }
        return res;
    } catch (error) {
        if (error.response) {
            throw new Error(
                error?.response?.data?.message || "Error al obtener los cromos"
            );
        } throw error;
    }
}

export const saveSticker = async (token, sticker) => {
    try {
        const res = await axios.post(BASE_URL, sticker, {
            headers: {Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
        }
        },);
        if (!res.data.message) {
            throw new Error("Ha ocurrido un fallo con el backend");
        }

        return res;
    } catch (error) {
        if (error.response) {
            throw new Error(
                error?.response?.data?.message || "Error al guardar cromo"
            );
        } throw error;
    }
}


export const editSticker = async (token, sticker, id) => {
    try {
        const res = await axios.put(BASE_URL+"/"+id, sticker, {
            headers:{
                Authorization: "Bearer " + token, 
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res.data.success)
        if (!res.data.message || !res.data.success) {
            throw new Error("Ha ocurrido un fallo con el backend");
        }
        

        return res;
    } catch (error) {
        if (error.response) {
            throw new Error(
                error?.response?.data?.message || "Error al editar cromo"
            );
        } throw error;
    }
}

export const deleteSticker = async (token, id) => {
    try {
        const res = await axios.delete(BASE_URL+ "/" + id, {
            headers:{
                Authorization: "Bearer " + token,
            }
        });
        return res;
    } catch (error) {
        if (error.response) {
            throw new Error(
                error?.response?.data?.message || "Error al eliminar cromo"
            );
        } throw error;
    }
}