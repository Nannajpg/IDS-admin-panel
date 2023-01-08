import React from "react";
import { deleteTeam, fetchTeams } from "../../features/teams/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { setLoading } from "../../features/global/globalSlice";

function ModalDeleteTeam({ isVisible, hideModal, getId }) {
  const dispatch = useDispatch();
  const id = getId();

  const state = useSelector((state) => state.teams);
  const {userToken} = useSelector((state) => state.auth)

  return (
    <>
      {isVisible && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center p-10">
          <div className="md:w-2/5 md:min-h-100 bg-white relative rounded p-5">
            <div className="font-sans">
              <h1 className="text-black text-xl font-bold pb-2">
                ¿Eliminar Equipo?
              </h1>
              <p className="text-gray-800 text-base pb-14 font-medium">
                ¿Seguro que desea eliminar este equipo?
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
                  try {
                    dispatch(setLoading(true));
                    await dispatch(deleteTeam({userToken, id})).unwrap();
                    await dispatch(fetchTeams({userToken, state})).unwrap();
                    hideModal(isVisible);
                  } catch (error) {
                    toast.error(error.message);
                  } finally {
                    dispatch(setLoading(false));
                  }
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

export default ModalDeleteTeam;
