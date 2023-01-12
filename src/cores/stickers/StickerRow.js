import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as stickerServices from '../../services/stickers.services';
import { toast } from 'react-toastify';
import { setLoading } from "../../features/global/globalSlice";
import { MdModeEditOutline as Pencil } from "react-icons/md"
import {RiDeleteBin6Line as Bin } from "react-icons/ri"
import ModalDelete from '../../components/ModalDelete';
import useModal from '../../components/useModal';

function StickerRow({ sticker, getStickers }) {
    
    const dispatch = useDispatch();
    const {userToken} = useSelector(state => state.auth)
    const id = sticker.id
    const { isVisible, toggleModal } = useModal();

    const handleDelete = useCallback(async () => {
      try {
        dispatch(setLoading(true));
        await stickerServices.deleteSticker(userToken, id);
        toggleModal(true);
        getStickers();
      } catch (error) {
        toast.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
  }, [id, dispatch, getStickers, toggleModal, userToken]);


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
                <button onClick={toggleModal}><Bin color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/> </button>

                <ModalDelete
                  handleDelete={handleDelete}
                  id={sticker.id}
                  onClick={toggleModal}
                  isVisible={isVisible}
                  item={"cromo"}
                />
            </td>
        </tr> 

    )                     
    
}

export default StickerRow
