import React from 'react';

interface DetailsStatsProps{
    activite: string;
    nombre: number;
}

function DetailsStats({ activite, nombre } : DetailsStatsProps) {
    return(
        <div className="col">
            <div className="border rounded">
                <span className="">{activite} {""}</span>
                <span className="border rounded">{nombre}</span>
            </div>
        </div>
    )
}

export default DetailsStats