
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { login } from '../../features/auth/authSlice';
import * as authServices from '../../services/auth.services';
import { setLoading } from "../../features/global/globalSlice";

const useLoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputValues, handleChange } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const user = await authServices.login(inputValues);
      dispatch(login(user));
      navigate("/dashboard");
    } catch(e) {
      alert(e);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleChange, handleSubmit };
}

export default useLoginForm;
