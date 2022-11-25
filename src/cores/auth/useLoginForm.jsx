
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useForm from '../../components/useForm';
import { login } from '../../features/auth/authSlice';
import * as authServices from '../../services/auth.services';

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
      alert(e)
    }
  }

  return { handleChange, handleSubmit };
}

export default useLoginForm;