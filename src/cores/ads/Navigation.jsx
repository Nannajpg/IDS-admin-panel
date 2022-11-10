import React from "react";
import useNavigation from "./useNavigation";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Navigation = () => {
  const { currentPage, toNextPage, toPrevPage } = useNavigation();

  return (
    <div className="flex justify-center">
      <button onClick={toPrevPage}>
        <BsFillArrowLeftCircleFill size={"2rem"} />
      </button>
      <h1 className="text-2xl px-5">{currentPage}</h1>
      <button onClick={toNextPage}>
        <BsFillArrowRightCircleFill size={"2rem"} />
      </button>
    </div>
  );
};

export default Navigation;
