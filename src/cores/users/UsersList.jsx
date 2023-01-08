import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addUser, resetUsers, setAmount, setPage, setTotalPages} from '../../features/users/userSlice'
import * as usersServices from "../../services/users.services";
import UserCard from './UserCard'
import Pagination from '../../components/pagination'
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsersList() {

    const { page, totalPages, users, amount } = useSelector(state => state.users);
    const { userToken } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    console.log(page, totalPages)

    const handleSetPage = page => {
        dispatch(setPage(page-1))
    }

    useEffect(() => {
        dispatch(resetUsers());
        const getUsers = async () => {
            try {
                dispatch(setLoading(true));
                const data = await usersServices.fetchUsers(userToken, page);
                data.items.forEach(user => {
                    dispatch(addUser(user));
                });
                dispatch(setAmount(data.paginate.total));
                dispatch(setTotalPages(data.paginate.pages))
            } catch (error) {
                if (error.response) {
                    throw new Error(error?.response?.data.message);
                } toast.error(error.message);
            } finally {
                dispatch(setLoading(false));
            }
        }
        getUsers();
    }, [dispatch, page, amount, userToken]);

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
                <Pagination
                    currentPage={page+1}
                    totalPages={totalPages}
                    handleSetPage={handleSetPage}
                />
            </div>  

   
        </div>
    )
}

export default UsersList