import axios from "axios";
import { API_URL } from "../config.js";

const BASE_URL = API_URL+"/events/";



export const fetchAllEvents = async (token, page = 0, perPage = 9) => {
  try {
    const res = await axios.get(BASE_URL+ 'all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if(!res.data.items){
      throw new Error ("Ha ocurrido un error con el backend");
    }
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al obtener competiciones"
      );
    }
    throw error;
  }
}

export const fetchEvents = async (token, page = 0, perPage = 7, search = '') => {
  try {
    let queryParams = '&';
    if (search.length > 0) queryParams += 'search=' + search;
    console.log(queryParams)
    const res = await axios.get(BASE_URL+'?page='+page+'&size='+perPage+queryParams, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if(!res.data.success || !res.data.paginate || !res.data.items){
      throw new Error("Ha ocurrido un error con el backend")
    }
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al obtener competiciones"
      );
    } throw error;
  }
}

export const createEvent = async (token, event) => {
  try {
      const res = await axios.post(BASE_URL, event, {
        headers: { Authorization: `Bearer ${token}` },
      });
        if (!res.data.message || !res.data.item) {
          throw new Error("No se han recibido bien los datos del servidor :(");
        }
      return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al obtener competiciones"
      );
    } throw error;
  }
}

export const editEvent = async (token, event, id) => {
  try {
    const res = await axios.put(BASE_URL + id, event, {
      headers: { Authorization: `Bearer ${token}` },
    })
      event.id = Number(id);
      if (!res.data.message || !res.data.success) {
        throw new Error("No se han recibido bien los datos del servidor :(");
      }
    return event;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al editar competición"
      );
    } throw error;
  }
}

export const deleteEvent = async (token, id) => {
  try {
    const res = await axios.delete(BASE_URL + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.data.message || !res.data.success) {
      throw new Error("No se han recibido bien los datos del servidor :(");
    }
    return res;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al eliminar competición"
      );
    } throw error;
  }
}