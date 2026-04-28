import React from 'react';

/**
 * @param {String} activite
 * @param {String} nombre
 * @returns 
 */
function StatsDetails({ activite, nombre }) {
    return(
        <div className="stats-details-activite">
            <div className="details-activite">
                <span className="details-activite-nom">{activite}</span>
                <span className="details-activite-nombre">{nombre}</span>
            </div>
        </div>
    )
}

export default StatsDetails