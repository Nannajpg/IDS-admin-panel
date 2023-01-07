import axios from "axios";

import { API_URL } from "../config.js";

const BASE_URL = API_URL+'/teams';
const FETCH_URL = `${BASE_URL}?size=3&page=`;

export const fetchTeams = async (token, page = 0, eventid = "", teamname = '') => {
  if (eventid === '') eventid = '&eventid=%';
  else eventid = `&eventid=${eventid}`;
  if (teamname === '') teamname = '&teamname=.*'
  else teamname = `&teamname=${teamname}`

  const { data } = await axios.get(FETCH_URL + page + eventid + teamname,{
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export const fetchAllTeams = async (token) => {
  try {
    const {data}  = await axios.get(BASE_URL + "/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!data.success) {
      throw new Error("No se han recibido bien los datos del servidor :(");
    }
      return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al obtener equipos"
      );
    } throw error;
  }
}

export const getSingleTeam = async (token, id) => {
  try {
    const res = await axios.get(BASE_URL + `/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
  }); 
  if (!res.success) {
      throw new Error("No se han recibido bien los datos del servidor :(");
  }
return res.data;
} catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al obtener equipo"
      );
    } throw error;
  }
}

export const createTeam = async (token, team) => {
  try {
    const res = await axios.post(BASE_URL, team, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(res.data);
      if (!res.data) {
        throw new Error("No se han recibido bien los datos del servidor :(");
      }
  }catch(error) {
  if (error.response){
    throw new Error(
      error?.response?.data?.message || "Error al crear equipo");
    } throw error;
  }
}

export const deleteTeam = async (token, id) => {
  try {
    const res = await axios.delete(BASE_URL + `/${id}`,{
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.data) {
      throw new Error("No se han recibido bien los datos del servidor :(");
    }
  return res;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al eliminar equipo"
      );
    }
    throw error;
  }
}

export const editTeam = async ( token, team, id ) => {
  try {
    const { data } = await axios.put(BASE_URL + `/${id}`, team, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
        Authorization: `Bearer ${token}`,
      }
    });
    if (!data.success || !data.message) {
      throw new Error("No se han recibido bien los datos del servidor :(");
    }
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al editar equipo"
      );
    }
    throw error;
  }
}
