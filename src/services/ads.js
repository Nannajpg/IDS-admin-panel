import axios from "axios";

const BASE_URL = 'http://localhost:8080/ads';
const FETCH_URL = `${BASE_URL}/search?size=6&page=`;

export const fetchAds = async (page = 0, adtype, search) => {
  if (adtype === '') adtype = '&adtype[]=static&adtype[]=float';
  else adtype = `&adtype=${adtype}`;
  if (search === '') search = '&announcer=.*'
  else search = `&announcer=${search}`
  const res = await axios.get(FETCH_URL + page + adtype + search);
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
