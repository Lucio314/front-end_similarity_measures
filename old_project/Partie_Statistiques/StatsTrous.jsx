import React from 'react';

/**
 * 
 * @param {String} stats 
 * @param {String} valeur 
 * @returns 
 */
function StatsTrous({stats, valeur}){
    return(
        <div className="stat-trous">
            <p className="paragraph">{stats}</p>
            <p className="stat-trous-value">{valeur}</p>
        </div>
    )
}

export default StatsTrous