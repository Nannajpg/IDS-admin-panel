import axios from "axios";

const BASE_URL = "https://backend-staging.playoffside.online/ads";
const FETCH_URL = `${BASE_URL}/search?size=6&page=`;

export const fetchAds = async (page = 0, adtype, search) => {
  if (adtype === "") adtype = "&adtype[]=static&adtype[]=float";
  else adtype = `&adtype=${adtype}`;
  if (search === "") search = "&announcer=.*";
  else search = `&announcer=${search}`;
  const res = await axios.get(FETCH_URL + page + adtype + search);

  res.data.ads.forEach(ad => ad.img = BASE_URL.slice(0,22) + ad.img);

  return res.data;
};

export const getSingleAd = async (id) => {
  const res = await axios.get(BASE_URL + `/${id}`);
  return res.data;
};

export const createAd = async (ad) => {
  const { announcer, adType, redirecTo, img } = ad;
  const myFile = img;

  const adData = { announcer, adType, redirecTo, myFile };

  const res = await axios.post(BASE_URL, adData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      type: "formData",
    },
  });
  console.log(res.data);
  return res.data;
};

export const deleteAd = async (id) => {
  const res = await axios.delete(BASE_URL + `/${id}`);
  return res;
};

export const editAd = async ({ ad, id }) => {
  const { announcer, adType, redirecTo, img } = ad;
  const myFile = img;

  const adData = { announcer, adType, redirecTo, myFile };

  const res = await axios.put(BASE_URL + `/${id}`, adData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      type: "formData",
    },
  });

  return res.data;
};
