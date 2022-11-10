import React from "react";
import useFilterSelect from "./useFilterSelect";

const FilterSelect = () => {

  const { handleChange } = useFilterSelect();

  return (
    <select
      name="filterType"
      className="w-1/4 p-2 rounded-md bg-zinc-600 mb-2"
      onChange={(e) => handleChange(e)}
    >
      <option value="">Todos los anuncios</option>
      <option value="static">Estáticos</option>
      <option value="float">Flotantes</option>
    </select>
  );
};

export default FilterSelect;
