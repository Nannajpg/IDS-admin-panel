import axios from "axios";

const BASE_URL = 'http://localhost:8080/teams';
const FETCH_URL = `${BASE_URL}/search?size=6&page=`;

export const fetchTeams = async (page = 0, event, search) => {
  if (event === '') event = '&event[]=static&event[]=float';
  else event = `&event=${event}`;
  if (search === '') search = '&teamName=.*'
  else search = `&teamName=${search}`
  const res = await axios.get(FETCH_URL + page + event + search);
  return res.data;
}

export const getSingleTeam = async (id) => {
  const res = await axios.get(BASE_URL + `/${id}`)
  return res.data;
}

export const createTeam = async (team) => {
  const res = await axios.post(BASE_URL, team);
  return res.data;
};

export const deleteTeam = async (id) => {
  const res = await axios.delete(BASE_URL + `/${id}`);
  return res;
}

export const editTeam = async ({ team, id }) => {
  const res = await axios.put(BASE_URL + `/${id}`, team);
  return res;
}
