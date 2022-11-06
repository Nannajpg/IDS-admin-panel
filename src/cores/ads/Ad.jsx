import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//import { deleteAd } from '../../features/ads/adSlice';

const Ad = ({ id, isVisible, showModal }) => {
  const ad = useSelector(state => state.ads.ads.find(ad => ad.id === id));
  //const dispatch = useDispatch();

  //const handleDelete = async (e) => {
    //const res = await dispatch(deleteAd(id));
    //return res;
  //}

  return (
    <div key={id} className="bg-neutral-800 p-4 rounded-md">
            <h3 className="text-center">{ad.announcer}</h3>
            <img src={ad.image} alt="adImage" className="my-5 object-contain" />
            <a href={ad.link}>Link</a>
            <p className="text-center">{ad.adType}</p>
            <div className="flex gap-x-2">
              <Link
                to={`/editAd/` + ad.id}
                className="bg-zinc-600 px-2 py-1 text-xs rounded-md"
              >
                Editar
              </Link>
              <button
                onClick={() => showModal(isVisible, id)}
                className="bg-red-500 px-2 py-1 text-xs rounded-md self-center"
              >
                Borrar
              </button>
            </div>
          </div>
  )
}

export default Ad