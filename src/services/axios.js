import axios from "axios";

const BASE_URL = "http://localhost:3000/stickers";

export const getAllStickers = async () => {
    try {
        const res = await axios.get(BASE_URL);
        return res;
    } catch (error) {
        console.log("Error ", error);
    }
}

export const saveSticker = async (sticker) => {
    try {
        const res = await axios.post(BASE_URL, sticker, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return res;
    } catch (error) {
        console.log("Error ", error);
    }
}


export const editSticker = async (sticker, playerName) => {
    try {
        const res = await axios.put(BASE_URL+"/"+playerName, sticker);
        return res;
    } catch (error) {
        console.log("Error ", error);
    }
}

export const deletSticker = async (playerName) => {
    try {
        const res = await axios.delete(BASE_URL+"/"+playerName);
        return res;
    } catch (error) {
        console.log("Error ", error);
    }
}