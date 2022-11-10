import React from "react";
import useNavigation from "./useNavigation";

const Navigation = () => {

  const { currentPage ,toNextPage, toPrevPage } = useNavigation();

  return ( 
  <div style={{ textAlign: "center" }}>
    <button onClick={toPrevPage}>prev</button>
    {currentPage}
    <button onClick={toNextPage}>next</button>
  </div>
)};

export default Navigation;
