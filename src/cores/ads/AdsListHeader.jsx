import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const AdsListHeader = () => {

  const ads = useSelector((state) => state.ads);

  return (
    <header className="flex justify-between items-center mt-5">
      <h1>Anuncios: {ads.amount}</h1>
      <Link to="/newAd" className="bg-indigo-600 px-2 py-1 rounded-sm text-sm mb-2">
        Crear Anuncio
      </Link>
      <SearchBar />
    </header>
  );
};

export default AdsListHeader;
