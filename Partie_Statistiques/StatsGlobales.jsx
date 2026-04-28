import React from 'react'; 

const ICONS = {
    hash: <IconHash/>,
    type: <IconType/>,
    longueur: <IconLongueur/>,
    horloge: <IconHorloge/>
}

/**
 * @param {String} id
 * @param {String} nombre 
 * @param {String} text 
 * @returns 
 */
function StatsGlobales({id, nombre, text}){
    return(
        <div className="stats-dataset" id={id}>
            <div className="stats-dataset-icon">
                {ICONS[id]}
            </div>
            <p className="stats-dataset-valeur-paragraphe">{nombre}</p>
            <p className="stats-dataset-paragraphe">{text}</p>
        </div>
    )
}

export default StatsGlobales