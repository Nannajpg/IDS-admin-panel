import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Form = ({ action, id }) => {
  const teamNameRef = useRef(null);
  const shieldRef = useRef(null);
  const playersRef = useRef(null);
  const eventRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const team = {
      teamName: teamNameRef.current.value,
      event: eventRef.current.value,
      playersRef: playersRef.current.value,
      shield: shieldRef.current.value,
    };
    teamNameRef.current.value = "";
    shieldRef.current.value = "";
    eventRef.current.value = "";
    playersRef.current.value = "";
    await action(team, id);
    navigate("/teamList");
  };

  const optionsSelect = [
    { value: "mbappe", label: "Mbappe" },
    { value: "messi", label: "Messi" },
    { value: "neymar", label: "Neymar" },
    { value: "cristiano", label: "Cristiano" },
  ];

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
        type="text"
        placeholder="Url escudo"
        ref={shieldRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
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

      <label htmlFor="players" className="block text-xs font-bold mb-2">
        Jugadores del equipo
      </label>
      <Select
        name="players"
        options={optionsSelect}
        isMulti
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        ref={playersRef}
        required
        styles={{
          menu: (provide) => ({
            ...provide,
            color: "#F1F5FD",
            background: "rgb(82, 82, 91)",
          }),
          control: (provide) => ({
            ...provide,
            color: "#F1F5FD",
            background: "rgb(82, 82, 91)",
          }),
          option: (provide, { isFocused }) => ({
            ...provide,
            background: isFocused ? "rgb(39 39 42)" : "default",
            color: "#F1F5FD",
          }),
          multiValue: (provide) => ({
            ...provide,
            background: "rgb(39 39 42)",
            color: "#F1F5FD",
          }),
          input: (provide) => ({
            ...provide,
            color: "#F1F5FD",
          }),
          multiValueLabel: (provide) => ({
            ...provide,
            color: "#F1F5FD",
          }),
        }}
      />
      <button className="bg-indigo-600 px-2 py-1" type="Submit">
        Guardar
      </button>
      <button
        className="bg-red-700 px-2 py-1 hover:bg-red-800 md:ml-5"
        onClick={() => {
          navigate("/teamList");
        }}
      >
        Cancelar
      </button>
    </form>
  );
};

export default Form;
