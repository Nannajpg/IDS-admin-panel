import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ValidUrl from "./ValidUrl";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from "react-toastify";

const Form = ({ onSubmit, id, toEditAd }) => {
  const announcerRef = useRef(null);
  const imgRef = useRef(null);
  const adTypeRef = useRef(null);
  const redirecToRef = useRef(null);
  const [imagen, setImagen] = useState();
  const [notValidUrl, setNotValidUrl] = useState(false);
  const [imgToEdit, setImgToEdit] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (toEditAd) {
      announcerRef.current.value = toEditAd.announcer;
      setImagen(toEditAd.img);
      setImgToEdit(true);
      adTypeRef.current.value = toEditAd.adType;
      redirecToRef.current.value = toEditAd.redirecTo;
    }
  }, [toEditAd]);

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

      try {
        await onSubmit(ad, id);
      } catch (e) {
        toast.error(e.message);
      }
      navigate("/ads");
    }
  };

  return (
    <div>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="bg-[#EAEAEA] rounded-2xl text-black"
      >
        <div>
          <h1 className="text-white text-xl p-2 bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-t-2xl font-bold text-justify">
            Anuncio
          </h1>
        </div>

        <div className="py-1 px-7 text-[#3D405B]">
          <div className='pt-2'>
            <label htmlFor="announcer" className="block text-lg font-bold mb-2">
              Título
            </label>
            <input
              name="announcer"
              type="text"
              placeholder="Titulo"
              ref={announcerRef}
              className="w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500"
              required
            />
          </div>
          <div>
            <label htmlFor="adType" className="block text-lg font-bold mb-2">
              Tipo de anuncio
            </label>
            <select
              name="adType"
              className="w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500"
              ref={adTypeRef}
              placeholder="Tipo del anuncio"
              required
            >
              <option value="">Tipo del anuncio</option>
              <option value="static">Estático</option>
              <option value="float">Flotante</option>
            </select>
          </div>
          <div>
            <label htmlFor="redirecTo" className="block text-lg font-bold mb-2">
              Link
            </label>
            <ValidUrl notValidUrl={notValidUrl} />
            <input
              name="redirecTo"
              type="text"
              placeholder="Link del anuncio"
              ref={redirecToRef}
              className="w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500"
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
          </div>
        </div>

        <div className="py-2 px-4">
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col bg-[#D2D2D2] items-center justify-center w-full pb-7 rounded-lg cursor-pointer hover: bg-[#D9D9D9]"
              htmlFor="image"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-8">
                <p class="text-sm font-bold text-center text-gray-500">
                  Arrastra y suelta el archivo aquí o
                </p>
              </div>
              <input
                name="img"
                type="file"
                placeholder="Imagen"
                accept=".jpg, .jpeg, .png"
                ref={imgRef}
                className="text-lg text-gray-100 rounded-2xl w-1/2 cursor-pointer bg-[#c3c3c3]"
                required={toEditAd ? false : true}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImagen(file);
                    setImgToEdit(false);
                  }
                }}
              />
            </label>
          </div>
        </div>

        <div className="p-5 flex justify-center">
          <button
            className="font-medium py-0.4 px-6 text-white bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-2xl"
            type="Submit"
          >
            Confirmar
          </button>
        </div>

        {imagen && (
          <img src={imgToEdit ? imagen : URL.createObjectURL(imagen)} alt="" />
        )}
      </form>
    </div>
  );
};

export default Form;
