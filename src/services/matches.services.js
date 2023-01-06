import axios from "axios";
import { API_URL } from "../config.js";
const BASE_URL =  API_URL+"/games/";

export const fetchMatches = async (page) => {
  try {
    const res = await axios.get(BASE_URL);
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

export const createMatch = async (match) => {
  try {
      const { data } = await axios.post(BASE_URL, match);
        if (!data.items || !data.success) {
          throw new Error("No se han recibido bien los datos del servidor :(");
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

export const editMatch = async (match, id) => {
  try {
    const res = await axios.put(BASE_URL + id, match)
    match.id = Number(id);
      if (!res.data.items || !res.data.success) {
        throw new Error("No se han recibido bien los datos del servidor :(");
      }
    return match;
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
    const res = await axios.delete(BASE_URL + id);
      if (!res.data.items || !res.data.success) {
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