import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setMatches, resetMatches, setAmount, setTotalPages, setPage, toFirstPage, toSearch } from '../../features/matches/matchSlice'
import * as matchesServices from '../../services/matches.services'
import MatchRow from './MatchRow'
import Pagination from '../../components/pagination'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from "../../features/global/globalSlice";
import {FiArrowLeft as Arrow} from 'react-icons/fi'


function MatchesList() {
    const postPerPage = 7;
    const date = "3000-12-12";
    const page = useSelector(state => state.matches.page);
    const totalPages = useSelector(state => state.matches.totalPages)
    const amount = useSelector(state => state.matches.amount);
    const {userToken} = useSelector(state => state.auth)

    const matches = useSelector(state => state.matches.matches)
    const dispatch = useDispatch();

    const handleSetPage = page => {
        dispatch(setPage(page-1))
    }

    const handleSubmit = (e, searchRef) => {
        e.preventDefault();
        dispatch(toSearch(searchRef.current.value));
        dispatch(toFirstPage());
        return(searchRef.current.value = '')
      };

    const getMatches = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            dispatch(resetMatches());
            const data = await matchesServices.fetchMatches(userToken, page, postPerPage, date);
            dispatch(setMatches(data.items));
            dispatch(setAmount(data.paginate.total));   
            dispatch(setTotalPages(data.paginate.pages));
        } catch (error) {
            if (error.response) {
            throw new Error(
                error?.response?.data?.message || "Error desconocido del servidor"
            );
            } toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, userToken, page, postPerPage, date]);
    useEffect(() => { getMatches() }, [getMatches])
    
    return (
        <div className='w-4/6'>

            <header className='flex justify-between items-center py-4'>
            <Link to="/dashboard" className=""><Arrow color="#3D405B" size="2.5rem"/></Link>
                <h1 className='text-[#3D405B] font-bold text-3xl'>Gestionar Partidos</h1>
                <h1 className='text-[#3D405B] font-medium text-lg'>Partidos: {amount}</h1>
                <Link to="/matches/create" className='bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full px-8 font-semibold text-white flex items-center h-8'>
                    Crear
                </Link>
            </header>

            <div className="overflow-auto w-full rounded-lg hidden md:block">
                <table className="w-2/3 shadow-lg m-auto">
                    <thead className="bg-gradient-to-r header-table-rounded from-[#D13256] to-[#F75845] text-white">
                    <tr>
                        <td className="p-3 w-30 text-sm font-bold tracking-wide text-center rounded-l-full">ID</td>
                        <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Partido</td>
                        <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Competición</td>
                        <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Fecha</td>
                        <td className="p-3 w-30 rounded-r-full"></td>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">            
                        {matches.map(match => (<MatchRow match={match} onDelete={() => getMatches()} key={match.id}/>))}
                    </tbody>
                </table>
            </div>

            <div className='py-4'>
                <Pagination
                    currentPage={page + 1}
                    totalPages={totalPages}
                    handleSetPage={handleSetPage}
                />
            </div> 
        </div>
    )
}

export default MatchesList