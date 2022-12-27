import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

function Form({ action, id }) {

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
            setUser(users.find(user => user.id === params.id))
        }
    }, [params.id, users])

   

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">

            <label htmlFor="name" className="block text-xl font-bold mb-2 ">Usuarios</label>
            
            <label htmlFor="name" className="block text-sm font-bold mb-2">Nombre:</label>
            <input name='name' type="text" placeholder="Nombre" onChange={handleChange} className="w-full p-2 rounded-md bg-zinc-600 mb-2" value={users.name} required/>

            <label htmlFor="role" className="block text-sm font-bold mb-2">Rol:</label>
            <select name="role" className="w-full p-2 rounded-md bg-zinc-600 mb-2" onChange={handleChange} required placeholder="Rol del Usuario">
                <option defaultValue="">Rol del Usuario</option>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
                <option value="advertiser">Anunciante</option>
            </select>

            <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
            <input name='email' type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 rounded-md bg-zinc-600 mb-2" required/>

            <label htmlFor="password" className="block text-sm font-bold mb-2">Contraseña:</label>
            <input name='password' type="password" placeholder="Contraseña" onChange={handleChange} className="w-full p-2 rounded-md bg-zinc-600 mb-2" required/>

            <div>
                <button className="bg-emerald-600 px-2 py-1 rounded-md">Guardar</button>

                <Link to="/users" className="bg-red-500 px-2 py-1 rounded-md mx-8">Volver</Link>
            </div>
        </form>
    )
}

export default Form;
