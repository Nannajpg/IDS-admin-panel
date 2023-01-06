import axios from "axios";
import { API_URL } from "../config.js";

const BASE_URL = API_URL+'/games';

export const fetchMatches = async (token, page, perPage, date) => {
  try {
    const res = await axios.get(BASE_URL + "?size="+ perPage + "&page=" + page + "&togamedate=" + date, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (e) {
    throw new Error('error fetcheando partidos');
  }
}

export const createMatch = async (token, match) => {
  try {
      const res = await axios.post(BASE_URL, match, {
        headers: { Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
      },);
      console.log(res.data);
      return res.data;
  } catch (error) {
      console.log(error.message);
  }
}

export const deleteMatch = async (id) => {
  try {
    const res = await axios.delete(BASE_URL + `/${id}`);
    return res;
  } catch (e) {
    throw new Error('error eliminando partido');
  }
}