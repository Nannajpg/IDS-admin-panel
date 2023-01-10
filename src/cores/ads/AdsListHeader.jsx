import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../../components/searchbar";
import FilterSelect from "./FilterSelect";
import { toSearch, toFirstPage } from '../../features/ads/adSlice';
import {FiArrowLeft as Arrow} from 'react-icons/fi'


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
    <header className='flex justify-between item-center py-4'>
            
    <Link to="/dashboard" className=""><Arrow color="#3D405B" size="2.5rem"/></Link>
    <h1 className='text-[#3D405B] font-bold text-3xl'>Gestionar Anuncios</h1>
    <h1 className='text-[#3D405B] font-medium text-lg'>Anuncios: {ads.amount}</h1>


    <SearchBar
        handleSubmit={handleSubmit}
        placeholder={"Buscar anuncio por título"}
      />
    <FilterSelect />

    

    <Link to="/newAd" className='bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full px-8 font-semibold text-white flex items-center h-8'>
        Crear
    </Link>
    </header>
  );
};

export default AdsListHeader;
