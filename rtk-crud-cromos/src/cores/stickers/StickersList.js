import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import StickersListHeader from './StickersListHeader'
import { readStickers } from '../../features/stickers/stickerSlice'
import StickerCard from './StickerCard';
import { getAllStickers, getStickerMaxID } from '../../services/axios';

const StickerList = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {

        (async () => {
            //para mostrar que si funciona
            const respp = await getStickerMaxID();
            console.log('max ID: '+respp.data.id)

            let res = await getAllStickers();
            for (let i = 0; i < res.data.users.length; i++) {
                dispatch(readStickers(res.data.users[i]))
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