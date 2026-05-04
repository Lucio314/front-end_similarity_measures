import React from 'react';

interface PatternCreationProps{
    dureeMotif: number;
    setDureeMotif: (nmb : number) => void;
}

function PatternCreation({dureeMotif, setDureeMotif} : PatternCreationProps){
    return (
        <div className="div-motif-body">

        </div>
    )
    // A faire plus tard, avec multidimension aussi, drag n drop
    // Il faut ajouter une div à chaque appui sur un button de PaletteActivite
}

export default PatternCreation