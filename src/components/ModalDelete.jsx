import React from "react";
import 'react-toastify/dist/ReactToastify.css'

function ModalDelete({ handleDelete, onClick, isVisible, item }) {

  return (
    <>
      {isVisible && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center p-10">
          <div className="md:w-1/2 lg:w-1/4 md:min-h-100 bg-white relative rounded p-5">
            <div className="">
              <h1 className="text-black text-xl font-bold pb-2 text-center">
                Eliminar
              </h1>
              <p className="text-gray-800 text-base pb-8 font-medium text-center">
                ¿Seguro que desea eliminar el {item}?
              </p>
            </div>

            <div className="flex justify-between px-2">
              <div className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-[3px]">
                <button
                  className='bg-white rounded-full px-8 font-semibold text-[#D13256] flex items-center h-[29px]'
                  onClick={onClick}
                >
                  Cancelar
                </button>
              </div>

              <button
                className='bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full px-8 font-semibold text-white flex items-center h-8'
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalDelete;