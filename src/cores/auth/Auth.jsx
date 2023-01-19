import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

const Auth = () => {

  const auth = useSelector(state => state.auth);

  if (!auth.success) return <Navigate to='/' />
  
  
  return(
    <>
      <Sidebar />
      <Navbar />     
      <Outlet />
    </>
    
  ) 
}

export default Auth