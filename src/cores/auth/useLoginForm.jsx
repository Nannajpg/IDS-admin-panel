
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { login } from '../../features/auth/authSlice';
import * as authServices from '../../services/auth.services';
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const useLoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputValues, handleChange } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const user = await authServices.login(inputValues);
      console.log(user)
      if(user.item.user.role.toLowerCase() !== "admin"){
        throw new Error("Acceso no autorizado: el usuario debe ser administrador")
      }
      dispatch(login(user.item));
      navigate("/dashboard");
    } catch(error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleChange, handleSubmit };
}

export default useLoginForm;
