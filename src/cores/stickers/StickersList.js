import React, { useEffect } from 'react'
import StickersListHeader from './StickersListHeader'
import { readStickers, setAmount, setTotalPages } from '../../features/stickers/stickerSlice'
import StickerCard from './StickerCard';
import { getAllStickers, getStickersAmount } from '../../services/stickers.services';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination'

const StickerList = () => {

    const dispatch = useDispatch()
    const postPerPage = 8;

    const token = useSelector(state => state.auth.userToken)

    const stickerState = useSelector(state => state.stickers)

    useEffect(() => {
        const getStickers = async () => {
            const res = await getAllStickers(token, stickerState.page);
            if (res.data.items.length>0){
                for (let i = 0; i < res.data.items.length; i++) {
                    dispatch(setTotalPages(res.data.paginate.pages))
                    dispatch(readStickers(res.data.items[i]))
                }
                dispatch(setAmount(res.data.paginate.total));
            }
        }
        console.log(stickerState.stickers)
        getStickers();
    }, [dispatch, stickerState.page, stickerState.stickers, token])

    return (
        <div className='w-4/6'>
            <StickersListHeader amount={stickerState.amount} />
            <div className='grid grid-cols-4 gap-4'>
                {stickerState.stickers.map(sticker => <StickerCard sticker={sticker} key={sticker.id}/>)}
            </div>
            <div className='py-4'>
                <Pagination postsPerPage={postPerPage} />
            </div>  
        </div>
    )
}

export default StickerList;
