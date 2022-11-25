import axios from "axios";
const BASE_URL = "http://localhost:3000/events/";

export const fetchEvents = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (e) {
    throw new Error('error fetcheando eventos');
  }
}

export const createEvent = async (event) => {
  try {
      const res = await axios.post(BASE_URL, event);
      return res.data;
  } catch (error) {
      console.log(error.message);
  }
}

export const editEvent = async (event, id) => {
  try {
    const res = await axios.put(BASE_URL + id, event)
    event.id = Number(id);
    return event;
  } catch(e) {
    throw new Error('error editando evento');
  }
}

export const deleteEvent = async (id) => {
  try {
    const res = await axios.delete(BASE_URL + id);
    return res;
  } catch (e) {
    throw new Error('error eliminando evento');
  }
}