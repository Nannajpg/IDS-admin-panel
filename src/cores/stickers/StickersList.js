import React, { useEffect } from 'react'
import StickersListHeader from './StickersListHeader'
import { readStickers, setAmount } from '../../features/stickers/stickerSlice'
import StickerCard from './StickerCard';
import { getAllStickers, getStickersAmount } from '../../services/stickers.services';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination'

const StickerList = () => {
    
    const dispatch = useDispatch()
    const postPerPage = 8;

    const page = useSelector(state => state.stickers.page)
    const stickers = useSelector(state => state.stickers.stickers)

    useEffect(() => {
        (async () => {
            const res = await getAllStickers(page);
            const amount = await getStickersAmount();
            if (res.data.stickers.length>0){
                for (let i = 0; i < res.data.stickers.length; i++) {
                    dispatch(readStickers(res.data.stickers[i]))
                }
                dispatch(setAmount(amount.data.stickers.count));
            }
        })();
    }, [dispatch, page, stickers])

    return (
        <div className='w-4/6'>
            <StickersListHeader />
            <div className='grid grid-cols-4 gap-4'>
                {stickers.map(sticker => <StickerCard sticker={sticker} key={sticker.id}/>)}
            </div>
            <div className='py-4'>
                <Pagination postsPerPage={postPerPage} />
            </div>  
        </div>
    )
}
export default StickerList