import { useDispatch } from "react-redux";
import { toSearch, toFirstPage, toFilter } from "../../features/ads/adSlice";

const useFilterSelect = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(toFilter(e.target.value));
    dispatch(toSearch(""));
    dispatch(toFirstPage());
  };

  return { handleChange };
}

export default useFilterSelect