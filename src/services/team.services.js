import axios from "axios";
import { API_URL } from "../config.js";

const BASE_URL = API_URL+'/teams';
const FETCH_URL = `${BASE_URL}?size=6&page=`;

export const fetchTeams = async (page = 0, eventid = "", teamname = '') => {
  if (eventid === '') eventid = '&eventid=%';
  else eventid = `&eventid=${eventid}`;
  if (teamname === '') teamname = '&teamname=.*'
  else teamname = `&teamname=${teamname}`
  
  const { data } = await axios.get(FETCH_URL + page + eventid + teamname);
  console.log(data);
  return data;
}

export const fetchAllTeams = async () => {
  const {data}  = await axios.get(BASE_URL + "/all");
  return data;
}

export const getSingleTeam = async (id) => {
  const res = await axios.get(BASE_URL + `/${id}`)
  return res.data;
}

export const createTeam = async (team) => {

  console.log(team)
  try{
    const res = await axios.post(BASE_URL, team, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
      }
    });
    return res.data;
  }
  catch (error) {
    console.log(error.message)
  }
};

export const deleteTeam = async (id) => {
  try {
    const res = await axios.delete(BASE_URL + `/${id}`);
  return res;
  } catch (error) {
    console.log(error.message)
  }

}

export const editTeam = async ( team, id ) => {

  console.log(team, id)
  try {
    const { data } = await axios.put(BASE_URL + `/${id}`, team, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
      }
    });
    return data;
  } catch (error) {
    console.log(error.message)
  }
 
}
