import React from 'react';

interface DetailsStatsProps{
    activite: string;
    nombre: number;
}

function DetailsStats({ activite, nombre } : DetailsStatsProps) {
    return(
        <div className="stats-details-activite">
            <div className="details-activite">
                <span className="details-activite-nom">{activite}</span>
                <span className="details-activite-nombre">{nombre}</span>
            </div>
        </div>
    )
}

export default DetailsStats