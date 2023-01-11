import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ValidUrl from "./ValidUrl";
import { toast } from 'react-toastify';


const Form = ({ onSubmit, id, toEditAd }) => {
  const aliasRef = useRef(null);
  const imgRef = useRef(null);
  const promotionTypeRef = useRef(null);
  const descriptionRef = useRef(null);
  const redirecToRef = useRef(null);
  const [imagen, setImagen] = useState();
  const [notValidUrl, setNotValidUrl] = useState(false);
  const [imgToEdit, setImgToEdit] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (toEditAd) {
      aliasRef.current.value = toEditAd.alias;
      setImagen(toEditAd.img);
      setImgToEdit(true);
      promotionTypeRef.current.value = toEditAd.promotionType;
      redirecToRef.current.value = toEditAd.redirecTo;
      descriptionRef.current.value = toEditAd.description;
    }
  }, [toEditAd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notValidUrl) {
      const ad = {
        alias: aliasRef.current.value,
        description: descriptionRef.current.value,
        promotionType: promotionTypeRef.current.value,
        redirecTo: redirecToRef.current.value,
        img: imgRef.current.files[0],
      };

      aliasRef.current.value = "";
      descriptionRef.current.value = "";
      imgRef.current.value = null;
      promotionTypeRef.current.value = "";
      redirecToRef.current.value = "";

      try {
        await onSubmit(ad, id);  
      } catch (e) {
        toast.error(e.message);
      }
    }
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="bg-zinc-800 max-w-sm p-4 mt-24"
    >
      <label htmlFor="alias" className="block text-xs font-bold mb-2">
        Titulo
      </label>
      <input
        name="alias"
        type="text"
        placeholder="Titulo"
        ref={aliasRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        required
      />

      <label htmlFor="description" className="block text-xs font-bold mb-2">
        Titulo
      </label>
      <input
        name="description"
        type="text"
        placeholder="Titulo"
        ref={descriptionRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        required
      />

      <label htmlFor="image" className="block text-xs font-bold mb-2">
        
      </label>
      <input
        name="img"
        type="file"
        placeholder="Imagen"
        accept=".jpg, .jpeg, .png"
        ref={imgRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2 file:rounded-md file:border-none file:bg-zinc-700 file:text-white hover:file:bg-zinc-800 hover:file:cursor-pointer"
        required={toEditAd ? false : true}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImagen(file);
            setImgToEdit(false);
          }
        }}
      />
      <label htmlFor="adType" className="block text-xs font-bold mb-2">
        Tipo de anuncio
      </label>
      <select
        name="adType"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        ref={promotionTypeRef}
        placeholder="Tipo del anuncio"
        required
      >
        <option value="">Tipo del anuncio</option>
        <option value="static">Estático</option>
        <option value="popup">Flotante</option>
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
          const urlExpresions = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\\=]*)/;
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
      {imagen && (
        <img src={imgToEdit ? imagen : URL.createObjectURL(imagen)} alt="" />
      )}
    </form>
  );
};

export default Form;
