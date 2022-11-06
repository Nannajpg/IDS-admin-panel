import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="text-white text-center">
      <h1 className="text-4xl mb-36">Pagina Principal</h1>
      <div className="inline-grid ">
        <Link to="/adList" className="bg-indigo-600 p-4 rounded text-4x1 mb-5">
          Lista de Anuncios
        </Link>
        <Link to="/teamList" className="bg-indigo-600 p-4 rounded text-4x1">
          Lista de Equipos
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
