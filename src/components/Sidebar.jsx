import React from 'react'
import logo from '../cores/auth/assets/logoh.png'
import { Link } from 'react-router-dom'
import {FiMenu as Option} from 'react-icons/fi'
import {FiUsers as User} from 'react-icons/fi'
import {AiFillTrophy as Event} from 'react-icons/ai'
import {MdOutlineAttachMoney as Ad} from 'react-icons/md'
import {GiSoccerKick as Sticker} from 'react-icons/gi'
import {FaFlag as Team} from 'react-icons/fa'
import {GiWhistle as Match} from 'react-icons/gi'
import {RiDashboardFill as Dashboard} from 'react-icons/ri'
import { logout } from "../features/auth/authSlice";
import { useDispatch } from 'react-redux'
import { MdLogout } from "react-icons/md";

const Sidebar = ({setIsVisible}) => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
      }

    return (
        <div className='w-screen h-screen bg-black bg-opacity-70 z-20 fixed top-0 left-0'>
            <div class=" flex items-end justify-end px-4">
                <div class="z-20 fixed top-0 lg:left-0 h-screen w-9/12 lg:w-72 bg-[#EAEAEA] shadow-2xl peer-focus:left-0 peer:transition ease-out delay-150 duration-200">

                    <nav role="navigation" class="p-6">
                        <div class="flex items-center gap-4 pb-4 w-full h-4">
                            <button onClick={() => setIsVisible(false)}><Option size='2rem' color='#D13256'/></button>
                            <Link to='/dashboard'><img class="w-32" src={logo} alt=""/></Link>
                        </div>
                        
                        <div class="mt-4 -mx-4 relative overflow-y-auto overflow-x-hidden h-[85vh]">
                            <span class=" px-4 text-gray-400">Menú</span>
                            <ul class="space-y-4 mb-6 px-4 mt-3">
                                <Link
                                    to="/users"
                                    className="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition "
                                >
                                    <Dashboard size='1.5rem' color='#3D405B'/>
                                    Menú Principal
                                </Link>
                            </ul>
                            <span class=" px-4 text-gray-400">Gestión</span>
                            <div></div>
                            <ul class="space-y-4 mb-12 px-4 mt-3">
                                <Link
                                    to="/users"
                                    className="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition "
                                >
                                    <User size='1.5rem' color='#3D405B'/>
                                    Usuarios
                                </Link>

                                <Link 
                                    to="/events" className="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                    <Event size='1.5rem' color='#3D405B'/>
                                    Competiciones
                                </Link>
                                <Link
                                    to="/ads" className="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                    <Ad size='1.5rem' color='#3D405B'/>
                                    Anuncios
                                </Link>

                                <Link
                                    to="/stickers" className="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                    <Sticker size='1.5rem' color='#3D405B'/>
                                    Cromos
                                </Link>

                                <Link
                                    to="/teams" className="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                    <Team size='1.5rem' color='#3D405B'/>
                                    Equipos
                                </Link>

                                <Link
                                    to="/matches" className="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                    <Match size='1.5rem' color='#3D405B'/>
                                    Partidos
                                </Link>

                                </ul>

                                <ul class="space-y-4 px-4 mt-36">
                                <Link
                                    onClick={handleLogout}
                                    to="/"
                                    className="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition"
                                >
                                <MdLogout size="1.5rem" color="#3D405B" />Cerrar sesión
                                </Link>
                                </ul>
                            
                           
                        </div>
                    </nav>
                </div>
                <div class="z-10 lg:hidden fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-30 opacity-0 peer-focus:opacity-100 peer:transition duration-200"></div>
            </div>
        </div>
    )
}

export default Sidebar