import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setMatches, resetMatches, setAmount } from '../../features/matches/matchSlice'
import { setPage } from '../../features/stickers/stickerSlice'
import * as matchesServices from '../../services/matches.services'
import Match from './Match'
import Pagination from './Pagination'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from "../../features/global/globalSlice";

function MatchesList() {
    const postPerPage = 9;
    const date = "3000-12-12";
    const page = useSelector(state => state.matches.page);
    const amount = useSelector(state => state.matches.amount);
    const {userToken} = useSelector(state => state.auth)

    const matches = useSelector(state => state.matches.matches)
    const dispatch = useDispatch();

    const getMatches = useCallback(async () => {
        try {
            dispatch(resetMatches());
            const data = await matchesServices.fetchMatches(userToken, page, postPerPage, date);
            dispatch(setMatches(data.items));
            dispatch(setAmount(data.paginate.total));    
            dispatch(setPage(data.paginate.page));
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
                <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
                <h1>Partidos Totales: {amount}</h1>
                
                <Link to="/matches/create" className='bg-emerald-600 px-2 py-1 rounded-md text-sm'>
                    Crear Partido
                </Link>
            </header>

            <div className='grid grid-cols-3 gap-4'>
                {matches.map(match => (<Match match={match} onDelete={() => getMatches()} key={match.id}/>))}
            </div>

            <div className='py-4'>
                <Pagination postsPerPage={postPerPage} />
            </div> 
        </div>
    )
}

export default MatchesList