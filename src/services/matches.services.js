import axios from "axios";
// const BASE_URL = "http://localhost:3000/matches/";
const BASE_URL = "http://localhost:3000/games/";

export const fetchMatches = async (page) => {
  try {
    const res = await axios.get(BASE_URL);
    console.log(page)
    return res.data;
  } catch (e) {
    throw new Error('error fetcheando partidos');
  }
}

export const createMatch = async (match) => {
  try {
      const res = await axios.post(BASE_URL, match);
      console.log(res.data);
      return res.data;
  } catch (error) {
      console.log(error.message);
  }
}

export const editMatch = async (match, id) => {
  try {
    const res = await axios.put(BASE_URL + id, match)
    match.id = Number(id);
    return match;
  } catch(e) {
    throw new Error('error editando partido');
  }
}

export const deleteMatch = async (id) => {
  try {
    const res = await axios.delete(BASE_URL + id);
    return res;
  } catch (e) {
    throw new Error('error eliminando partido');
  }
}