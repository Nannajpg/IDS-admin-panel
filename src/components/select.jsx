function SelectComponent({ label, placeholder, options, value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <>
      <label className="block text-lg font-bold mb-2">{label}</label>
      <select
        className="w-full p-1 focus:border-blue-500 rounded-2xl bg-white mb-2 hover:bg-[#FCC0A8]"
        onChange={handleChange}
        placeholder={placeholder ? placeholder : ""}
        defaultValue=""
        required
      >
        <option value="" selected>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            selected={option.id === value}
            value={option.id}
            key={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectComponent;
