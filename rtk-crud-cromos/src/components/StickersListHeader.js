import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import StickerCard from './StickerCard'

function StickersListHeader() {
    const stickers = useSelector(state => state.stickers)

    return (
        <header className='flex justify-between item-center py-4'>
            <h1>Stickers {stickers.length}</h1>
            <Link to='/create-sticker' className='bg-indigo-500 px-2 py-1 rounded-sm text-sm hover:bg-indigo-600'>
                Crear Sticker
            </Link>
        </header>
    )
}

export default StickersListHeader