import React from 'react'; 

/**
 * @param {String} nombre 
 * @param {String} text 
 * @returns 
 */
function StatsSequencesGlobales({nombre, text}){
    return(
        <div className="stats-sequences">
            <p className="stats-sequences-valeur-paragraphe">{nombre}</p>
            <p className="stats-sequences-paragraphe">{text}</p>
        </div>
    )
}

export default StatsSequencesGlobales