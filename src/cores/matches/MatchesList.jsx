import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addMatch, resetMatches, setAmount } from '../../features/matches/matchSlice'
import * as matchesServices from '../../services/matches.services'
import Match from './Match'
import Pagination from './Pagination'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from "../../features/global/globalSlice";

function MatchesList() {
    const postPerPage = 9;
    const page = useSelector(state => state.matches.page);
    const amount = useSelector(state => state.matches.amount);

    const matches = useSelector(state => state.matches.matches)
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(resetMatches());
        const getMatches = async () => {
            try {
                dispatch(setLoading(true));
                const data = await matchesServices.fetchMatches(page);
                data.games.forEach(match => {
                    dispatch(addMatch(match));
                });
                console.log(data.paginate.total)
                dispatch(setAmount(data.paginate.total));
            } catch (error) {
                if (error.response) {
                throw new Error(
                    error?.response?.data?.message || "Error desconocido del servidor"
                );
                } toast.error(error.message);
            } finally {
                dispatch(setLoading(false));
            }
        }
        getMatches();
    }, [dispatch, page, amount])

    return (
        <div className='w-4/6'>
            <header className='flex justify-between items-center py-4'>
                <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
                <h1>Partidos Totales: {matches.length}</h1>
                
                <Link to="/matches/create" className='bg-emerald-600 px-2 py-1 rounded-md text-sm'>
                    Crear Partido
                </Link>
            </header>

            <div className='grid grid-cols-3 gap-4'>
                {matches.map(match => (<Match match={match} key={match.id}/>))}
            </div>

            <div className='py-4'>
                <Pagination postsPerPage={postPerPage} />
            </div> 
        </div>
    )
}

export default MatchesList