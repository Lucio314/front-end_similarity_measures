import React, { type Dispatch, type JSX, type SetStateAction } from 'react';
import Activities from './Activities';
import { EMOJIS, type PatternActivitiesProps} from '../../types';

interface RangeActivitiesProps{
    pattern: PatternActivitiesProps[];
    setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
    dureeMotif: number;
    setDureeMotif: React.Dispatch<React.SetStateAction<number>>;
}

function RangeActivities({pattern, setPattern, dureeMotif, setDureeMotif} : RangeActivitiesProps){
    const listeActivities : Array<JSX.Element> = []
    for(let emoji of EMOJIS){
        listeActivities.push(
            <Activities 
                emoji={emoji} 
                pattern={pattern} 
                setPattern={setPattern} 
                dureeMotif={dureeMotif} 
                setDureeMotif={setDureeMotif}
            />
        )
    }

    return (
        <div 
            className="border rounded p-3"
            style={{
                borderColor: '#9c86ec',
                backgroundColor: '#dadff1'
            }}
        >
            <h5     
                className="text-lg p-1"
                style={{
                    color: "#272727"
                }}
            >
                🎭 Palette d'activités
            </h5>
            <div className="row">
                {listeActivities}
            </div>
        </div>
    )
}

export default RangeActivities