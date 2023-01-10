import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as usersServices from "../../services/users.services";
import { deleteUser, setAmount } from "../../features/users/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoading } from "../../features/global/globalSlice";
import { MdModeEditOutline as Pencil } from "react-icons/md"
import {RiDeleteBin6Line as Bin } from "react-icons/ri"

const UserRow = ({ user }) => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const amount = useSelector((state) => state.events);

  const handleDelete = async (id) => {
    try {
      dispatch(setLoading(true));
      dispatch(setAmount(amount - 1));
      await usersServices.deleteUser(id, userToken);
      dispatch(deleteUser(id));
    } catch (error) {
      if (error.response) {
        throw new Error(error?.response?.data.message);
      }
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <tr className='bg-white'>
      <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{user.id}</td>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{user.name}</td>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{user.email}</td>
            <td className='p-3 text-sm text-black whitespace-nowrap text-center font-medium'>{user.role}</td>
            <td className='p-3 w-30 flex gap-2'>
            <Link
              to={`/users/edit/${user.id}`}
            >
            <Pencil color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/>
            </Link>
            <button
              onClick={() => handleDelete(user.id)}
            >
            <Bin color='white' className="bg-gradient-to-b from-[#D13256] to-[#F75845] rounded-full p-1" size="2rem"/>
          </button>
            </td>
    </tr> 
  );
};

export default UserRow;