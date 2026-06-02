import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';

interface SearchBarProps{
    placeholder : string;
    value : string;
    onSearch : (value: string) => void;
}

function SearchBar({placeholder, value, onSearch} : SearchBarProps){
    return(
        <div className="search-bar">
            <MagnifyingGlassIcon/>
            <input 
                className="search-bar-input" 
                type="text" 
                placeholder={placeholder} 
                value={value} 
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchBar