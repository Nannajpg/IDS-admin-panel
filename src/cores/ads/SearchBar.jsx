import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toSearch, toFirstPage } from '../../features/ads/adSlice';
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {

  const dispatch = useDispatch();
  const searchRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(toSearch(searchRef.current.value));
    dispatch(toFirstPage());
    searchRef.current.value = '';
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-2/5">
      <input type="text" ref={searchRef} placeholder="search..." className='w-4/5 rounded p-2 bg-zinc-600 mb-4'></input>
      <button type='submit' className='hover:bg-stone-700 ml-1 p-3 rounded-full h-full'> <BsSearch size="1.3rem"/> </button> 
    </form>
  )
}

export default SearchBar;