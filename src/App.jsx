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
import AdCreateForm from "./cores/ads/CreateForm";
import AdEditForm from "./cores/ads/EditForm";
import AdsList from "./cores/ads/AdsList";
import StickerForm from './cores/stickers/StickerForm';
import StickersList from './cores/stickers/StickersList';
import TeamsList from "./cores/teams/TeamsList";
import CreateFormTeam from "./cores/teams/CreateFormTeam";
import EditFormTeam from "./cores/teams/EditFormTeam";
import MatchesList from './cores/matches/MatchesList';
import MatchCreateForm from './cores/matches/CreateForm';
import Navbar from './components/Navbar'
import Loading from "react-fullscreen-loading";
import { useSelector } from "react-redux";
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const loading = useSelector((state) => state.global.loading);

  useLocalStorage();

  return (
    <>
      <Loading loading={loading} background="rgb(234, 234, 234)" loaderColor="from-[#D13256] to-[#F75845]"></Loading>
      <div className='bg-[#EAEAEA] h-screen'>
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
              <Route path="/ads" element={<AdsList />} />
              <Route path="/newAd" element={<AdCreateForm />} />
              <Route path="/editAd/:id" element={<AdEditForm />} />
              <Route path='/stickers' element={<StickersList />} />
              <Route path='/create-sticker' element={<StickerForm />} />
              <Route path='/edit-sticker/:id' element={<StickerForm />} />
              <Route path="/teams" element={<TeamsList />} />
              <Route path="/newTeam" element={<CreateFormTeam />} />
              <Route path="/editTeam/:id" element={<EditFormTeam />} />
              <Route path="matches" element={<MatchesList/>} />
              <Route path="matches/create" element={<MatchCreateForm/>} />
            </Route>
          </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
