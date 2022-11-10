import { useSelector, useDispatch } from "react-redux";
import { nextPage, prevPage } from "../../features/ads/adSlice";

const useNavigation = () => {

  const state = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  const currentPage = state.page;

  const pagesAmount = Math.ceil(state.amount / 6);

  const toNextPage = (pages) => {
    if (state.page < pagesAmount - 1) dispatch(nextPage());
  }

  const toPrevPage = (pages) => {
    if (state.page > 0) dispatch(prevPage()); 

  }

  return { currentPage, toNextPage, toPrevPage }; 
}

export default useNavigation