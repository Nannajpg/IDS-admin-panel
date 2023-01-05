import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addUser, resetUsers, setAmount} from '../../features/users/userSlice'
import * as usersServices from "../../services/users.services";
import UserCard from './UserCard'
import Pagination from './Pagination'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsersList() {
    const postPerPage = 9;
    const page = useSelector(state => state.users.page);
    const users = useSelector(state => state.users.users);
    const amount = useSelector(state => state.users.amount);
    const { userToken } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetUsers());
        const getUsers = async () => {
            try {
                const data = await usersServices.fetchUsers(userToken, page);
                console.log(userToken)
                data.items.forEach(user => {
                    dispatch(addUser(user));
                });
                dispatch(setAmount(data.paginate.total));
            } catch (error) {
                if (error.response) {
                    throw new Error(error?.response?.data.message);
                } toast.error(error.message);
            }
        }
        getUsers();
    }, [dispatch, page, amount]);

    return (
        <div className='w-4/6'>
            <header className='flex justify-between items-center py-4'>
                <Link to="/dashboard" className="bg-emerald-600 px-2 py-1 text-sm rounded-md mx-2">Volver</Link>
                <h1>Usuarios Totales: {amount}</h1>
                <Link to="/users/create" className='bg-emerald-600 px-2 py-1 rounded-md text-sm'>
                    Crear Usuario
                </Link>
            </header>

            <div className='grid grid-cols-3 gap-4'>
                {users.map(user => <UserCard user={user} key={user.id} />)}
            </div>

            <div className='py-4'>
                <Pagination postsPerPage={postPerPage} />
            </div>  
        </div>
    )
}

export default UsersList