import React from "react";
import { Link } from "react-router-dom";

function MenuCard({ amount, topic, route, textStyles }) {
  return (
    <div className="bg-white w-60 h-32 rounded-lg">
      <div
        className={
          `w-full h-[70%] flex items-center gap-2 text-[#3D405B] font-semibold pl-3 ` +
          textStyles
        }
      >
        <h1>{amount}</h1>
        <h2>{topic}</h2>
      </div>
      <Link
        to={route}
        className="bg-gradient-offside w-full h-[30%] flex items-center rounded-b-lg text-white pl-2 font-normal text-lg"
      >
        Ir allí
      </Link>
    </div>
  );
}

export default MenuCard;
