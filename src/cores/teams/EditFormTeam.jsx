import React from "react";
/* import { useDispatch } from "react-redux"; */
import Form from "./Form";
/* import { editAd } from "../../features/ads/adSlice"; */
import { useParams } from "react-router-dom";

const EditFormTeam = () => {
  /* const dispatch = useDispatch(); */

  const { id } = useParams();

  const edit = (team, id) => {
    /* return dispatch(editAd({ team, id })); */
  };

  return <Form action={edit} id={id} />;
};

export default EditFormTeam;
