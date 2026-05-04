import React from 'react';
import Sequence from './Sequence';
import type { ActivitiesProps } from '../../types';

interface FTHTComparedSequencesProps{
    activites: ActivitiesProps;
    activitesTronquees: ActivitiesProps;
}

function FTHTComparedSequences({activites, activitesTronquees} : FTHTComparedSequencesProps){
    return (
        <div className="sequences-comparees">
            <div>
                <p>Séquence 1 (tronquée)</p>
                <div>
                    <Sequence activites={activitesTronquees} comparee={true}/>
                </div>
            </div>
            <div>
                <p>Séquence 2</p>
                <div>
                    <Sequence activites={activites} comparee={true}/>
                </div>
            </div>
        </div>
    )
}

export default FTHTComparedSequences