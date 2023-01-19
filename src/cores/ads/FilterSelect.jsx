import React from "react";
import useFilterSelect from "./useFilterSelect";

const FilterSelect = () => {

  const { handleChange } = useFilterSelect();

  return (
    <select
      name="filterType"
      className="p-1 rounded-2xl bg-white mb-2 h-8 hover:bg-slate-500"
      onChange={(e) => handleChange(e)}
    >
      <option value="">Todos los anuncios</option>
      <option value="static">Estáticos</option>
      <option value="float">Flotantes</option>
    </select>
  );
};

export default FilterSelect;
