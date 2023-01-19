import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AdRow from "./AdRow";
import { useEffect, useState, useCallback } from "react";
import AdsListHeader from "./AdsListHeader";
import Pagination from "../../components/pagination";
import * as inventoryServices from "../../services/ads";
import {
  storeAllAds,
  setPage,
  setTotalPages,
  setAmount,
} from "../../features/ads/adSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoading } from "../../features/global/globalSlice";

const AdsList = () => {
  const ads = useSelector((state) => state.ads.ads);
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.ads.page);
  const size = 7;
  const totalPages = useSelector((state) => state.ads.totalPages);
  const [adtype, setAdtype] = useState("");
  const [search, setearch] = useState("");

  const getAds = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await inventoryServices.fetchAds(token, {
        page,
        adtype,
        search,
        size,
      });
      dispatch(storeAllAds(data.items));
      dispatch(setTotalPages(data.paginate.pages));
      dispatch(setAmount(data.paginate.total));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, token, page, adtype, search]);

  useEffect(() => {
    getAds();
  }, [getAds]);

  const handleSetPage = (page) => {
    dispatch(setPage(page - 1));
  };

  return (
    <div>
      <AdsListHeader />
      <div className="overflow-auto rounded-2xl shadow-lg">
        <table className="w-full">
          <thead className="bg-gradient-to-r header-table-rounded from-[#D13256] to-[#F75845] text-white">
            <tr>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center rounded-l-full">
                ID
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">
                Imagen
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">
                Título
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center max-[620px]:hidden">
                Descripción
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">
                Dirección
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center max-[900px]:hidden">
                Tipo de anuncio
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center max-[700px]:hidden">
                Clicks
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center max-[800px]:hidden">
                Vistas
              </td>
              <td className="p-3 w-30 rounded-r-full"></td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {console.log(ads)}
            {ads.map((ad) => (
              <AdRow ad={ad} getAds={getAds} key={ad.id} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="py-4">
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          handleSetPage={handleSetPage}
        />
      </div>
    </div>
  );
};

/*
(
    <div>
      <AdsListHeader />
      <div className="overflow-auto rounded-2xl shadow-lg">
        <table className="w-full">
          <thead className="bg-gradient-to-r header-table-rounded from-[#D13256] to-[#F75845] text-white">
            <tr>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center rounded-l-full">
                ID
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">
                Imagen
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">
                Título
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center max-[500px]:hidden">
                Descripción
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center max-[600px]:hidden">
                Dirección
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center max-[700px]:hidden">
                Tipo de anuncio
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">
                Clicks
              </td>
              <td className="p-3 w-30 text-sm font-bold tracking-wide text-center">
                Vistas
              </td>
              <td className="p-3 w-30 rounded-r-full"></td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {console.log(ads)}
            {ads.map((ad) => (
              <AdRow ad={ad} getAds={getAds} key={ad.id} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="py-4">
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          handleSetPage={handleSetPage}
        />
      </div>
    </div>
  );
*/


export default AdsList;