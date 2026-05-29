import React from 'react';

interface MissingStatsProps{
    stats: string;
    valeur: number;
}

function MissingStats({stats, valeur} : MissingStatsProps){
    if(stats === "% de séquences avec trous"){
        return(
        <div className="stat-trous">
            <p className="paragraph">{stats}%</p>
            <p className="stat-trous-value">{valeur}</p>
        </div>
    )
    }else{
        return(
        <div className="stat-trous">
            <p className="paragraph">{stats}</p>
            <p className="stat-trous-value">{valeur}</p>
        </div>
    )
    } 
}

export default MissingStats