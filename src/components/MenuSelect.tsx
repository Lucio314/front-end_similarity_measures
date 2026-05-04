import React from "react";

interface MenuSelectProps {
    options: string[]
}

function MenuSelect({options} : MenuSelectProps){
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