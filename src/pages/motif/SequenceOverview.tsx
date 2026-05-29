import { type JSX } from 'react';
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
                <div 
                    className="text-secondary fs-4 p-1 align-self-center"
                >
                    →
                </div>
            )
        }
    }


    return (
        <div 
            id="pattern-show-sequence"
            className="border rounded p-3"
            style={{
                borderColor: '#9c86ec',
                backgroundColor: '#fafafa'
            }}
            hidden
        >
            <h5 
                className="text-sm"
                style={{
                    color: "#272727"
                }}
            >
                👁️ Aperçu de votre séquence</h5>
            <div className="d-flex justify-content-start p-3">
                {listeMotifSequence}
            </div>
        </div>
    )
    // Il faut ajouter une div à chaque appui sur un button de PaletteActivite
    // En fonction également du multidimension, et de CreationMotif
} 


export default SequenceOverview