import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';
import  {useEffect} from 'react'
import UserForm from './components/UserForm';
import UsersList from './components/UsersList';
import Login from './components/Login';
import EventForm from './components/EventForm';
import EventsList from './components/EventsList';
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
      <div className='bg-zinc-900'>
        <div className='flex justify-center h-full'>
          <BrowserRouter>
          <Routes>
            <Route path="/" element= {<Login/>} />
            <Route path="/menu" element= {<Login/>} />

            <Route path="/show-users" element={<UsersList/>} />
            <Route path="/create-user" element={<UserForm/>} />
            <Route path="/edit-user/:id" element={<UserForm/>} />
            <Route path="/show-events" element={<EventsList/>} />
            <Route path="/create-event" element={<EventForm/>} />
            <Route path="/edit-event/:id" element={<EventForm/>} />
          </Routes>
          </BrowserRouter>
        </div>
      </div>
      
    </div>
  );
}

export default App;

