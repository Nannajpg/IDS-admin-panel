import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Ad from "./Ad";
import { useEffect } from "react";
import AdsListHeader from "./AdsListHeader";
import ModalDeleteAd from "./ModalDeleteAd";
import useModal from "./useModal";
import Navigation from "./Navigation";
import * as inventoryServices from "../../services/ads";
import { storeAllAds } from "../../features/ads/adSlice";

const AdsList = () => {
  const adsState = useSelector((state) => state.ads);
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  const { isVisible, toggleModal, getId } = useModal();

  useEffect(() => {
    (async () => { try {
      const data = await inventoryServices.fetchAds(token, adsState)
      dispatch(storeAllAds(data))
    } catch (e) {
      alert(e);
    }
  })()
  }, [adsState]);


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
      <Navigation />
    </div>
  );
};

export default AdsList;
