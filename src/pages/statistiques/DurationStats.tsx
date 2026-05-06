import React from 'react';

interface DurationStatsProps{
    duree: string;
    tempsDuree: number;
}

function DurationStats({duree, tempsDuree} : DurationStatsProps){
    return(
        <div className="stat-duree">
            <p className="paragraph">Durée {duree}</p>
            <p className="stat-duree-value">{tempsDuree} min</p>
        </div>
    )
}

export default DurationStats