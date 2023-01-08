import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../../components/searchbar";
import FilterSelect from "./FilterSelect";
import { toSearch, toFirstPage } from '../../features/ads/adSlice';


const AdsListHeader = () => {
  const ads = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  const handleSubmit = (e, searchRef) => {
    e.preventDefault();
    dispatch(toSearch(searchRef.current.value));
    dispatch(toFirstPage());
    return(searchRef.current.value = '')
  };

  return (
    <header className="flex justify-between items-center mt-5 w-full">
      <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
      <h1>Anuncios: {ads.amount}</h1>
      <SearchBar
        handleSubmit={handleSubmit}
        placeholder={"Buscar anuncio por título"}
      />
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
