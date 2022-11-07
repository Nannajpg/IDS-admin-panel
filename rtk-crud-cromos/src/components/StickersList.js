import React from 'react'
import TeamsListHeader from './StickersListHeader'
import StickerCard from './StickerCard';

const StickerList = () => {

    return (
        <div className='w-4/6'>
            <TeamsListHeader />
            <StickerCard/>
        </div>
    )
}
export default StickerList