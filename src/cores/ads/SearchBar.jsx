import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toSearch, toFirstPage } from '../../features/ads/adSlice';

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
    <form onSubmit={(e) => handleSubmit(e)}>
      <input style={{color: 'black'}} type="text" ref={searchRef} placeholder="search..."></input>
      <button type='submit'> SEARCH </button> 
    </form>
  )
}

export default SearchBar;