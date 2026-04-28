import React from 'react';
import SeqComparee from './SeqComparee';

const ACTIVITIES = [
    {actiId: "acti-compa-9", icon: "🏠", nomActi: "maison", temps: "25m"},
    {actiId: "acti-compa-10", icon: "🚴", nomActi: "vélo", temps: "25m"},
    {actiId: "acti-compa-11", icon: "💼", nomActi: "travail", temps: "90m"},
    {actiId: "acti-compa-12", icon: "⚽", nomActi: "sport", temps: "50m"},
    {actiId: "acti-compa-13", icon: "🏠", nomActi: "maison", temps: "40m"}
]

/**
 * @returns 
 */
function SequenceComparee({}){
    const listSeqs = []
    for(let acti of ACTIVITIES){
        listSeqs.push(
            <SeqComparee id={acti.actiId} icon={acti.icon} nomActi={acti.nomActi} temps={acti.temps}/>
        )
    }

    return (
        <div className="repr-sequence-comparee-demo">
            {listSeqs}
        </div>
    )
}

export default SequenceComparee