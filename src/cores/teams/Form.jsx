import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ action, id, toEditTeam }) => {
  const teamNameRef = useRef(null);
  const shieldRef = useRef(null);
  const eventRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (toEditTeam) {
      teamNameRef.current.value = toEditTeam.teamName;
      eventRef.current.value = toEditTeam.event;
      shieldRef.current.value = toEditTeam.shield;
    }
  }, [toEditTeam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const team = {
      teamName: teamNameRef.current.value,
      event: eventRef.current.value,
      shield: shieldRef.current.files[0],
    };
    teamNameRef.current.value = "";
    shieldRef.current.value = null;
    eventRef.current.value = "";
    await action(team, id);
    navigate("/teams");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 w-1/3 p-4 mt-24">
      <label htmlFor="teamName" className="block text-xs font-bold mb-2">
        Nombre del equipo
      </label>
      <input
        name="teamName"
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
        name="shield"
        type="file"
        placeholder="Escudo"
        accept=".jpg, .jpeg, .png"
        ref={shieldRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2 file:rounded-md file:border-none file:bg-zinc-700 file:text-white hover:file:bg-zinc-800 hover:file:cursor-pointer"
        required
      />

      <label htmlFor="event" className="block text-xs font-bold mb-2">
        Evento donde participa
      </label>
      <select
        name="event"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        ref={eventRef}
        placeholder="Evento donde participa"
        required
      >
        <option value="">Evento donde participa</option>
        <option value="mundial">Mundial</option>
        <option value="champions">Champions</option>
      </select>

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
    </form>
  );
};

export default Form;
