import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { setUsers, setAmount, setPage, setTotalPages, toSearch, toFirstPage} from '../../features/users/userSlice'
import * as usersServices from "../../services/users.services";
import UserRow from './UserRow'
import Pagination from '../../components/pagination'
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from "../../components/searchbar";
import {FiArrowLeft as Arrow} from 'react-icons/fi'

function UsersList() {

    const [search, setSearch] = useState('');
    const { page, totalPages, users, amount } = useSelector(state => state.users);
    const  {userToken} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleSetPage = page => {
        dispatch(setPage(page-1))
    }

    const handleSubmit = (e, searchRef) => {
        e.preventDefault();
        setSearch(searchRef.current.value);
      };

    const getUsers = useCallback(async () => {
            try {
                dispatch(setLoading(true));
                const data = await usersServices.fetchUsers(userToken, page, search);
                dispatch(setUsers(data.items));
                dispatch(setAmount(data.paginate.total));
                dispatch(setTotalPages(data.paginate.pages))
            } catch (error) {
                if (error.response) {
                    throw new Error(error?.response?.data.message);
                } toast.error(error.message);
            } finally {
                dispatch(setLoading(false));
            }
        },
      [dispatch, page, userToken, search]
    )
    
    useEffect(() => {
        getUsers();
    }, [getUsers])
    

    return (
        <div className='md:w-4/6 w-11/12'>
            <header>
                <div>
                    <div className='flex'>
                        <Link to="/dashboard" className=""><Arrow color="#3D405B" size="2.5rem"/></Link>
                        <h1 className='text-[#3D405B] font-bold text-3xl'>Gestionar Usuarios</h1>
                    </div>
                    <div className='py-1'>
                        <h1 className='text-[#3D405B] font-medium text-lg'>Usuarios: {amount}</h1>
                    </div>
                    <div className='flex'>
                        <Link to="/users/create" className='bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full px-8 font-semibold text-white flex items-center h-8 mb-1'>
                            Crear
                        </Link>
                    </div>
                </div>
            </header>

            <div className="overflow-auto shadow-lg rounded-lg">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r header-table-rounded from-[#D13256] to-[#F75845] text-white">
                        <tr>
                            <td className="p-3 w-30 text-sm font-bold tracking-wide text-center rounded-l-full">ID</td>
                            <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Nombre</td>
                            <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Email</td>
                            <td className="p-3 w-30 text-sm font-bold tracking-wide text-center max-[900px]:hidden">Tipo de usuario</td>
                            <td className="rounded-r-full"></td>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 rounded-lg ">            
                        {users.map(user => <UserRow user={user} getUsers={getUsers} key={user.id} />)}
                        </tbody>
                    </table>
                
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