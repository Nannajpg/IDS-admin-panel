
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useForm from '../../components/useForm';
import { login } from '../../features/auth/authSlice';
import * as authServices from '../../services/auth.services';

const useLoginForm = () => {

  const [error, setError] = useState(null);
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
      setError(e);
    }
  }

  return { handleChange, handleSubmit, error };
}

export default useLoginForm;