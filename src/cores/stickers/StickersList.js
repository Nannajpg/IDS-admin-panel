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

    const token = useSelector(state => state.auth.userToken)

    const stickerState = useSelector(state => state.stickers)


    useEffect(() => {
        (async () => {
            const res = await getAllStickers(token, stickerState.page);
            console.log(res.data)
            if (res.data.stickers.rows.length>0){
                for (let i = 0; i < res.data.stickers.rows.length; i++) {
                    dispatch(readStickers(res.data.stickers.rows[i]))
                }
                dispatch(setAmount(res.data.stickers.count));
            }
        })();
    }, [dispatch, stickerState.page, stickerState.stickers])

    return (
        <div className='w-4/6'>
            {console.log(stickerState)}
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
export default StickerList