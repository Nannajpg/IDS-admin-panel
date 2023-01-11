import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdModeEditOutline as Pencil } from "react-icons/md"
import {RiDeleteBin6Line as Bin } from "react-icons/ri"

const AdRow = ({ id, isVisible, showModal }) => {
  const ad = useSelector((state) => state.ads.ads.find((ad) => ad.id === id));

  return (
    <tr className='bg-white'>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{ad.id}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap flex justify-center font-medium'><img src={ad.img} alt="adImage" className="rounded-full object-contain h-8 w-8" /></td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{ad.alias}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{ad.description}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'> <a href={ad.redirecTo} className="underline text-blue-600"> {ad.redirecTo}</a> </td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{ad.promotionType}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{ad.clickedQuantities}</td>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{ad.requestedQuantities}</td>
      <td className='p-3 w-30 flex gap-2'>
          <Link
            to={`/editAd/` + ad.id}
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
  );
};

export default AdRow;
