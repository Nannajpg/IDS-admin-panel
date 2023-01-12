import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

const Auth = () => {

  const auth = useSelector(state => state.auth);

  if (!auth.success) return <Navigate to='/' />

  return (
          <>
            <Sidebar />
            <Navbar />
            <Outlet />
          </>
        );
}

export default Auth