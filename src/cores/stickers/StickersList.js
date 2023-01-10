import React, { Fragment, useEffect } from "react";
import StickersListHeader from "./StickersListHeader";
import {
  readStickers,
  setAmount,
  setTotalPages,
  setPage
} from "../../features/stickers/stickerSlice";
import StickerRow from "./StickerRow";
import {
  getAllStickers,
} from "../../services/stickers.services";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '../../components/pagination'
import { toast } from 'react-toastify';
import { setLoading } from "../../features/global/globalSlice";
import HiddenTable from "./HiddenTable";
//import "./StickersList.css"

const StickerList = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.userToken);
  const stickerState = useSelector((state) => state.stickers);
  const totalPages = stickerState.totalPages
  const page = stickerState.page

  const handleSetPage = page => {
    dispatch(setPage(page-1))
  }

  useEffect(() => {
    const getStickers = async () => {
      const res = await getAllStickers(token, stickerState.page);
      try {
        dispatch(setLoading(true));
        if (res.data.items.length > 0) {
          for (let i = 0; i < res.data.items.length; i++) {
            dispatch(setTotalPages(res.data.paginate.pages));
            dispatch(readStickers(res.data.items[i]));
          }
          dispatch(setAmount(res.data.paginate.total));
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getStickers();
  }, [dispatch, stickerState.page, stickerState.stickers, token, stickerState.search]);

  return (
    <div>
      <StickersListHeader amount={stickerState.amount} />
      <div className="overflow-auto shadow-lg rounded-lg hidden md:block">
        <table className="w-full">
            <thead className="bg-gradient-to-r header-table-rounded from-[#D13256] to-[#F75845] text-white">
              <tr>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center rounded-l-full">Foto</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Nombre</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Competición</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Equipo</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Posición</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Altura (cm)</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Peso (Kg)</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">% de Aparición</td>
                <td className="rounded-r-full"></td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">            
              {stickerState.stickers.map((sticker) => (
                  <StickerRow sticker={sticker} key={sticker.id} />
              ))}
          </tbody>
        </table>
      </div>

      <div className="grid w-50 grid-cols-2 sm:grid-cols-2 gap-4 md:hidden">
      {stickerState.stickers.map((sticker) => (
        <HiddenTable sticker={sticker} key={sticker.id}/>
      ))}
      </div>
    
      <div className='py-4'>
            <Pagination
              currentPage={page + 1}
              totalPages={totalPages}
              handleSetPage={handleSetPage}
            />
      </div>
      
    </div>
  );
};

export default StickerList;
