
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { login } from '../../features/auth/authSlice';
import * as authServices from '../../services/auth.services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useLoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputValues, handleChange } = useForm();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authServices.login(inputValues);
      dispatch(login(user));
      
      navigate("/dashboard");
    } catch(e) {
      toast.error(e.message);
    }
  }

  return { handleChange, handleSubmit };
}

export default useLoginForm;