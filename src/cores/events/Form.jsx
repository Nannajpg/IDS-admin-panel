import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

function EventForm({ action, id }) {

    const [event, setEvent] = useState({
        id: '',
        eventName: '',
        status:'',
    })

    const navigate = useNavigate();
    const params = useParams();
    const events = useSelector(state => state.events.events)

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await action(event, id);
        navigate('/events');
    }

    useEffect(() => {
        if (params.id) {
            setEvent(events.find(event => event.id === params.id))
        }
    }, [params.id, events]);

    return (
        <div className='flex items-center h-screen'>
            <form onSubmit={handleSubmit} className="bg-[#EAEAEA] rounded-2xl text-black">
                <div>
                    <h1 className='text-white text-xl p-2 bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-t-2xl font-bold text-justify'>Crear competición</h1>
                </div>
                <div className='text-lg pt-2 px-7 text-[#3D405B] bg-white'>
                    <label htmlFor="name" className="block font-bold mb-2">Nombre</label>
                    <input name='eventName' type="text" placeholder="Nombre" onChange={handleChange} className="w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500" required />
                    <label htmlFor="status" className="block font-bold mb-2">Estado de Competición</label>
                    <select name="status" className="w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500" onChange={handleChange} placeholder="Estado del Evento" required>
                        <option defaultValue="">Seleccionar estado</option>
                        <option value={0}>Inactivo</option>
                        <option value={1}>Activo</option>
                    </select>
                </div>
                <div className='pt-20 p-4 flex justify-center bg-white'>
                    <button className="font-medium py-0.4 px-6 text-white bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-2xl">Confirmar</button>
                </div>
                <Link to="/events">xd</Link>
            </form>
            
        </div>

        
    )
}

export default EventForm;
