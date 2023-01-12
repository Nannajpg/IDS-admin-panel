import React from 'react'
import logo from '../cores/auth/assets/logo.png'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div>
            <div class=" flex items-end justify-end px-4">
              

                <div class="z-20 fixed top-0 -left-96 lg:left-0 h-screen w-9/12 lg:w-72 bg-[#EAEAEA] shadow-2xl peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    <nav role="navigation" class="p-6">
                        <div class="flex items-center gap-4 pb-4">
                            <img class="w-48" src={logo} alt=""/>
                        </div>
                    

                        <div class="mt-4 -mx-4 relative overflow-y-auto overflow-x-hidden h-[85vh]">
                            <span class=" px-4 text-gray-500">Menu</span>
                            <ul class="space-y-4 mb-12 px-4 mt-8">
                                <li>
                                    <a href="" class="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                        <img src="" class="w-6" alt="" />
                                        Cromos
                                    </a>
                                </li>
                                <li>
                                    <a href="" class="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                        <img src="" class="w-6" alt="" />
                                        Partidos
                                    </a>
                                </li>
                                <li>
                                    <a href="" class="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                        <img src="" class="w-6" alt="" />
                                        Anuncios
                                    </a>
                                </li>
                                <li>
                                    <a href="" class="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                       
                                        <img src="" class="w-6" alt="" />
                                        Equipos
                                    </a>
                                </li>
                                <li>
                                    <a href="" class="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                        <img src="" class="w-6" alt="" />
                                        Usuarios
                                    </a>
                                </li>
                                <li>
                                    <a href="" class="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                        <img src="" class="w-6" alt="" />
                                        Competiciones
                                    </a>
                                </li>
                                <li>
                                    <a href="" class="flex gap-4 font-bold text-[#3D405B] hover:text-gray-800 transition">
                                        <img src="" class="w-6" alt="" />
                                        Cargar informacion
                                    </a>
                                </li>
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