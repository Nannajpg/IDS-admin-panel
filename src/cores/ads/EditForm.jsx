import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import * as adsServices from "../../services/ads";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editAd } from "../../features/ads/adSlice";

const EditForm = () => {
  const dispatch = useDispatch();
  const ads = useSelector((state) => state.ads.ads);
  const token = useSelector((state) => state.auth.userToken);
  const [adFound, setAdFound] = useState();

  const { id } = useParams();

  const edit = async (ad, id) => {
    await adsServices.editAd(token, { ad, id });
    dispatch(editAd())
  };

  useEffect(() => {
    if (id) {
      setAdFound(
        ads.find(ad => ad.id === Number(id))
      );
    }
  }, []);


  return <Form action={edit} id={id} toEditAd={adFound} />;
};

export default EditForm;
