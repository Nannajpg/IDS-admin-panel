import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/ads';

export const getAllAds = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export const getSingleAd = async (id) => {
  const res = await axios.get(BASE_URL + `/${id}`)
  return res.data;
}

export const createAd = async (ad) => {
  const res = await axios.post(BASE_URL, ad);
  return res.data;
};

export const deleteAd = async (id) => {
  const res = await axios.delete(BASE_URL + `/${id}`);
  return res;
}

export const editAd = async ({ ad, id }) => {
  const res = await axios.put(BASE_URL + `/${id}`, ad);
  return res;
}
