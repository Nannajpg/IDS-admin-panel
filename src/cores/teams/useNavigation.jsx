import { useSelector, useDispatch } from "react-redux";
import { nextPage, prevPage } from "../../features/teams/teamSlice";

const useNavigation = () => {

  const teams = useSelector((state) => state.teams);
  const dispatch = useDispatch();

  const currentPage = teams.page;
  const toNextPage = () => {
    if (teams.page < teams.pages) dispatch(nextPage());
  }

  const toPrevPage = () => {
    if (teams.page > 0) dispatch(prevPage()); 
  }

  return { currentPage, toNextPage, toPrevPage }; 
}

export default useNavigation