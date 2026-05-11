import React, { type Dispatch, type JSX, type SetStateAction } from 'react';
import type { PatternActivitiesProps } from '../../types';
import ActivitiesDragNDrop from './ActivitiesDragNDrop';

interface PatternCreationProps{
    dureeMotif: number;
    setDureeMotif: (nmb : number) => void;
    pattern: PatternActivitiesProps[];
    setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
}

function PatternCreation({dureeMotif, setDureeMotif, pattern, setPattern} : PatternCreationProps){
    const listeActivitiesDragNDrop : Array<JSX.Element> = []
        for(let i=0; i<pattern.length; i++){
            listeActivitiesDragNDrop.push(
                <ActivitiesDragNDrop 
                    emoji={pattern[i].emoji} 
                    name={pattern[i].name} 
                    duration={pattern[i].duration} 
                    dureeMotif={dureeMotif} 
                    setDureeMotif={setDureeMotif}
                />
            )
        }

    return (
        <div className="">

        </div>
    )
    // A faire plus tard avec drag n drop
    // Il faut ajouter une div à chaque appui sur un button de PaletteActivite
}

export default PatternCreation