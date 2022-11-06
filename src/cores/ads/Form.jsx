import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ action, id }) => {
  const announcerRef = useRef(null);
  const imgRef = useRef(null);
  const adTypeRef = useRef(null);
  const redirecToRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ad = {
      announcer: announcerRef.current.value,
      adType: adTypeRef.current.value,
      redirecTo: redirecToRef.current.value,
      img: imgRef.current.value,
    };
    announcerRef.current.value = "";
    imgRef.current.value = "";
    adTypeRef.current.value = "";
    redirecToRef.current.value = "";
    await action(ad, id);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mt-24">
      <label htmlFor="announcer" className="block text-xs font-bold mb-2">
        Titulo
      </label>
      <input
        name="announcer"
        type="text"
        placeholder="Titulo"
        ref={announcerRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        required
      />
      <label htmlFor="image" className="block text-xs font-bold mb-2">
        Url de la imagen
      </label>
      <input
        name="img"
        type="text"
        placeholder="Image"
        ref={imgRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        required
      />
      <label htmlFor="adType" className="block text-xs font-bold mb-2">
        Tipo de anuncio
      </label>
      <select
        name="adType"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        ref={adTypeRef}
        placeholder="Tipo del anuncio"
        required
      >
        <option value="">Tipo del anuncio</option>
        <option value="estatico">Estático</option>
        <option value="flotante">Flotante</option>
      </select>
      <label htmlFor="redirecTo" className="block text-xs font-bold mb-2">
        Link
      </label>
      <input
        name="redirecTo"
        type="text"
        placeholder="link del anuncio"
        ref={redirecToRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-4"
        required
      />
      <button className="bg-indigo-600 px-2 py-1" type="Submit">
        Guardar
      </button>
      <button
        className="bg-red-700 px-2 py-1 hover:bg-red-800 md:ml-5"
        onClick={() => {
          navigate("/");
        }}
      >
        Cancelar
      </button>
    </form>
  );
};

export default Form;
