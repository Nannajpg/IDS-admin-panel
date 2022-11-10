import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Ad from "./Ad";
import { fetchAds } from "../../features/ads/adSlice";
import { useEffect } from "react";
import AdsListHeader from "./AdsListHeader";
import ModalDeleteAd from "./ModalDeleteAd";
import useModal from "./useModal";
import Navigation from "./Navigation";
import FilterSelect from "./FilterSelect";

const AdsList = () => {
  const state = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  const { isVisible, toggleModal, getId } = useModal();

  useEffect(() => {
    dispatch(fetchAds(state));
  }, [dispatch, state.page, state.adtype, state.search]);


  return (
    <div className="w-4/6">
      <AdsListHeader />
      <FilterSelect />
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
        {state.ads.map((ad) => (
          <Ad id={ad.id} key={ad.id} showModal={toggleModal} />
        ))}
      </div>
      <ModalDeleteAd
        isVisible={isVisible}
        hideModal={toggleModal}
        getId={getId}
      />
      <Navigation />
    </div>
  );
};

export default AdsList;
