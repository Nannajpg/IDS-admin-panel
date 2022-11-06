import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdsListHeader = () => {

  const ads = useSelector((state) => state.ads.ads);

  return (
    <header className="flex justify-between items-center">
      <h1>Anuncios: {ads.length}</h1>
      <Link to="/newAd" className="bg-indigo-600 px-2 py-1 rounded-sm text-sm mb-2">
        Crear Anuncio
      </Link>
    </header>
  );
};

export default AdsListHeader;
