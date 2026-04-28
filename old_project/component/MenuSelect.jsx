import React from "react";

/**
 * @param {Array<String>} options
 * @returns 
 */
function MenuSelect({options}){
    const listOptions = []
    for(let i = 0; i < options.length; i++){
        listOptions.push(<option value={options[i]}>{options[i]}</option>)
    }

    return (
        <div className="div-select">
            <select className="select">
                {listOptions}
            </select>
        </div>
    )
}

export default MenuSelect