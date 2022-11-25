import React, { useEffect, useState } from 'react'
import StickersListHeader from './StickersListHeader'
import { readStickers } from '../../features/stickers/stickerSlice'
import StickerCard from './StickerCard';
import { getAllStickers } from '../../services/axios';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination'

const StickerList = () => {
    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    let res;

    let page = useSelector(state => state.stickers.page)

    let stickers = useSelector(state => state.stickers.stickers)
    const [postPerPage, setPostPerPage] = useState(8)

    useEffect(() => {
        (async () => {
            res = await getAllStickers(page);
            // await setLoading(false);
            console.log("meme: "+JSON.stringify(res.data.stickers));
            if (res.data.stickers.length>0){
                console.log("enter")
                for (let i = 0; i < res.data.stickers.length; i++) {
                    dispatch(readStickers(res.data.stickers[i]))
                }
            }
        })();
    }, [dispatch, page])

    return (
        <div className='w-4/6'>
            <StickersListHeader />
            <div className='grid grid-cols-4 gap-4'>
                {console.log("nananana: "+JSON.stringify(stickers))}
                {stickers.map(sticker => <StickerCard sticker={sticker} key={sticker.id}/>)}
            </div>
            <div className='py-4'>
                <Pagination postsPerPage={postPerPage} />
            </div>  
        </div>
    )
}
export default StickerList