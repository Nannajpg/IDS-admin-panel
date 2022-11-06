import React from "react";
import { CgMenu } from "react-icons/cg";
import { GiChest } from "react-icons/gi";
import { AiOutlineMail } from "react-icons/ai";
import { BsCoin } from "react-icons/bs";
import LateralBar from "./LateralBar";
import useLateralBar from "./useLateralBar";

function NavBar() {
  const { isVisible, toggleLateralBar } = useLateralBar();

  return (
    <>
      <LateralBar isVisible={isVisible} hideLateralBar={toggleLateralBar} />
      <nav className="bg-zinc-800 py-4 flex justify-between mb-4">
        <button
          className="ml-5 hover:bg-zinc-900 rounded-full p-2"
          onClick={() => toggleLateralBar(isVisible)}
        >
          <CgMenu size="2rem" />
        </button>

        <div className="flex w-2/12 justify-around">
          <button className="hover:bg-zinc-900 rounded-full p-2">
            <GiChest size="2rem" />
          </button>
          <button className="hover:bg-zinc-900 rounded-full p-2">
            <AiOutlineMail size="2rem" />
          </button>
          <h1 className="flex text-2xl p-2">
            <BsCoin size="2rem" className="mr-1" />
            50
          </h1>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
