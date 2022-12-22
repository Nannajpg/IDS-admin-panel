import { useSelector, useDispatch } from "react-redux";
import { nextPage, prevPage } from "../../features/ads/adSlice";

const useNavigation = () => {

  const state = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  const currentPage = state.page;

  const toNextPage = () => {
    if (state.page < state.pages - 1) dispatch(nextPage());
  }

  const toPrevPage = () => {
    if (state.page > 0) dispatch(prevPage()); 

  }

  return { currentPage, toNextPage, toPrevPage }; 
}

export default useNavigation