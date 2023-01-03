import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function StickersListHeader({amount}) {    
    return (

        <header className='flex justify-between item-center py-4'>
            <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
            <h1>Stickers: {amount}</h1>
            <Link to='/create-sticker' className='bg-indigo-500 px-2 py-1 rounded-sm text-sm hover:bg-indigo-600'>
                Crear Sticker
            </Link>
        </header>
    )
}

export default StickersListHeader