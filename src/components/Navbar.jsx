import React from 'react'
import { useState } from 'react'
import logo from '../cores/auth/assets/logoh.png'
import Sidebar from './Sidebar'
import {FiMenu as Option} from 'react-icons/fi'

const Navbar = () => {

  const [isVisible, setIsVisible] = useState(false)

  return (

    

    <div>
      {isVisible && <Sidebar setIsVisible={setIsVisible}/>}
     <nav className="bg-[#EAEAEA] overflow-hidden border-gray-200 h-14 absolute w-full px-2 sm:px-4 py-2 top-0 left-0 dark:bg-gray-900">
        <div className="container flex items-center justify-between h-full">
              <div className="flex gap-2 items-center">
                 <button onClick={() => setIsVisible(true)}><Option size='2rem' color='#D13256'/></button>
                 <img src={logo} alt="" className="w-32" />
              </div>
          </div>
          <hr className="bg-[#CECECE] h-5"/>
      </nav>
    </div>
  )
}
export default Navbar
