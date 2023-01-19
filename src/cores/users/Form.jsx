import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from "react-router-dom";
import {FiArrowLeft as Arrow} from 'react-icons/fi'

function Form({ action, id, toEditUser }) {

    const [user, setUser] = useState({
        name: '',
        role: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const params = useParams();
    const users = useSelector(state => state.users.users)

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await action(user, id)
        navigate('/users');
    }

    useEffect(() => {
        if (params.id) {
            setUser(users.find(user => user.id === Number(params.id)))
        }
    }, [params.id, users])

    return (
        <div className="w-screen h-screen items-center justify-center flex h-full">
            <div className="flex md:w-3/4 w-full gap-[10%] md:gap-[30%]">
                <div>
                    <Link to="/users" className=""><Arrow color="#3D405B" size="2.5rem"/></Link>
                </div>
                <form onSubmit={handleSubmit} className="bg-[#EAEAEA] rounded-2xl text-black w-">
                    <div>
                        <h1 className='text-white text-xl p-2 bg-gradient-to-r from-[#D13256] to-[#F75845] shadow-md rounded-t-2xl font-bold text-justify'>Usuario</h1>
                    </div>
                    <div className='text-lg pt-3 px-7 gap-y-8 text-[#3D405B] bg-[#F1F1F1] shadow-md'>
                        <div>
                            <label htmlFor="name" className="block font-bold mb-2">Nombre</label>
                            <input name='name' type="text" placeholder="Nombre" onChange={handleChange} className="w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500" value={user.name} required/>
                        </div>
                        <div>
                            <label htmlFor="role" className="block font-bold mb-2">Tipo de usuario</label>
                            <select name="role" className="w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500" value={user.role} onChange={handleChange} required placeholder="Rol del Usuario">
                                <option value="">Tipo de usuario</option>
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                                <option value="advertiser">Anunciante</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="email" className="font-bold mb-2">Email</label>
                            <input name='email' type="email" placeholder="Email" value={user.email} onChange={handleChange} className="w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500" required/>
                        </div> 
                        <div>
                            <label htmlFor="password" className="block font-bold mb-2">Contraseña</label>
                            <input name='password' type="password" placeholder="Contraseña" onChange={handleChange} className="w-full p-1 rounded-2xl bg-white mb-2 hover:bg-slate-500" required/>
                        </div>
                    </div>
                        <div className='p-5 flex justify-center bg-[#F1F1F1] rounded-bl-lg rounded-br-lg shadow-md'>
                            <button className="font-medium py-0.4 px-6 text-white bg-gradient-to-r from-[#D13256] to-[#F75845] rounded-2xl h-8  ">Confirmar</button>
                        </div>
                </form>
            </div>
                
                
        </div>  
        
    )
}

export default Form;
