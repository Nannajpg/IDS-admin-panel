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
        return res;
    } catch (error) {
        console.log("Error ", error);
    }
}

export const saveSticker = async (token, sticker) => {
    try {
        const res = await axios.post(BASE_URL, sticker, {
            headers: {Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
        }
        },);
        return res;
    } catch (error) {
        console.log("Error ", error);
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
        return res;
    } catch (error) {
        console.log("Error ", error);
    }
}

export const deleteSticker = async (token, id) => {
    try {
        const res = await axios.delete(BASE_URL+"/"+id, {
            headers:{
                Authorization: "Bearer " + token,
            }
        });
        return res;
    } catch (error) {
        console.log("Error ", error);
    }
}