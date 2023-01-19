import { useEffect } from "react";
import { login } from "../features/auth/authSlice";
import { setLoading } from "../features/global/globalSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const useLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const loginData = localStorage.getItem("loggedUser");
      if (!loginData) return;
      dispatch(login(JSON.parse(loginData)));
    } catch (e) {
      toast.error(e.message);
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  return;
};

export default useLocalStorage;
