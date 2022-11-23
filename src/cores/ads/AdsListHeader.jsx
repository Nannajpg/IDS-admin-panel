import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import FilterSelect from "./FilterSelect";

const AdsListHeader = () => {
  const ads = useSelector((state) => state.ads);

  return (
    <header className="flex justify-between items-center mt-5 w-full">
      <h1>Anuncios: {ads.amount}</h1>
      <SearchBar />
      <FilterSelect />
      <Link
        to="/newAd"
        className="bg-indigo-600 p-2 rounded text-sm mb-2"
      >
        Crear Anuncio
      </Link>
    </header>
  );
};

export default AdsListHeader;
