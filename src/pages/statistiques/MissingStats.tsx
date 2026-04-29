import React from 'react';

interface MissingStatsProps{
    stats: String;
    valeur: String;
}

function MissingStats({stats, valeur} : MissingStatsProps){
    return(
        <div className="stat-trous">
            <p className="paragraph">{stats}</p>
            <p className="stat-trous-value">{valeur}</p>
        </div>
    )
}

export default MissingStats