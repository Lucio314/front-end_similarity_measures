import React, { type Dispatch, type SetStateAction } from 'react';
import type { ResultsActivitiesProps } from '../../types';

interface PatternCreationProps{
    dureeMotif: number;
    setDureeMotif: (nmb : number) => void;
    pattern: ResultsActivitiesProps[];
    setPattern: Dispatch<SetStateAction<ResultsActivitiesProps[]>>;
}

function PatternCreation({dureeMotif, setDureeMotif, pattern, setPattern} : PatternCreationProps){
    return (
        <div className="div-motif-body">

        </div>
    )
    // A faire plus tard, avec multidimension aussi, drag n drop
    // Il faut ajouter une div à chaque appui sur un button de PaletteActivite
}

export default PatternCreation