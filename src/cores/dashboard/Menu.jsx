import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Menu = () => {

  const dispatch = useDispatch();

  return (
    <section className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">
      <h1 className="text-center text-lg font-bold">¡Bienvenido al Panel Administrativo de Offside!</h1>
      <br />
      <Link
        to="/users"
        className="bg-emerald-600 px-2 py-1 rounded-md mx-2 my-2 "
      >
        Usuarios
      </Link>

      <Link 
        to="/events" className="bg-emerald-600 px-2 py-1 rounded-md mx-2 my-2">
        Competiciones
      </Link>
      <Link
        to="/ads" className="bg-emerald-600 px-2 py-1 rounded-md mx-2 my-2">
        Anuncios
      </Link>

      <Link
        to="/stickers" className="bg-emerald-600 px-2 py-1 rounded-md mx-2 my-2">
        Cromos
      </Link>

      <Link
        to="/teams" className="bg-emerald-600 px-2 py-1 rounded-md mx-2 my-2">
        Equipos
      </Link>

      <Link
        to="/matches" className="bg-emerald-600 px-2 py-1 rounded-md mx-2 my-2">
        Partidos
      </Link>

      <br />
      <br />

      <Link
        onClick={() => dispatch(logout())}
        to="/"
        className="bg-red-700 px-2 py-1 rounded-md mx-2"
      >
        Logout
      </Link>
    </section>
  );
};

export default Menu;
