import React from "react";
import { deleteAd, fetchAds } from "../../features/ads/adSlice";
import { useDispatch, useSelector } from "react-redux";

function ModalDeleteAd({ isVisible, hideModal, getId }) {
  const dispatch = useDispatch();
  const id = getId();

  const state = useSelector(state => state.ads);

  return (
    <>
      {isVisible && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center p-10">
          <div className="md:w-2/5 md:min-h-100 bg-white relative rounded p-5">
            <div className="font-sans">
              <h1 className="text-black text-xl font-bold pb-2">
                ¿Eliminar Anuncio?
              </h1>
              <p className="text-gray-800 text-base pb-14 font-medium">
                ¿Seguro que desea eliminar el anuncio?
              </p>
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-500 rounded p-2 hover:bg-gray-700"
                onClick={() => hideModal(isVisible)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-700 rounded p-2 hover:bg-red-800"
                onClick={async () => {
                  await dispatch(deleteAd(id, state));
                  await dispatch(fetchAds(state));
                  hideModal(isVisible);
                }}
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