import React, { type Dispatch, type JSX, type SetStateAction } from 'react';
import Activities from './Activities';
import { EMOJIS, type PatternActivitiesProps} from '../../types';

interface RangeActivitiesProps{
    pattern: PatternActivitiesProps[];
    setPattern: Dispatch<SetStateAction<PatternActivitiesProps[]>>;
}

function RangeActivities({pattern, setPattern} : RangeActivitiesProps){
    const listeActivities : Array<JSX.Element> = []
    for(let emoji of EMOJIS){
        listeActivities.push(<Activities emoji={emoji} pattern={pattern} setPattern={setPattern}/>)
    }

    return (
        <div className="">
            <h3 className="fw-bold mb-1">🎭 Palette d'activités</h3>
            {listeActivities}
        </div>
    )
}

export default RangeActivities