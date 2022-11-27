import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

function MatchForm({ action, id }) {

    const [match, setMatch] = useState({
        id: "",
        team1: "",
        team2: "",
        myFile: null,
        status: "",
        event: "",
    })

    const navigate = useNavigate();
    const params = useParams();
    const matches = useSelector(state => state.matches)

    const handleChange = (e) => {
        setMatch({
            ...match,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await action(match, id);
        navigate('/matches');
    }

    useEffect(() => {
        if (params.id) {
            setMatch(matches.find(match => match.id === params.id))
        }
    }, [params.id, matches]);

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">
            
            <label htmlFor="name" className="block text-xl font-bold mb-2" >Partidos</label> 

            <label htmlFor="team1" className="block text-sm font-bold mb-2">Equipo 1:</label>
            <select name="team1" className="w-full p-2 rounded-md bg-zinc-600 mb-2" onChange={handleChange} placeholder="Equipo 1" required>
                <option defaultValue="">Equipo 1</option>
                <option value="Alemania">Alemania</option>
                <option value="Argentina">Argentina</option>
                <option value="Brasil">Brasil</option>
                <option value="España">España</option>
            </select>

            <label htmlFor="team2" className="block text-sm font-bold mb-2">Equipo 2:</label>
            <select name="team2" className="w-full p-2 rounded-md bg-zinc-600 mb-2" onChange={handleChange} placeholder="Equipo 2" required>
                <option defaultValue="">Equipo 2</option>
                <option value="Alemania">Alemania</option>
                <option value="Argentina">Argentina</option>
                <option value="Brasil">Brasil</option>
                <option value="España">España</option>
            </select>

            <label htmlFor="date" className="block text-sm font-bold mb-2">Fecha:</label>
            <input name='date' type="date" onChange={handleChange} className="w-full p-2 rounded-md bg-zinc-600 mb-2" required />
             
            <label htmlFor="event" className="block text-sm font-bold mb-2">Evento:</label>
            <select name="event" className="w-full p-2 rounded-md bg-zinc-600 mb-2" onChange={handleChange} placeholder="Evento" required>
                <option defaultValue="">Evento</option>
                <option value="FIFA World Cup 2022">FIFA World Cup 2022</option>
                <option value="UEFA Champions League">UEFA Champions League</option>
                <option value="CONMEBOL Libertadores">CONMEBOL Libertadores</option>
                <option value="AFC Asian Cup">AFC Asian Cup</option>
            </select>

            <label className='block text-sm mb-2 font-bold' htmlFor="file_input">
                    Subir Archivo de Excel
                </label>
                <input
                    className="w-full p-2 rounded-md bg-zinc-600 mb-2 file:rounded-md file:border-none file:bg-zinc-700 file:text-white hover:file:bg-zinc-800 hover:file:cursor-pointer"
                    aria-describedby="file_input_help"
                    name="file_input"
                    type="file"
                    accept='.xlsx'
                    onChange={(e) => setMatch((match) => ({
                        ...match,
                        myFile: e.target.files[0],
                    }))}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-2" id="file_input_help">
                    Formato: xlsx
                </p>   
            <button className="bg-emerald-600 px-2 py-1 rounded-md">Guardar</button>
        </form>
    )
}

export default MatchForm;