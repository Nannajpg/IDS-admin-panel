import axios from "axios";
import { API_URL } from "../config.js";

const BASE_URL = API_URL+"/events/";

export const fetchAllEvents = async (token, page = 0, perPage = 9) => {
  try {
    const res = await axios.get(BASE_URL+'all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch(e) {
    throw new Error(
      'Error al obtener todos los eventos'
    );
  }
}

export const fetchEvents = async (token, page = 0, perPage = 9) => {
  try {
    const res = await axios.get(BASE_URL+'?page='+page+'&size='+perPage, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch(e) {
    throw new Error(
      'Error al obtener eventos'
    );
  }
}

export const createEvent = async (token, event) => {
  try {
      const res = await axios.post(BASE_URL, event, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
  } catch (error) {
      console.log(error.message);
  }
}

export const editEvent = async (token, event, id) => {
  try {
    const res = await axios.put(BASE_URL + id, event, {
      headers: { Authorization: `Bearer ${token}` },
    })
    event.id = Number(id);
    return event;
  } catch(e) {
    throw new Error('error editando evento');
  }
}

export const deleteEvent = async (token, id) => {
  try {
    const res = await axios.delete(BASE_URL + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (e) {
    throw new Error('error eliminando evento');
  }
}