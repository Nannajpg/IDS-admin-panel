import React from 'react'
import logo from '../cores/auth/assets/logo.png'

const Navbar = () => {
  return (
    <div>
     <nav className="bg-[#EAEAEA] overflow-hidden border-gray-200 h-14 absolute w-full px-2 sm:px-4 py-2 top-0 left-0 dark:bg-gray-900">
        <div className="container flex items-center justify-between h-full">
              <div className="flex items-center">
                 <img src={logo} alt="" className="h-14" />
              </div>
          </div>
          <hr className="bg-[#CECECE] h-5"/>
        </nav>
    </div>
  )
}
export default Navbar
