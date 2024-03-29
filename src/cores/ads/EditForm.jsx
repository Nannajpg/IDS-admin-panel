import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editAd } from "../../features/ads/adSlice";
import { toast } from "react-toastify";
import { setLoading } from "../../features/global/globalSlice";
import { useNavigate } from "react-router-dom";

const EditForm = () => {
  const dispatch = useDispatch();
  const ads = useSelector((state) => state.ads.ads);
  const {userToken} = useSelector((state) => state.auth);
  const [adFound, setAdFound] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const edit = async (ad, id) => {
    try {
      dispatch(setLoading(true));
      await dispatch(editAd({userToken, ad, id})).unwrap();
      navigate("/ads");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (id) {
      setAdFound(ads.find((ad) => ad.id === Number(id)));
    }
  },[id, ads]);


  return <Form onSubmit={edit} id={id} toEditAd={adFound} />;
};

export default EditForm;
