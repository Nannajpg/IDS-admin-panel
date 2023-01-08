import React from 'react';
import {useRef} from 'react'
import { BsSearch } from "react-icons/bs";

const SearchBar = ({handleSubmit, placeholder}) => {

  const searchRef = useRef();

  return (
    <form onSubmit={(e) => handleSubmit(e, searchRef)} className="w-2/5">
      <input type="text" ref={searchRef} placeholder={placeholder} className='w-4/5 rounded p-2 bg-zinc-600 mb-4'></input>
      <button type='submit' className='hover:bg-stone-700 ml-1 p-3 rounded-full h-full'> <BsSearch size="1.3rem"/> </button> 
    </form>
  )
}

export default SearchBar;