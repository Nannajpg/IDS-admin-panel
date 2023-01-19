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
      <option value="">Todos los equipos</option>
      <option value="mundial">Mundial</option>
      <option value="champions">Champions</option>
    </select>
  );
};

export default FilterSelect;
