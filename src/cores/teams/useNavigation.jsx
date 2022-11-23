import { useSelector, useDispatch } from "react-redux";
import { nextPage, prevPage } from "../../features/teams/teamSlice";

const useNavigation = () => {

  const state = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const currentPage = state.page;

  const pagesAmount = Math.ceil(state.amount / 6);

  const toNextPage = () => {
    if (state.page < pagesAmount - 1) dispatch(nextPage());
  }

  const toPrevPage = () => {
    if (state.page > 0) dispatch(prevPage()); 

  }

  return { currentPage, toNextPage, toPrevPage }; 
}

export default useNavigation