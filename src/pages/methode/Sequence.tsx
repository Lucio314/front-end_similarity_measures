import React from 'react';
import Seq from './Seq';
import ComparedSeq from './ComparedSeq';
import type { ActivitiesProps } from '../../types';

interface SequenceProps{
    activites: ActivitiesProps
    comparee : boolean
}

//A modifier pour pouvoir fonctionner avec le JSON
function Sequence({activites, comparee} : SequenceProps){
    const listSeqs = []
    if(comparee){
        for(let acti of activites){
            listSeqs.push(
                <ComparedSeq id={acti.actiId} icon={acti.icon} nomActi={acti.nomActi} temps={acti.temps}/>
            )
        }
    }else{
        for(let acti of activites){
            listSeqs.push(
                <Seq id={acti.actiId} icon={acti.icon} temps={acti.temps}/>
            )
        }
    }

    return (
        <div className="repr-sequence-demo">
            {listSeqs}
        </div>
    )
}

export default Sequence