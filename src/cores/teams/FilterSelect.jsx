import React from "react";
import useFilterSelect from "./useFilterSelect";

const FilterSelect = () => {
  const { handleChange } = useFilterSelect();

  return (
    <select
      name="filterType"
      className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      onChange={(e) => handleChange(e)}
    >
      <option value="">Todos los equipos</option>
      <option value="mundial">Mundial</option>
      <option value="champions">Champions</option>
    </select>
  );
};

export default FilterSelect;
