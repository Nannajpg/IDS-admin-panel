import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdModeEditOutline as Pencil } from "react-icons/md"
import {RiDeleteBin6Line as Bin } from "react-icons/ri"


const TeamRow = ({ id, isVisible, showModal }) => {
  const team = useSelector(state => state.teams.teams.find(team => team.id === id));
  return (

    <tr className='bg-white'>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{team.id}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap flex justify-center font-medium'><img src={team.badge} alt="adImage" className="rounded-full object-contain h-8 w-8" /></td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{team.name}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{team.event.eventName}</td>
      <td className='p-3 w-30 flex gap-2'>
          <Link
            to={`/editTeam/` + team.id}
          >
          <Pencil color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/>
          </Link>
          <button
            onClick={() => showModal(isVisible, id)}
          >
            <Bin color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/>
          </button>
      </td>
    </tr> 
  )
}

export default TeamRow