import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addUser, editUser } from '../features/users/userSlice.js'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { createUser } from './../services/axiosBD'

function UserForm() {

    const [user, setUser] = useState({
        id: '',
        name: '',
        role: '',
        email: '',
        password: '',
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const users = useSelector(state => state.users)

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (params.id) {
            dispatch(editUser(user))
        } else {
            createUser(user);
            dispatch(
                addUser({
                    ...user,
                    id: uuid(),
                }))
        }
        navigate('/show-users');
    }

    useEffect(() => {
        if (params.id) {
            setUser(users.find(user => user.id === params.id))
        }
    }, [params.id, users])

    return (
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">
            <label htmlFor="name" className="block text-xs font-bold mb-2">Id:</label>
            <input name='id' type="text" placeholder="ID" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2" />

            <label htmlFor="name" className="block text-sm font-bold mb-2">Nombre:</label>
            <input name='name' type="text" placeholder="Nombre" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2" />

            <label htmlFor="name" className="block text-xs font-bold mb-2">Rol:</label>
            <input name='role' type="text" placeholder="Rol" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2" />

            <label htmlFor="name" className="block text-xs font-bold mb-2">Email:</label>
            <input name='email' type="email" placeholder="Email" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2" />

            <label htmlFor="name" className="block text-xs font-bold mb-2">Contraseña:</label>
            <input name='password' type="password" placeholder="Contraseña" onChange={handleChange} value={user.title} className="w-full p-2 rounded-md bg-zinc-600 mb-2" />

            <button className="bg-emerald-600 px-2 py-1 rounded-md">Guardar</button>
        </form>
    )
}

export default UserForm;
