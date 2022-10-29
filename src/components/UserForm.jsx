import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {addUser, editUser} from '../features/users/userSlice.js'
import {v4 as uuid} from 'uuid'
import {useNavigate, useParams} from 'react-router-dom'

function UserForm() {

    const [user, setUser] = useState({
        name:'', 
        lastname:'',
        email:'',
        password:'',
        favouriteTeam:'',
        isAdmin:'',
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const users = useSelector (state => state.users)

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (params.id){
            dispatch(editUser(user))
        } else {
            dispatch(
                addUser({
                ...user,
                id: uuid(),
            }))
        }
        navigate('/show-users');
    }

    useEffect(()=>{ 
        if (params.id){
            setUser(users.find(user => user.id === params.id))
        }
    },[params.id, users])

  return(
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">
        <label htmlFor="name" className="block text-sm font-bold mb-2">Nombre:</label>
        <input name='name' type="text" placeholder="Nombre" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2"/>

        <label htmlFor="name" className="block text-xs font-bold mb-2">Apellido:</label>
        <input name='lastname' type="text" placeholder="Apellido" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2"/>

        <label htmlFor="name" className="block text-xs font-bold mb-2">Email:</label>
        <input name='email' type="email" placeholder="Email" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2"/>

        <label htmlFor="name" className="block text-xs font-bold mb-2">Contraseña:</label>
        <input name='password' type="password" placeholder="Contraseña" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2"/>

        <label htmlFor="name" className="block text-xs font-bold mb-2">Equipo Favorito:</label>
        <input name='favouriteTeam' type="text" placeholder="Equipo Favorito" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2"/>

        <label htmlFor="name" className="block text-xs font-bold mb-2">Permisos de Administrador:</label>
        <input name='isAdmin' type="text" placeholder="Permisos" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2"  />
        <button className="bg-emerald-600 px-2 py-1 rounded-md">Guardar</button>
    </form>
  )
}

export default UserForm;
