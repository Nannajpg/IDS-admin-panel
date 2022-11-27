import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addMatch /*resetMatches */ } from '../../features/matches/matchSlice'
import * as matchesServices from '../../services/matches.services'
import Match from './Match'

function MatchesList() {

    const matches = useSelector(state => state.matches)
    const dispatch = useDispatch();

    /*useEffect(() => {
        dispatch(resetMatches());
        const getMatches = async () => {
            try {
                const data = await matchesServices.fetchMatches();
                data.forEach(match => {
                    dispatch(addMatch(match));
                });
            } catch(e) {
                console.log(e);
            }
        }
        getMatches();
    }, [dispatch]) */

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
        </div>
    )
}

export default MatchesList