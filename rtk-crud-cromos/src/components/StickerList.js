import React from 'react'
import TeamsListHeader from './StickersListHeader'
import StickerCard from './StickerCard';
import { current } from '@reduxjs/toolkit';
// import { useState } from 'react';
// import { useSelector } from 'react-redux'


const StickerList = () => {
    // const stickerState = useSelector((state) => state)
    // const [stickerFilter, setStickerFilter] = useState(stickerState.sticker)

    // const handleChange = (e) => {
    //     if (e.target.value === '') {
    //         setStickerFilter(stickerState.sticker);
    //     } else {
    //         setStickerFilter(
    //             stickerState.sticker.filter((sticker) => {
    //                 return sticker.position === e.target.value;
    //             })
    //         );
    //     }
    // }

    return (
        <div className='w-4/6'>
            <TeamsListHeader />
            {/* <select
                name='filterType'
                className='w-full p-1 rounded-md bg-slate-400 mb-2 hover:bg-slate-500'
                onChange={(e) => handleChange(e)}
            >
                <option value=''>Seleccionar un Filtro</option>
                <option value='Arquero'>Arquero</option>
                <option value='Defensa'>Defensa</option>
                <option value='MedioCentro'>MedioCentro</option>
                <option value='Delantero'>Delantero</option>
            </select> */}
            <StickerCard/>
        </div>
    )
}
export default StickerList