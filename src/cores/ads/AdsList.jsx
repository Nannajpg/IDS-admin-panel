import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Ad from './Ad'
import { fetchAds } from '../../features/ads/adSlice';
import { useEffect } from 'react';
import AdsListHeader from './AdsListHeader';
import ModalDeleteAd from './ModalDeleteAd';
import useModal from './useModal';

const AdsList = () => {
  const adsState = useSelector(state => state);
  const dispatch = useDispatch();

  const { isVisible, toggleModal, getId } = useModal();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <div className="w-4/6">
      <AdsListHeader />
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
       {adsState.ads.ads.map(ad => <Ad id={ad.id} key={ad.id} showModal={toggleModal} />)}
      </div>
      <ModalDeleteAd isVisible={isVisible} hideModal={toggleModal} getId={getId} />
    </div>
  )
}

export default AdsList