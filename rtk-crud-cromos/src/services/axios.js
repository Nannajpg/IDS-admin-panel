import axios from "axios";

const BASE_URL = "http://localhost:3000/api/chromes";

export const getStickers = async () => {
    try {
        const res = await axios.get(BASE_URL)
    } catch (error) {
        console.log("Error "+error);
    }
}

export const saveSticker = async (sticker) => {
    try {
        const res = await axios.post(BASE_URL)
    } catch (error) {
        console.log("Error "+error);
    }
}


export const editSticker = async (sticker) => {
    try {
        const res = await axios.put(BASE_URL)
    } catch (error) {
        console.log("Error "+error);
    }
}

export const deleteSticker = async (sticker) => {
    try {
        const res = await axios.delete(BASE_URL)
    } catch (error) {
        console.log("Error "+error);
    }
}



/*
const sticker={
    id:"",
    playerName:"",
    img:"",
    height:"",
    weight:"",
    appareanceRate:""
}*/