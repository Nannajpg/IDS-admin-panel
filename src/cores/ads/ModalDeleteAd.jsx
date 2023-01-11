import React from "react";
import * as adsServices from "../../services/ads";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function ModalDeleteAd({ isVisible, hideModal, getId, onDelete }) {
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const id = getId();

  const handleDelete = async () => {
    try {
      dispatch(setLoading(true));
      await adsServices.deleteAd(token, id);
      hideModal(isVisible);
      onDelete();
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <>
      {isVisible && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center p-10">
          <div className="md:w-1/4 md:min-h-100 bg-white relative rounded p-5">
            <div className="">
              <h1 className="text-black text-xl font-bold pb-2 text-center">
                ¿Eliminar Anuncio?
              </h1>
              <p className="text-gray-800 text-base pb-8 font-medium text-center">
                ¿Seguro que desea eliminar el anuncio?
              </p>
            </div>

            <div className="flex justify-between px-2">
              <div className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-[3px]">
                <button
                  className='bg-white rounded-full px-8 font-semibold text-[#D13256] flex items-center h-[29px]'
                  onClick={() => hideModal(isVisible)}
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

export default ModalDeleteAd;