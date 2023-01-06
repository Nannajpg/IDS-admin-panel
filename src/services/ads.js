import axios from "axios";
import { API_URL } from "../config.js";

const BASE_URL = API_URL+"/ads";
const FETCH_URL = `${BASE_URL}/search?size=3&page=`;

export const fetchAds = async (token, { page = 0, adtype, search }) => {
  if (adtype === "") adtype = "&adtype[]=static&adtype[]=float";
  else adtype = `&adtype=${adtype}`;
  if (search === "") search = "&announcer=.*";
  else search = `&announcer=${search}`;
  const res = await axios.get(FETCH_URL + page + adtype + search, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
  return res.data;
};

export const createAd = async (token, ad) => {
  const { announcer, adType, redirecTo, img } = ad;
  const myFile = img;

  const adData = { announcer, adType, redirecTo, myFile };

  const res = await axios.post(BASE_URL, adData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      type: "formData",
      Authorization: 'Bearer ' + token
    },
  });
  return res.data;
};

export const deleteAd = async (token, id) => {
  const res = await axios.delete(BASE_URL + `/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
  return res;
};

export const editAd = async (token, { ad, id }) => {
  const { announcer, adType, redirecTo, img } = ad;
  const myFile = img;
  
  const adData = { announcer, adType, redirecTo, myFile };
  const res = await axios.put(BASE_URL + `/${id}`, adData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      type: "formData",
      Authorization: 'Bearer ' + token
    },
  });

  return res.data;
};
