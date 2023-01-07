import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Ad = ({ id, isVisible, showModal }) => {
  const ad = useSelector((state) => state.ads.ads.find((ad) => ad.id === id));

  return (
    <div key={id} className="bg-neutral-800 p-4 rounded-md">
      <h3 className="text-center">{ad.announcer}</h3>
      <img src={ad.img} alt="adImage" className="my-5 object-contain" />
      <a href={ad.redirecTo} className="underline text-blue-600">
        {ad.redirecTo}
      </a>
      <p className="mb-4">Tipo de anuncio: {ad.adType}</p>
      <div className="flex gap-x-2 ">
        <Link
          to={`/editAd/` + ad.id}
          className="bg-zinc-600 px-2 py-1 text-xs rounded-md"
        >
          Editar
        </Link>
        <button
          onClick={() => showModal(isVisible, id)}
          className="bg-red-500 px-2 py-1 text-xs rounded-md self-center"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default Ad;
