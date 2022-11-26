import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ action, id, toEditTeam }) => {
  const teamNameRef = useRef(null);
  const badgeRef = useRef(null);
  const eventRef = useRef(null);
  const [imagen, setImagen] = useState();
  const [imgToEdit, setImgToEdit] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(toEditTeam);
    if (toEditTeam) {
      teamNameRef.current.value = toEditTeam.name;
      eventRef.current.value = toEditTeam.idEvents;
      setImagen(toEditTeam.badge);
      setImgToEdit(true);
    }
  }, [toEditTeam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const team = {
      name: teamNameRef.current.value,
      idEvents: eventRef.current.value,
      myFile: badgeRef.current.files[0],
    };
    teamNameRef.current.value = "";
    badgeRef.current.value = null;
    eventRef.current.value = "";
    await action(team, id);
    navigate("/teams");
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="bg-zinc-800 w-1/3 p-4 mt-24"
    >
      <label htmlFor="teamName" className="block text-xs font-bold mb-2">
        Nombre del equipo
      </label>
      <input
        id="teamName"
        type="text"
        placeholder="Nombre del equipo"
        ref={teamNameRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        required
      />

      <label htmlFor="shield" className="block text-xs font-bold mb-2">
        Url del escudo del equipo
      </label>
      <input
        id="shield"
        type="file"
        placeholder="Escudo"
        accept=".jpg, .jpeg, .png"
        ref={badgeRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2 file:rounded-md file:border-none file:bg-zinc-700 file:text-white hover:file:bg-zinc-800 hover:file:cursor-pointer"
        required={toEditTeam ? false : true}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImagen(file);
            setImgToEdit(false);
          }
        }}
      />

      <label htmlFor="event" className="block text-xs font-bold mb-2">
        Evento donde participa
      </label>
      <input
        type="number"
        id="event"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        ref={eventRef}
        placeholder="Evento donde participa"
        required
      />

      <button className="bg-indigo-600 px-2 py-1" type="Submit">
        Guardar
      </button>
      <button
        className="bg-red-700 px-2 py-1 hover:bg-red-800 md:ml-5"
        onClick={() => {
          navigate("/teams");
        }}
      >
        Cancelar
      </button>
      {imagen && (
        <img src={imgToEdit ? imagen : URL.createObjectURL(imagen)} alt="" />
      )}
    </form>
  );
};

export default Form;
