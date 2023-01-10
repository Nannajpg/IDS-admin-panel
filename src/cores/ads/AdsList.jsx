import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AdRow from "./AdRow";
import { useEffect } from "react";
import AdsListHeader from "./AdsListHeader";
import ModalDeleteAd from "./ModalDeleteAd";
import useModal from "./useModal";
import Pagination from '../../components/pagination'
import * as inventoryServices from "../../services/ads";
import { storeAllAds, setPage, setTotalPages } from "../../features/ads/adSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoading } from "../../features/global/globalSlice";

const AdsList = () => {
  const adsState = useSelector((state) => state.ads);
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const page = adsState.page;
  const totalPages = adsState.pages;
  const { isVisible, toggleModal, getId } = useModal();

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        const data = await inventoryServices.fetchAds(token, adsState);
        dispatch(storeAllAds(data));
        dispatch(setTotalPages(data.pages))
      } catch (error) {
        toast.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [adsState.amount, adsState.page, dispatch, token, adsState.search]);

  const handleSetPage = page => {
    dispatch(setPage(page-1))
  }

  return (
    <div className="w-4/6">
      <AdsListHeader />
      <div className="overflow-auto w-full rounded-lg hidden md:block">
        <table className="shadow-lg w-5/2 m-auto">
            <thead className="bg-gradient-to-r header-table-rounded from-[#D13256] to-[#F75845] text-white">
              <tr>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center rounded-l-full">ID</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Imagen</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Título</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Dirección</td>
                <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">Tipo de anuncio</td>
                <td className="rounded-r-full"></td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">            
              {adsState.ads.map((ad) => (
                <AdRow id={ad.id} key={ad.id} showModal={toggleModal} />
              ))}
            </tbody>
        </table>
      </div>

      <ModalDeleteAd
        isVisible={isVisible}
        hideModal={toggleModal}
        getId={getId}
      />

      <div className='py-4'>
          <Pagination
            currentPage={page + 1}
            totalPages={totalPages}
            handleSetPage={handleSetPage}
          />
        </div> 
      </div>
  );
};

export default AdsList;
