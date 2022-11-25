import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addUser, resetUsers} from '../../features/users/userSlice'
import * as usersServices from "../../services/users.services";
import UserCard from './UserCard'

function UsersList() {

    const users = useSelector(state => state.users)
    const { userToken } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetUsers());
        const getUsers = async () => {
            try {
                const data = await usersServices.fetchUsers(userToken);
                data.users.forEach(user => {
                    dispatch(addUser(user));
                });
            } catch(e) {
                console.log(e);
            }
        }
        getUsers();
    }, [dispatch])

    return (
        <div className='w-4/6'>
            <header className='flex justify-between items-center py-4'>
                <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
                <h1>Usuarios Totales: {users.length}</h1>
                <Link to="/users/create" className='bg-emerald-600 px-2 py-1 rounded-md text-sm'>
                    Crear Usuario
                </Link>
            </header>

            <div className='grid grid-cols-3 gap-4'>
                {users.map(user => <UserCard user={user} key={user.id} />)}
            </div>
        </div>
    )
}

export default UsersList