import React from 'react';

interface DurationStatsProps{
    duree: String;
    temps: String;
}

function DurationStats({duree, temps} : DurationStatsProps){
    return(
        <div className="stat-duree">
            <p className="paragraph">Durée {duree}</p>
            <p className="stat-duree-value">{temps}</p>
        </div>
    )
}

export default DurationStats