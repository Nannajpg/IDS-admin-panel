import axios from "axios";
import { API_URL } from "../config.js";

const BASE_URL = API_URL+"/stickers";

export const getAllStickers = async (token, page = 0) => {
    try {
        const res = await axios.get(BASE_URL+"?size=8&page="+page, {
            headers:{
                Authorization: "Bearer " + token,
            }
        });
        return res;
    } catch (error) {
        console.log("Error ", error);
    }
}

export const getStickersAmount = async (token, page = 0) => {
    try {
        const res = await axios.get(BASE_URL+"/amount", {
            headers:{
                Authentication: "Bearer " + token,
            }
        }); //"/amount" no exister
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
        console.log(sticker)
        console.log(id)
        console.log(token)
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

export const deletSticker = async (token, playerName) => {
    try {
        const res = await axios.delete(BASE_URL+"/"+playerName, {
            headers:{
                Authorization: "Bearer " + token,
            }
        });
        return res;
    } catch (error) {
        console.log("Error ", error);
    }
}