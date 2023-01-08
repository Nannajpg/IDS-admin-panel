import { Link } from 'react-router-dom'
import SearchBar from "../../components/searchbar";
import { toSearch, toFirstPage }  from "../../features/stickers/stickerSlice";
import {useDispatch} from 'react-redux'

function StickersListHeader({amount}) {    
    
    const dispatch = useDispatch();
    const handleSubmit = (e, searchRef) => {
        e.preventDefault();
        dispatch(toSearch(searchRef.current.value));
        dispatch(toFirstPage());
        return(searchRef.current.value = '')
      };

    return (

        <header className='flex justify-between item-center py-4'>
            <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
            <h1>Stickers: {amount}</h1>
            <SearchBar
                handleSubmit={handleSubmit}
                placeholder={"Buscar sticker por nombre"}
            />
            <Link to='/create-sticker' className='bg-indigo-500 px-2 py-1 rounded-sm text-sm hover:bg-indigo-600'>
                Crear Sticker
            </Link>
        </header>
    )
}

export default StickersListHeader