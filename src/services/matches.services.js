import axios from "axios";
import { API_URL } from "../config.js";

const BASE_URL = API_URL+'/games';

export const fetchMatches = async (token, page, perPage, date) => {
  try {
    const res = await axios.get(BASE_URL + "?size="+ perPage + "&page=" + page + "&togamedate=" + date, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.data.items || !res.data.success) {
      throw new Error("No se han recibido bien los datos del servidor :(");
    }
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al obtener partidos"
      );
    }
    throw error;
  } 
}

export const createMatch = async (token, match) => {
  try {
      const {data} = await axios.post(BASE_URL, match, {
        headers: { Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
      },);
      if (!data.item || !data.success || !data.message) {
        throw new Error("Negro");
      }
      return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al obtener partidos"
      );
    }
    throw error;
  }
}

export const deleteMatch = async (id) => {
  try {
    const res = await axios.delete(BASE_URL + `/${id}`);
    console.log(res.data)
      if (!res.data.message || !res.data.success) {
        throw new Error("No se han recibido bien los datos del servidor :(");
      }
    return res;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al obtener partidos"
      );
    }
    throw error;
  } 
}