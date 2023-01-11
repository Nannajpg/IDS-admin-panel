import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config.js";

const BASE_URL = API_URL+"/promotions";
//const FETCH_URL = `${BASE_URL}/size=7&page=`;

export const fetchAds = async (token, { page = 0, adtype, search }) => {
  if (adtype === "") adtype = "&adtype[]=static&adtype[]=float";
  else adtype = `&adtype=${adtype}`;
  if (search === "") search = "&announcer=.*";
  else search = `&announcer=${search}`;

try {
  const res = await axios.get(BASE_URL + "?page=" + page + adtype + search, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
  if (!res.data) {
    throw new Error("No se han recibido bien los datos del servidor :(");
  }
  return res.data;
  }catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al crear anuncio");
    } toast.error(error.message);
  }
};

export const createAd = async (token, ad) => {
  const { alias, description, promotionType, redirecTo, img } = ad;
  const myFile = img;
  const adData = { alias, description, promotionType, redirecTo, myFile };
  try {
    const res = await axios.post(BASE_URL, adData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
        Authorization: 'Bearer ' + token
      },
    });
      if (!res.data) {
        throw new Error("No se han recibido bien los datos del servidor :(");
      }
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al crear anuncio");
    } toast.error(error.message);
  }
}

export const deleteAd = async (token, id) => {
  try {
    const res = await axios.delete(BASE_URL + `/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
      if (!res.data) {
        throw new Error("No se han recibido bien los datos del servidor :(");
      }
    return res;
  }catch(error) {
    if (error.response) {
      throw new Error(
        error?.response?.data?.message || "Error al eliminar anuncio");
    } throw error;
  }
};

export const editAd = async (token, { ad, id }) => {
  const { alias, description, promotionType, redirecTo, img } = ad;
  const myFile = img;
  const adData = { alias, description, promotionType, redirecTo, myFile };

  try {
    const res = await axios.put(BASE_URL + `/${id}`, adData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      type: "formData",
      Authorization: 'Bearer ' + token
    },
  });
  return res.data;
} catch(error) {
  if (error.response) {
    throw new Error(
      error?.response?.data?.message || "Error al editar anuncio");
    } throw error;
  }
}

