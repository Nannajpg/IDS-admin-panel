import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdModeEditOutline as Pencil } from "react-icons/md";
import { RiDeleteBin6Line as Bin } from "react-icons/ri";
import { AiOutlineFilePdf as Pdf} from 'react-icons/ai'
import "./AdRow.css";
import useModal from "../../components/useModal";
import ModalDelete from "../../components/ModalDelete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoading } from "../../features/global/globalSlice";
import { deleteAd } from "../../services/ads";

const AdRow = ({ ad, getAds }) => {
  const { isVisible, toggleModal } = useModal();
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(ad);

  const handleDelete = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      await deleteAd(userToken, ad.id);
      toggleModal();
      getAds();
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [ad.id, dispatch, getAds, toggleModal, userToken]);

  return (
    <tr className="bg-white">
      <td className="p-3 text-sm text-black whitespace-nowrap text-center font-medium">
        {ad.id}
      </td>
      <td className="p-3 text-sm text-black whitespace-nowrap flex justify-center font-medium">
        <img
          src={ad.img}
          alt="adImage"
          className="rounded-full object-contain h-8 w-8"
        />
      </td>
      <td className="p-3 text-sm text-black whitespace-nowrap text-center font-medium">
        {ad.alias}
      </td>
      <td className="p-3 text-sm text-black whitespace-nowrap text-center font-medium dots-max-text">
        {ad.description}
      </td>
      <td className="p-3 text-sm text-black whitespace-nowrap text-center font-medium dots-max-text">
        <p>
          <a href={ad.redirecTo} className="underline text-blue-600">
            {" "}
            {ad.redirecTo}
          </a>
        </p>
      </td>
      <td className="p-3 text-sm text-black whitespace-nowrap text-center font-medium">
        {ad.promotionType}
      </td>
      <td className="p-3 text-sm text-black whitespace-nowrap text-center font-medium">
        {ad.clickedQuantities}
      </td>
      <td className="p-3 text-sm text-black whitespace-nowrap text-center font-medium">
        {ad.requestedQuantities}
      </td>
      <td className="p-3 w-30 flex gap-2">
        <Link to={`/editAd/` + ad.id}>
          <Pencil
            color="white"
            className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1"
            size="2rem"
          />
        </Link>

        <button onClick={toggleModal}>
          <Bin
            color="white"
            className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1"
            size="2rem"
          />
        </button>

        <button onClick>
          <Pdf
            color="white"
            className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1"
            size="2rem"
          />
        </button>
      </td>

      <ModalDelete
        handleDelete={handleDelete}
        id={ad.id}
        onClick={toggleModal}
        isVisible={isVisible}
        item={"anuncio"}
      />
    </tr>
  );
};

export default AdRow;
