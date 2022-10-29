import {useSelector, useDispatch} from 'react-redux'
import {deleteUser} from '../features/users/userSlice'
import {Link} from 'react-router-dom'

function UsersList() {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    
    const handleDelete = (id) =>{
        dispatch(deleteUser(id))
    }

    return(
        <div className='w-4/6'>
            <header className='flex justify-between items-center py-4'>
                <h1>Usuarios: {users.length}</h1>
                <Link to="/create-user" className='bg-emerald-600 px-2 py-1 rounded-md text-sm'>
                    Crear Usuario
                </Link>
            </header>

           <div className='grid grid-cols-3 gap-4'>
           {users.map(user => (
                <div key={user.id} className="bg-neutral-800 p-4 rounded-md">
                    <header className='flex justify-between'>
                        <h3>{user.id}</h3>
                        <div className='flex gap-x-2'>
                            <Link to={`/edit-user/${user.id}`} className="bg-teal-600 px-2 py-1 text-xs rounded-md self-center">Editar</Link>
                            <button onClick={() => handleDelete(user.id) } className="bg-red-700 px-2 py-1 text-xs rounded-md self-center" >Eliminar</button>
                            
                        </div>
                    </header>
                    <p>Email: {user.email}</p>
                    <p>Nombre: {user.name}</p>
                    <p>Apellido: {user.lastname}</p>
                    <p>Contraseña: {user.password}</p>
                    <p>Equipo Favorito: {user.favouriteTeam}</p>
                    <p>Permisos de Administrador: {user.isAdmin}</p>
                </div>
            ))}
           </div>
        </div>
    )
}

export default UsersList