import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';
import  {useEffect} from 'react'
import UserForm from './components/UserForm';
import UsersList from './components/UsersList';
import Login from './components/Login'
import { getAll } from '../src/services/axiosBD';

function App() {

//pedir datos de la api 
  useEffect(() => {
    const fetch = async () => {
      return getAll();
    }
    const data = fetch();
    console.log(data);
  }, []);

  return (
    <div className='bg-zinc-900 h-screen text-white'>
      <div className='flex items-center justify-center h-full'>
        <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Login/>} />
          <Route path="/show-users" element={<UsersList/>} />
          <Route path="/create-user" element={<UserForm/>} />
          <Route path="/edit-user/:id" element={<UserForm/>} />
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
