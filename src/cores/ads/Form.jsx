import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

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
      img: imgRef.current.value
    }
    announcerRef.current.value = '';
    imgRef.current.value = '';
    adTypeRef.current.value = '';
    redirecToRef.current.value = '';
    await action( ad, id );
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-2">
      <label htmlFor="announcer" className="block text-xs font-bold mb-2">
        Titulo
      </label>
      <input
        name="announcer"
        type="text"
        placeholder="Titulo"
        ref={announcerRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
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
      />
      <label htmlFor="adType" className="block text-xs font-bold mb-2">
        Tipo de anuncio
      </label>
      <input
        name="adType"
        type="text"
        placeholder="Tipo"
        ref={adTypeRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label htmlFor="redirecTo" className="block text-xs font-bold mb-2">
        Link
      </label>
      <input
        name="redirecTo"
        type="text"
        placeholder="link del anuncio"
        ref={redirecToRef}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <button className="bg-indigo-600 px-2 py-1">Guardar</button>
    </form>
  );
}

export default Form;