import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import StickersListHeader from './StickersListHeader'
import { readStickers } from '../../features/stickers/stickerSlice'
import StickerCard from './StickerCard';
import { getAllStickers } from '../../services/axios';

const StickerList = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            let res = await getAllStickers();
            for (let i = 0; i < res.data.users.length; i++) {
                dispatch(readStickers(res.data.users[i]))
            }
        })();
    }, [])

    return (
        <div className='w-4/6'>
            <StickersListHeader />
            <StickerCard />
        </div>
    )
}
export default StickerList