import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Ad from "./Ad";
import { fetchAds } from "../../features/ads/adSlice";
import { useEffect } from "react";
import AdsListHeader from "./AdsListHeader";
import ModalDeleteAd from "./ModalDeleteAd";
import useModal from "./useModal";
import { useState } from "react";

const AdsList = () => {
  const adsState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [adsFilter, setAdsFilter] = useState(adsState.ads.ads);

  const { isVisible, toggleModal, getId } = useModal();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.value === "") {
      setAdsFilter(adsState.ads.ads);
    } else {
      setAdsFilter(
        adsState.ads.ads.filter((ad) => {
          return ad.adType === e.target.value;
        })
      );
    }
  };

  return (
    <div className="w-4/6">
      <AdsListHeader />
      <select
        name="filterType"
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        onChange={(e) => handleChange(e)}
      >
        <option value="">Todos los anuncios</option>
        <option value="estatico">Estáticos</option>
        <option value="flotante">Flotantes</option>
      </select>
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
        {adsFilter.map((ad) => (
          <Ad id={ad.id} key={ad.id} showModal={toggleModal} />
        ))}
      </div>
      <ModalDeleteAd
        isVisible={isVisible}
        hideModal={toggleModal}
        getId={getId}
      />
    </div>
  );
};

export default AdsList;
