import React, { type Dispatch, type SetStateAction } from 'react';
import Activities from './Activities';
import type { ResultsActivitiesProps } from '../../types';

interface RangeActivitiesProps{
    pattern: ResultsActivitiesProps[];
    setPattern: Dispatch<SetStateAction<ResultsActivitiesProps[]>>;
}

function RangeActivities({pattern, setPattern} : RangeActivitiesProps){
    return (
        <div className="palette-activites">
            <h3 className="fw-bold mb-1">🎭 Palette d'activités</h3>
            <Activities/>
        </div>
    )
}

export default RangeActivities