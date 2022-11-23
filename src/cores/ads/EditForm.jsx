import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import { editAd } from "../../features/ads/adSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditForm = () => {
  const dispatch = useDispatch();
  const ads = useSelector((state) => state.ads.ads);
  const [adFound, setAdFound] = useState();

  const { id } = useParams();

  const edit = (ad, id) => {
    return dispatch(editAd({ ad, id }));
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
