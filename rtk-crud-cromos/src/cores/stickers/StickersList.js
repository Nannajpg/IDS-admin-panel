import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import StickersListHeader from './StickersListHeader'
import { readStickers } from '../../features/stickers/stickerSlice'
import StickerCard from './StickerCard';
import { getAllStickers} from '../../services/axios';

const StickerList = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            let res = await getAllStickers();
            for (let i = 0; i < res.data.stickers.length; i++) {
                dispatch(readStickers(res.data.stickers[i]))
            }
            setLoading(false);
        })();
    }, [])

    return (
        <div className='w-4/6'>
            <StickersListHeader />
            {( loading ? (<p>Cargando cromos...</p>) : (<StickerCard />))}
            
        </div>
    )
}
export default StickerList