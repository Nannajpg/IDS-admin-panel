import { toast } from 'react-toastify';
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setEvents, setAmount, setTotalPages, setPage, toFirstPage, toSearch} from '../../features/events/eventSlice'
import { fetchEvents } from '../../services/events.services'
import EventRow from './EventRow'
import Pagination from '../../components/pagination'
import { setLoading } from "../../features/global/globalSlice";
import SearchBar from "../../components/searchbar";
import {FiArrowLeft as Arrow} from 'react-icons/fi'

function EventsList() {
    const postPerPage = 7;
    const { page, totalPages, events, amount } = useSelector(state => state.events);
    const dispatch = useDispatch();
    const {userToken} = useSelector(state => state.auth)

    const getEvents = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const result = await fetchEvents(userToken, page, postPerPage);
            dispatch(setEvents(result.items));
            dispatch(setAmount(result.paginate.total));
            dispatch(setTotalPages(result.paginate.pages));
        } catch (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            dispatch(setLoading(false));
        }
    }, [page, dispatch, userToken]);

    const handleSetPage = page => {
        dispatch(setPage(page-1))
    }

    const handleSubmit = (e, searchRef) => {
        e.preventDefault();
        dispatch(toSearch(searchRef.current.value));
        dispatch(toFirstPage());
        return(searchRef.current.value = '')
      };

    useEffect(() => {
        getEvents();
    }, [getEvents]);

    return (
        <div className='w-4/6'>

            <header className='flex justify-between items-center py-4'>
            <Link to="/dashboard" className=""><Arrow color="#3D405B" size="2.5rem"/></Link>
                <h1 className='text-[#3D405B] font-bold text-3xl'>Gestionar Competiciones</h1>
                <h1 className='text-[#3D405B] font-medium text-lg'>Competiciones: {amount}</h1>
                <SearchBar
                    handleSubmit={handleSubmit}
                    placeholder={"Buscar competición por nombre"}
                />
                <Link to="/events/create" className='bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full px-8 font-semibold text-white flex items-center h-8'>
                    Crear
                </Link>
            </header>


            <div className="overflow-auto w-full rounded-lg hidden md:block">
                <table className="w-2/3 shadow-lg m-auto">
                    <thead className="bg-gradient-to-r header-table-rounded from-[#D13256] to-[#F75845] text-white">
                    <tr>
                        <td className="p-3 w-30 text-sm font-bold tracking-wide text-center rounded-l-full">Id</td>
                        <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Competición</td>
                        <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Estado</td>
                        <td className="rounded-r-full"></td>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">            
                        {events.map(event => (<EventRow event={event} key={'event-'+ event.id}/>))}
                    </tbody>
                </table>
            </div>

            <div className='py-4'>
                <Pagination
                    currentPage={page+1}
                    totalPages={totalPages}
                    handleSetPage={handleSetPage}
                />
            </div>   
        </div>
    )
}

export default EventsList