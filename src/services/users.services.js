import axios from "axios";
import { API_URL } from "../config.js";

const BASE_URL = API_URL+"/users/";
const URL_AMOUNTS = API_URL+"/admin/countAll";

export const fetchUsers = async (token, page) => {
  try {
    const res = await axios.get(BASE_URL + "?size=7&page=" + page, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.data.items || !res.data.success) {
      throw new Error("No se han recibido bien los datos del servidor :(");
    }
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error fetcheando usuario"
      );
    } throw error;
  }
};

export const createUser = async (user, token) => {
  try {
    const { data } = await axios.post(BASE_URL, user, {
      headers: { Authorization: `Bearer ${token}` },
    },);
    console.log("data:", data)
    if (!data.success || !data.message) {
      throw new Error(
        "Ha ocurrido un error con el backend");
    }
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error creando usuario"
      );
    } throw error;
  }
};

export const deleteUser = async (id, token) => {
  try {
    const res = await axios.delete(BASE_URL + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.data.success || !res.data.message) {
      throw new Error(
        "Ha ocurrido un error con el backend"
      );
    }
    return res;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'error eliminando usuario'
      );
    } throw error;
  }
};

export const editUser = async (id, token, user) => {
  try {
    await axios.put((BASE_URL+id), user, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    user.id = Number(id);
    if (!user) {
      throw new Error(
        "Ha ocurrido un error con el backend"
      );
    }
    return user;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || 'Error editando usuario'
      );
    } throw error;
  }
};

export const getDashboardAmounts = async (token) => {
  try {
      const res = await axios.get(URL_AMOUNTS,  {
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!res.data?.item) {
        throw new Error("Error al decodificar la respuesta de los contadores del dashboard");
      }

      return res.data.item;        
  } catch (error) {
      if (error.response) {
          throw new Error(
              error?.response?.data?.message || "Error al obtener cantidades"
          );
      } throw error;
  } 
}
