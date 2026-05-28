import React, { type Dispatch, type JSX, type SetStateAction } from 'react';
import ActivitiesDragNDrop from './ActivitiesDragNDrop';
import type { PatternActivitiesProps } from '../../types';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface PatternCreationProps{
    dureeMotif: number;
    setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
    pattern: PatternActivitiesProps[];
    setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
}

function PatternCreation({dureeMotif, setDureeMotif, pattern, setPattern} : PatternCreationProps){
    //Pour pouvoir supprimer une div de PatternCreation

    const listeActivitiesDragNDrop : Array<JSX.Element> = []
        for(let i=0; i<pattern.length; i++){
            listeActivitiesDragNDrop.push(
                <ActivitiesDragNDrop 
                    key={pattern[i].id}
                    dureeMotif={dureeMotif}
                    setDureeMotif={setDureeMotif}
                    motif={pattern[i]}
                    pattern={pattern}
                    setPattern={setPattern}
                />
            )
        }
 

    return (
        <div className="">
            <SortableContext 
                items={pattern} 
                strategy={verticalListSortingStrategy}
            >
                {listeActivitiesDragNDrop}
            </SortableContext>
        </div>
    )
    // A faire plus tard avec drag n drop
    // Il faut ajouter une div à chaque appui sur un button de PaletteActivite
}

export default PatternCreation