import { Link } from 'react-router-dom'
import SearchBar from "../../components/searchbar";
import { toSearch, toFirstPage }  from "../../features/stickers/stickerSlice";
import {useDispatch} from 'react-redux'
import {FiArrowLeft as Arrow} from 'react-icons/fi'

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
            
            <Link to="/dashboard" className=""><Arrow color="#3D405B" size="2.5rem"/></Link>
            <h1 className='text-[#3D405B] font-bold text-3xl'>Gestionar Cromos</h1>
            <h1 className='text-[#3D405B] font-medium text-lg'>Cromos: {amount}</h1>


            <SearchBar
                handleSubmit={handleSubmit}
                placeholder={"Buscar sticker por nombre"}
            />

            

            <Link to='/create-sticker' className='bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full px-8 font-semibold text-white flex items-center h-8'>
                Crear
            </Link>
        </header>
    )
}

export default StickersListHeader