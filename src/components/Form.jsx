import React from 'react'
import { useRef } from 'react'

const Form = () => {
  const announcerRef = useRef(null);
  const imgRef = useRef(null);
  const adTypeRef = useRef(null);
  const redirectToRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(announcerRef.current.value);
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
      
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label htmlFor="image" className="block text-xs font-bold mb-2">
        Url de la imagen
      </label>
      <input
        name="img"
        type="text"
        placeholder="Image"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label htmlFor="adType" className="block text-xs font-bold mb-2">
        Tipo de anuncio
      </label>
      <input
        name="adType"
        type="text"
        placeholder="Tipo"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label htmlFor="redirecTo" className="block text-xs font-bold mb-2">
        Link
      </label>
      <input
        name="redirecTo"
        type="text"
        placeholder="link del anuncio"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <button className="bg-indigo-600 px-2 py-1">Guardar</button>
    </form>
  );
}

export default Form;