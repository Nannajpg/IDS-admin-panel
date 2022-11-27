import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';
import UsersList from './cores/users/UsersList';
import Login from './cores/auth/Login';
import EventsList from './cores/events/EventsList';
import Auth from './cores/auth/Auth';
import Menu from './cores/dashboard/Menu';
import UserEditForm from './cores/users/EditForm';
import UserCreateForm from './cores/users/CreateForm';
import EventEditForm from './cores/events/EditForm';
import EventCreateForm from './cores/events/CreateForm';

function App() {

  return (
    <div className='bg-zinc-900 h-screen text-white'>
      <div className='flex items-center justify-center h-full'>
        <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Login/>} />
          <Route element={<Auth />}>
            <Route path="dashboard" element= {<Menu />} />
            <Route path="users/" element={<UsersList/>} />
            <Route path="users/create" element={<UserCreateForm />} />
            <Route path="users/edit/:id" element={<UserEditForm/>} />
            <Route path="events" element={<EventsList/>} />
            <Route path="events/create" element={<EventCreateForm/>} />
            <Route path="events/edit/:id" element={<EventEditForm/>} />
          </Route>
        </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
