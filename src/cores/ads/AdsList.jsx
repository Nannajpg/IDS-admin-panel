import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ad from "./Ad";
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
import SearchBar from "../../components/searchbar";

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
  }, [adsState.amount, adsState.page, dispatch, token, SearchBar]);

  const handleSetPage = page => {
    dispatch(setPage(page-1))
  }

  return (
    <div className="w-4/6">
      <AdsListHeader />
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
        {adsState.ads.map((ad) => (
          <Ad id={ad.id} key={ad.id} showModal={toggleModal} />
        ))}
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
