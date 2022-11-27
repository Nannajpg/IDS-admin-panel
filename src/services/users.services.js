import axios from "axios";
const BASE_URL = "http://localhost:3000/users/";

export const fetchUsers = async (token) => {
  //console.log(token);
  try {
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //console.log(res);
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
    throw new Error('error creando usuario');
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
  console.log("user "+JSON.stringify(user)+"// id: "+id+"// token: "+token);
  /*const newU = {
    "email": "au@g.cbom",
    "name": "EDITsnAI",
    "password": "as",
    "role": "EDITADO"
  }*/
  console.log(JSON.stringify(user));
  console.log(BASE_URL+id);
  try {
    const res = await axios.put((BASE_URL+id), user, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    console.log(JSON.stringify(user))
    user.id = Number(id);
    return user;
  } catch (error) {
    throw new Error('error editando usuario');
  }
};
