import React from 'react';
import IconLoupe from './Icons/IconLoupe';

/**
 * @param {String} placeholder
 * @returns 
 */
function SearchBar({placeholder}){
    return(
        <div className="search-bar">
            <IconLoupe/>
            <input className="search-bar-input" type="text" placeholder={placeholder} />
        </div>
    )
}

export default SearchBar