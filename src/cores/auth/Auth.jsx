import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Auth = () => {

  const auth = useSelector(state => state.auth);

  if (!auth.success) return <Navigate to='/' />
  
  return <Outlet />;
}

export default Auth