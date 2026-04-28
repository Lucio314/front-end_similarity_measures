import React from 'react';

/**
 * @param {String} duree 
 * @param {String} temps 
 * @returns 
 */
function StatsDurees({duree, temps}){
    return(
        <div className="stat-duree">
            <p className="paragraph">Durée {duree}</p>
            <p className="stat-duree-value">{temps}</p>
        </div>
    )
}

export default StatsDurees