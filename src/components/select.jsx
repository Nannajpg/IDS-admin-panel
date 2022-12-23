function SelectComponent({ label, placeholder, options, value, onChange }) {

    const handleChange = event => {
        onChange(event.target.value);
    }

    return (
        <>
            <label className='block text-xs font-bold mb-2'>{ label }:</label>
            <select 
                className="w-full p-1 border border-gray-300 focus:border-blue-500 rounded-md bg-slate-400 mb-2 hover:bg-slate-500" 
                onChange={handleChange} 
                placeholder={placeholder ? placeholder : ''} 
                required
            >
                { options.map(option => <option 
                    defaultValue={option.id}
                    selected={option.id === value}
                >{option.name}</option>) }
            </select>
        </>
    )
}

export default SelectComponent;
