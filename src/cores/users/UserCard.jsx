import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as usersServices from "../../services/users.services";
import { deleteUser } from "../../features/users/userSlice";

const UserCard = ({ user }) => {

  const dispatch = useDispatch()
  const { userToken } = useSelector(state => state.auth);

console.log("id: "+user.id)

  const handleDelete = async (id) => {
      try{
        await usersServices.deleteUser(id, userToken);
        dispatch(deleteUser(id))
      }catch(e){
        console.log(e);
      }
  }

  return (
    <div key={user.id} className="bg-neutral-800 p-4 rounded-md">
      <header className="flex justify-between">
        <div className="flex gap-x-2">
          <Link
            to={`/users/edit/${user.id}`}
            className="bg-teal-600 px-2 py-1 text-xs rounded-md self-center"
          >
            Editar
          </Link>
          <button
            onClick={() => handleDelete(user.id)}
            className="bg-red-700 px-2 py-1 text-xs rounded-md self-center"
          >
            Eliminar
          </button>
        </div>
      </header>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email} </p>
      <p>Rol: {user.role}</p>
    </div>
  );
};

export default UserCard;
