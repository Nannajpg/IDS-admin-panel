import React from "react";
import { CgMenu } from "react-icons/cg";
import { MdInventory } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";

function LateralBar({ isVisible, hideLateralBar }) {
  return (
    <>
      {isVisible && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center">
          <div className="md:w-1/6 md:min-h-screen bg-zinc-800 p-5">
            <div className="font-sans">
              <button className="ml-2 mb-4 hover:bg-zinc-900 rounded-full p-2" onClick={() => hideLateralBar(isVisible)}>
                <CgMenu size="2rem" />
              </button>
              <div>
                <button className="hover:bg-zinc-900 rounded p-4 flex text-2xl ">
                  Inventario <MdInventory className="ml-2" size="2rem" />
                </button>
                <button className="hover:bg-zinc-900 rounded p-4 flex text-2xl">
                  Filtrar por equipos <BsSearch className="ml-2" size="2rem" />
                </button>
                <button className="hover:bg-zinc-900 rounded p-4 flex text-2xl">
                  Ayuda <FiHelpCircle className="ml-2" size="2rem" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LateralBar;
