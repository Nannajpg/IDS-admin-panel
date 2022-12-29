import axios from "axios";

const BASE_URL = 'http://localhost:3000/teams';
const FETCH_URL = `${BASE_URL}?size=6&page=`;

export const fetchTeams = async (token, page = 0, eventid = "", teamname = '') => {
  if (eventid === '') eventid = '&eventid=%';
  else eventid = `&eventid=${eventid}`;
  if (teamname === '') teamname = '&teamname=.*'
  else teamname = `&teamname=${teamname}`

  const { data } = await axios.get(FETCH_URL + page + eventid + teamname,{
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(token);
  console.log(data);
  return data;
}

export const fetchAllTeams = async (token) => {
  const {data}  = await axios.get(BASE_URL + "/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export const getSingleTeam = async (token, id) => {
  const res = await axios.get(BASE_URL + `/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data;
}

export const createTeam = async (token, team) => {

  console.log(team)
  try{
    const res = await axios.post(BASE_URL, team, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
        Authorization: `Bearer ${token}`,
      }
    });
    return res.data;
  }
  catch (error) {
    console.log(error.message)
  }
};

export const deleteTeam = async (token, id) => {
  try {
    const res = await axios.delete(BASE_URL + `/${id}`,{
      headers: { Authorization: `Bearer ${token}` },
    });
  return res;
  } catch (error) {
    console.log(error.message)
  }

}

export const editTeam = async ( token, team, id ) => {

  console.log(team, id)
  try {
    const { data } = await axios.put(BASE_URL + `/${id}`, team, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
        Authorization: `Bearer ${token}`,
      }
    });
    return data;
  } catch (error) {
    console.log(error.message)
  }
 
}
