import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteSticker } from '../../features/stickers/stickerSlice'
import * as stickerServices from '../../services/stickers.services';
import { toast } from 'react-toastify';
import { setLoading } from "../../features/global/globalSlice";
import { MdModeEditOutline as Pencil } from "react-icons/md"
import {RiDeleteBin6Line as Bin } from "react-icons/ri"


function StickerRow({ sticker }) {
    
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.userToken)
    
    const handleDelete = async (id) => {
        try {
          dispatch(setLoading(true));
          if (window.confirm('¿Desea eliminar ese Sticker?')) {
            await stickerServices.deleteSticker(token, id);
            dispatch(deleteSticker(id))
            }
        } catch (error) {
          toast.error(error.message);
        } finally {
          dispatch(setLoading(false));
        }
      };
    return (
        <tr className='bg-white'>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{sticker.id}</td>
            <td className='p-3 text-sm text-black whitespace-nowrap flex justify-center font-medium'><img src={sticker.img} alt="stickerImage" className="rounded-full object-contain h-8 w-8" /></td>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{sticker.playerName}</td>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{sticker.team.event.eventName}</td>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{sticker.team.name}</td>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{sticker.position}</td>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{sticker.height}</td>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{sticker.weight}</td>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{sticker.appearanceRate}%</td>
            <td className='p-3 w-30 flex gap-2'>
                <Link to={`/edit-sticker/${sticker.id}`}><Pencil color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/></Link>
                <button onClick={() => handleDelete(sticker.id)}><Bin color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/> </button>
            </td>
        </tr> 

    )                     
    
}

export default StickerRow
