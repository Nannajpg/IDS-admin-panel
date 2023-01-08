import { useDispatch } from "react-redux";
import { toSearch, toFirstPage, toFilter } from "../../features/ads/adSlice";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';

const useFilterSelect = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    try {
      dispatch(setLoading(true));
      dispatch(toFilter(e.target.value));
      dispatch(toSearch(""));
      dispatch(toFirstPage());
  } catch (error) {
    toast.error(error.message);
  } finally {
    dispatch(setLoading(false));
  }
}

  return { handleChange };
}

export default useFilterSelect