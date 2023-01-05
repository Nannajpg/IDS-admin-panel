import axios from "axios";
import { API_URL } from "../config.js";

const BASE_URL = API_URL+"/users/";

export const getUsersAmount = async (token) => {
  try {
      const res = await axios.get(BASE_URL+"amount", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
  } catch (error) {
      console.log("Error ", error);
  }
}

export const fetchUsers = async (token, page) => {
  try {
    const res = await axios.get(BASE_URL+"?size=9&page="+page, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw new Error('error fetcheando usuario');
  }
};

export const createUser = async (user, token) => {
  try {
    const { data } = await axios.post(BASE_URL, user, {
      headers: { Authorization: `Bearer ${token}` },
    },);
    return data;
  } catch (e) {
    console.log(e.message);
    throw new Error(e.message);
  }
};

export const deleteUser = async (id, token) => {
  try {
    const res = await axios.delete(BASE_URL + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    throw new Error('error eliminando usuario');
  }
};

export const editUser = async (id, token, user) => {
  try {
    await axios.put((BASE_URL+id), user, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    user.id = Number(id);
    return user;
  } catch (error) {
    throw new Error('error editando usuario');
  }
};
