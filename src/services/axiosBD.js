import axios from "axios";

const BASE_URL= "http://localhost:3000/api/users";

export const getAll = async () => {
    try {
        const res = await axios.get(BASE_URL);
        return res.data;
    } catch (error) {
        console.log("Error getAll: " + error)
    }
}

export const createUser = async (user) => {
    try {
        const res = await axios.post(BASE_URL, user);
        return res.data;
    } catch (error) {
        console.log("Error createUser: " + error)
    }
}

export const createEvent = async (user) => {
    try {
        const res = await axios.post(BASE_URL, user);
        return res.data;
    } catch (error) {
        console.log("Error createEvent: " + error)
    }
}

