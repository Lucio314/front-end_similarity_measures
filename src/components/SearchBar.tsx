import React from 'react';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';

interface SearchBarProps{
    placeholder : String;
}

function SearchBar({placeholder} : SearchBarProps){
    return(
        <div className="search-bar">
            <MagnifyingGlassIcon/>
            <input className="search-bar-input" type="text" placeholder={placeholder}/>
        </div>
    )
}

export default SearchBar