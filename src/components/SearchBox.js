import React from 'react';

function SearchBox({ query, setQuery }) {

    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    // data entry components --> inout, cehckboxes, dropdown
    // controlled --> value is passed explicitly 
    // uncontrolled --> not provided with a value

    return <input
        className='max-w-lg min-w-[512px] m-[20px] p-[10px] block border border-1 border-gray-500 bg-[transparent] text-white rounded-[10px]'
        value={query}
        onChange={handleInputChange}
        placeholder='Type name of a place'
    />
}

export default SearchBox;