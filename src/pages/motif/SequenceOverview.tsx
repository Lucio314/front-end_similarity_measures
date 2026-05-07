import React, { type JSX } from 'react';
import type { ResultsActivitiesProps } from '../../types';
import PatternRepr from '../../components/PatternRepr';

interface SequenceOverviewProps{
    pattern: ResultsActivitiesProps[]
}

function SequenceOverview({pattern} : SequenceOverviewProps){
    const listeMotifSequence : Array<JSX.Element> = []
    for(let i=0; i<pattern.length; i++){
        listeMotifSequence.push(
            <PatternRepr name={pattern[i].name} duration={pattern[i].duration}/>
        )
        if(i !== pattern.length-1){ //Pour créer les flèches entre chaque activités
            listeMotifSequence.push(
                <div className="text-gray-400 text-xl">→</div>
            )
        }
    }


    return (
        <div className="">
            <h3 className="fw-bold mb-1">👁️ Aperçu de votre séquence</h3>
            {listeMotifSequence}
        </div>
    )
    // Il faut ajouter une div à chaque appui sur un button de PaletteActivite
    // En fonction également du multidimension, et de CreationMotif
} 


export default SequenceOverview