import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import MenuCard from "./MenuCard";
import { MdLogout } from "react-icons/md";
import { getDashboardAmounts as fetchDashboardAmounts } from "../../services/users.services";
import { useCallback, useEffect } from "react";
import { setLoading } from "../../features/global/globalSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Menu = () => {
  const dispatch = useDispatch()  
  const {userToken} = useSelector(state => state.auth)
  const [dashboardCounts, setDashboardCounts] = useState({
    Event: 0, Promotion: 0, Sticker: 0, Team: 0, User: 0, Game: 0
  });

  const getAmounts = useCallback(async () => {
      try {
        dispatch(setLoading(true));
        const result = await fetchDashboardAmounts(userToken);
        setDashboardCounts({ ...result });
      } catch (error) {
        toast.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, userToken],
  )

  useEffect(() => {
    getAmounts();
  }, [getAmounts])

  return (
    <main className="w-screen h-screen flex flex-col md:pl-5 pt-5 gap-5 justify-start sm:items-start items-center">
      <h1 className="text-[#3D405B] text-4xl font-semibold">Panel Administrativo de Offside</h1>
      <section className="sm:w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-5 md:content-start">
        <MenuCard
          amount={dashboardCounts.User}
          topic="Usuarios"
          route="/users"
          textStyles="text-3xl"
        />
        <MenuCard
          amount={dashboardCounts.Event}
          topic="Competiciones"
          route="/users"
          textStyles="text-2xl"
        />
        <MenuCard
          amount={dashboardCounts.Team}
          topic="Equipos"
          route="/teams"
          textStyles="text-3xl"
        />
        <MenuCard
          amount={dashboardCounts.Sticker}
          topic="Cromos"
          route="/stickers"
          textStyles="text-3xl"
        />
        <MenuCard
          amount={dashboardCounts.Game}
          topic="Partidos"
          route="/matches"
          textStyles="text-3xl"
        />
        <MenuCard
          amount={dashboardCounts.Promotion}
          topic="Anuncios"
          route="/ads"
          textStyles="text-3xl"
        />
      
        <Link
          onClick={() => dispatch(logout())}
          to="/"
          className="rounded-md w-60 h-14 bg-gray-300 flex items-center text-xl pl-2 gap-2 text-[#254E5A] font-semibold"
        >
          <MdLogout size="1.5rem" color="#254E5A" />Cerrar sesión
        </Link>
      </section>
    </main>
  );
};

export default Menu;
