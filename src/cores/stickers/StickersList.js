import React, { useEffect } from "react";
import StickersListHeader from "./StickersListHeader";
import {
  readStickers,
  setAmount,
  setTotalPages,
  setPage
} from "../../features/stickers/stickerSlice";
import StickerCard from "./StickerCard";
import {
  getAllStickers,
} from "../../services/stickers.services";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '../../components/pagination'
import { toast } from 'react-toastify';
import { setLoading } from "../../features/global/globalSlice";

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
  }, [dispatch, stickerState.page, stickerState.stickers, token]);

  return (
    <div className="w-4/6">
      {console.log(stickerState)}
      <StickersListHeader amount={stickerState.amount} />
      <div className="grid grid-cols-4 gap-4">
        {stickerState.stickers.map((sticker) => (
          <StickerCard sticker={sticker} key={sticker.id} />
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
