import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ValidUrl from "./ValidUrl";

const Form = ({ action, id, toEditAdd }) => {
  const announcerRef = useRef(null);
  const imgRef = useRef(null);
  const adTypeRef = useRef(null);
  const redirecToRef = useRef(null);
  const [imagen, setImagen] = useState();
  const [notValidUrl, setNotValidUrl] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (toEditAdd) {
      announcerRef.current.value = toEditAdd.announcer;
      imgRef.current.value = toEditAdd.image; 
      adTypeRef.current.value = toEditAdd.adType;
      redirecToRef.current.value = toEditAdd.redirecTo;
    }
  }, [toEditAdd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notValidUrl) {
      const ad = {
        announcer: announcerRef.current.value,
        adType: adTypeRef.current.value,
        redirecTo: redirecToRef.current.value,
        img: imgRef.current.files[0],
      };
      announcerRef.current.value = "";
      imgRef.current.value = null;
      adTypeRef.current.value = "";
      redirecToRef.current.value = "";
      await action(ad, id);
      navigate("/ads");
    }
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
        Subir la imagen del anuncio
      </label>
      <input
        name="img"
        type="file"
        placeholder="Imagen"
        accept=".jpg, .jpeg, .png"
        ref={imgRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2 file:rounded-md file:border-none file:bg-zinc-700 file:text-white hover:file:bg-zinc-800 hover:file:cursor-pointer"
        required
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImagen(file);
          } else {
            setImagen(null);
          }
        }}
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
        <option value="static">Estático</option>
        <option value="float">Flotante</option>
      </select>
      <label htmlFor="redirecTo" className="block text-xs font-bold mb-2">
        Link
      </label>
      <ValidUrl notValidUrl={notValidUrl} />
      <input
        name="redirecTo"
        type="text"
        placeholder="link del anuncio"
        ref={redirecToRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-4"
        required
        onChange={(e) => {
          const urlExpresions =
            /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\\=]*)/;
          if (e.target.value === "") {
            setNotValidUrl(false);
          } else {
            setNotValidUrl(!urlExpresions.test(e.target.value));
          }
        }}
      />
      <button
        className="bg-indigo-600 px-2 py-1 hover:bg-indigo-800"
        type="Submit"
      >
        Guardar
      </button>
      <button
        className="bg-red-700 px-2 py-1 hover:bg-red-800 md:ml-5"
        onClick={() => {
          navigate("/ads");
        }}
      >
        Cancelar
      </button>
      {imagen && <img src={URL.createObjectURL(imagen)} alt="" />}
    </form>
  );
};

export default Form;
