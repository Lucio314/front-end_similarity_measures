interface MenuSelectProps {
    options: Array<string>;
    value: number;
    onValueChange: React.Dispatch<React.SetStateAction<number>>;
}

function MenuSelect({options, value, onValueChange} : MenuSelectProps){
    const listOptions = []
    for(let i = 0; i < options.length; i++){
        listOptions.push(<option value={i}>{options[i]}</option>)
    }

    if(value === -1){
        return (
            <div className="div-select">
                <select 
                    className="select"
                />
                    {listOptions}
            </div>
        ) //Je mets ça pour l'instant, sans doute à modif pour les différents fichiers de StatsPage
    }else{
        return (
            <div className="div-select">
                <select 
                    className="select"
                    value={value}
                    onChange={e => onValueChange(parseInt(e.target.value))}
                >
                    {listOptions}
                </select>
            </div>
        )
    }
}

export default MenuSelect